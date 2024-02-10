import { FC, useEffect, useState } from "react";
import { fetchLocation } from "../../../helper/entries";
import { Context } from "../../../model/layout";
import { onEntryChange } from "../../../contentstack-sdk";
import { PageTitle } from "../../../components/page-title";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { getLanguage } from "../../../helper/languages";
import { ALL } from "../../../constants/page";
import { Discipline, Grade } from "../../../model/cds";

const Discipline: FC<{ discipline: Discipline; language: string; }> = ({ discipline, language }) => {
    const { query } = useRouter();
    const [getDiscipline, setDiscipline] = useState<Discipline>(discipline);
  
    useEffect(() => {
      async function fetchData() {
        try {
          if (!discipline) {
            const loc = await fetchLocation(query.location as string, language);
            if (!loc) {
              throw new Error("Status code 404");
            }
            const disc = loc.disciplines.find(({code}) => code === query.discipline);
            if (!disc) {
              throw new Error("Status code 404");
            }
            setDiscipline(disc);
          }
        } catch (error) {
          console.error(error);
        }
      }

      onEntryChange(() => fetchData());
    }, [discipline, language, query.discipline, query.location]);
  
    return (
      <>
        <PageTitle>{(query.location as string).toUpperCase()} {getDiscipline?.title}</PageTitle>

        <h3>Grades</h3>
        <ul>
            {getDiscipline?.grades?.map(({code, title}: Grade) => (
                <li key={code}>
                    <a href={`/${query.location}/${query.discipline}/${code}`}>{title} ({code})</a>
                </li>
            ))}
        </ul>
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

      const discipline = location.disciplines.find(({ code }) => code === query.discipline);
      if (!discipline) {
        console.log(`404: Discipline "${query.discipline}" not found for Location "${query.location}".`);
        return { redirect: { destination: `/${query.location}`, permanent: false } };
      }

      return { props: { discipline, language } };
    } catch (error) {
      console.log(error);
      return { notFound: true };
    }
}

export default Discipline;