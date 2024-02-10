import React, { useState, useEffect, FC, useMemo } from "react";
import { onEntryChange } from "../../contentstack-sdk";
import { fetchLocations } from "../../helper/entries";
import { PageTitle } from "../../components/page-title";
import { SectionTitle } from "../../components/section-title";
import { getLanguage } from "../../helper/languages";
import { Context } from "../../model/layout";
import { Location } from "../../model/cds";
import { NextPageContext } from "next";

import styles from "./index.module.css";

const AllLocations: FC<{ language: string; locations: Location[] }> = ({ language, locations }) => {
  const [getLocations, setLocations] = useState(locations);

  const countries = useMemo(() =>
    getLocations?.reduce((acc: Record<string, Location[]>, next: Location) =>
      ({ ...acc, [next.country[0].title]: [
          ...(acc[next.country[0].title] || []),
          next
        ].sort((loc1, loc2) => loc1.title <= loc2.title ? -1 : 1)
      } as Record<string, Location[]>),
    {}), [getLocations]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!locations) {
          const locs = await fetchLocations(language);
          if (!locs) {
            throw new Error("Status code 404")
          };
          setLocations(locs);
        }
      } catch (error) {
        console.error(error);
      }
    }
    
    onEntryChange(() => fetchData());
  }, [language, locations]);

  return (
    <>
      <PageTitle>Locations</PageTitle>

      <div className={styles.locations}>
        {Object.keys(countries).sort().map((country: string) => (
          <div className={styles.country} key={country}>
            <SectionTitle title={{ title: country, depth: 2 }} />

            {countries[country].map(({title, url}: Location) => (
              <div key={title}>
                <a href={url}>{title}</a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context: Context) {
    try {
      const language = getLanguage((context as unknown as NextPageContext).req);
      const locations = await fetchLocations(language);
      if (!locations) {
        throw new Error("Status code 404");
      }
      return { props: { language, locations } };
    } catch (error) {
      return { notFound: true };
    }
}

export default AllLocations;
