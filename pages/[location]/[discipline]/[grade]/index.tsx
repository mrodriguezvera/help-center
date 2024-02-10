import React, { useState, useEffect, useMemo, FC } from "react";
import { onEntryChange } from "../../../../contentstack-sdk";
import { RenderComponents } from "../../../../components/render-components";
import { fetchLocation, fetchPage } from "../../../../helper/entries";
import { Discipline, Grade, SpecificContent } from "../../../../model/cds";
import { Context } from "../../../../model/layout";
import { PageTitle } from "../../../../components/page-title";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { getLanguage } from "../../../../helper/languages";
import { ALL } from "../../../../constants/page";
import { filterByVisibility } from "../../../../helper/visibility";

import styles from "./index.module.css";

const Grade: FC<{
  language: string;
  page: any;
  path: string;
}> = ({ page, path, language }) => {
  const { query: {discipline, grade, location} } = useRouter();
  const [getPage, setPage] = useState(page);

  const specificContent: SpecificContent[] = useMemo(() => filterByVisibility(
      location as string,
      discipline as string,
      grade as string,
      getPage?.specific_content
  ), [getPage?.specific_content, discipline, grade, location])

  useEffect(() => {
    async function fetchData() {
      try {
        if (!page) {
          const p = await fetchPage(path, language);
          if (!p) {
            throw new Error("Status code 404");
          }
          setPage(p);
       }
      } catch (error) {
        console.error(error);
      }
    }

    onEntryChange(() => fetchData());
  }, [language, page, path]);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.leftSide}>
          <PageTitle>{getPage?.title}</PageTitle>

          {getPage?.content?.components?.length > 0 && (
            <RenderComponents
              components={getPage.content.components}
              contentTypeUid="cds_page"
              entryUid={getPage.uid}
              locale={getPage.locale}
            />
          )}
        </div>

        {specificContent.length > 0 && (
          <div className={styles.rightSide}>
            <span className={styles.tag}>For you</span>
            
            {specificContent.map(({content}: SpecificContent, idx) => (
              <RenderComponents
                components={content?.components}
                contentTypeUid="cds_page"
                entryUid={getPage.uid}
                key={idx}
                locale={getPage.locale}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context: Context) {
    try {
      const { req, query } = context as unknown as NextPageContext;

      if (query.location === ALL) {
        console.log(`Redirecting to /${ALL}.`);
        return { redirect: { destination: `/${ALL}`, permanent: false } };
      }

      const language = getLanguage(req);
      const location = await fetchLocation(query.location as string, language);
      if (!location) {
        console.log(`404: Location "${query.location}" not found.`);
        return { redirect: { destination: "/", permanent: false } };
      }

      const discipline = location.disciplines.find(({ code }: Discipline) => code === query.discipline);
      if (!discipline) {
        console.log(`404: Discipline "${query.discipline}" not found for Location "${query.location}".`);
        return { redirect: { destination: `/${query.location}`, permanent: false } };
      }

      const hasGrade = discipline.grades.some(({ code }: Grade) => code === query.grade);
      if (!hasGrade) {
        console.log(`404: Grade "${query.grade}" not found for Discipline "${query.discipline}" in Branch "${query.location}".`);
        return { redirect: { destination: `${query.location}/${query.discipline}`, permanent: false } };
      }

      const path = query.path as string || "/";
      const page = await fetchPage(path, language);
      if (!page) {
        throw new Error (`404: Page "${path}" not found.`);
      }

      return { props: { language, page, path } };
    } catch (error) {
      console.log(error);
      return { notFound: true };
    }
}

export default Grade;
