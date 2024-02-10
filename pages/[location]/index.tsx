import React, { useState, useEffect, FC } from "react";
import { onEntryChange } from "../../contentstack-sdk";
import { fetchLocation } from "../../helper/entries";
import { Context } from "../../model/layout";
import { PageTitle } from "../../components/page-title";
import { Discipline, Location as LocationType } from "../../model/cds";
import { getLanguage } from "../../helper/languages";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { SectionContent } from "../../components/section-content";
import { SectionTitle } from "../../components/section-title";
import { RenderComponents } from "../../components/render-components";

const Location: FC<{
  language: string;
  location: LocationType;
}> = ({ language, location }) => {
  const { query } = useRouter();
  const [getLocation, setLocation] = useState<LocationType>(location);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!location) {
          const loc = await fetchLocation(query.location as string, language);
          if (!loc) {
            throw new Error("Status code 404");
          }
          setLocation(loc);
        }
      } catch (error) {
        console.error(error);
      }
    }

    onEntryChange(() => fetchData());
  }, [language, location, query.location]);

  return (
    <>
      <PageTitle>{getLocation.title}, {getLocation.country[0].title}</PageTitle>

      <SectionTitle title={{ depth: 3, title: 'Disciplines' }} />
      
      <ul>
        {getLocation.disciplines?.map(({code, title}: Discipline) => (
          <li key={code}><a href={`${getLocation.url}/${code}`}>{title}</a></li>
        ))}
      </ul>

      {getLocation?.content?.components?.length > 0 && (
        <RenderComponents
          components={getLocation.content.components}
          contentTypeUid="cds_page"
          entryUid={getLocation.uid}
          locale={getLocation.locale}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context: Context) {
  try {
    const { req, query } = context as unknown as NextPageContext;
    const language = getLanguage(req);
    const locationCode = query.location as string;

    const location = await fetchLocation(locationCode, language);
    if (!location) {
      console.log(`404: Location "${locationCode}" not found.`);
      return { redirect: { destination: "/", permanent: false } };
    }

    return { props: { language, location } };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}

export default Location;
