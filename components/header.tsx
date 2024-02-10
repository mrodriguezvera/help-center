import React, { useState, useEffect, useMemo, FC } from "react";
import { useRouter } from "next/router";
import { onEntryChange } from "../contentstack-sdk";
import { Notification as NotificationType} from "../model/cds";
import { HeaderProps } from "../model/layout";
import { fetchHeader } from "../helper/entries";
import { Notifications } from "./notifications";
import { Logo } from "./logo";
import { Selector } from "./selector";
import { ALL } from "../constants/page";
import { Menu } from "./menu";
import { MenuMobile } from "./menu-mobile";

import styles from "./header.module.css";

export const Header: FC<{
  header: HeaderProps;
  language?: string;
  notifications: NotificationType[];
}> = ({ header, language, notifications }) => {
  const {query, asPath} = useRouter();
  const [getHeader, setHeader] = useState(header);

  const location = useMemo<string>(() => query.location as string || ALL, [query.location]);
  const discipline = useMemo<string>(() => query.discipline as string || ALL, [query.discipline]);
  const grade = useMemo<string>(() => query.grade as string || ALL, [query.grade]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!header) {
          setHeader(await fetchHeader(language));
        }
      } catch (error) {
        console.error(error);
      }
    }

    onEntryChange(() => fetchData());
  }, [header, language, location]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Logo src={getHeader.logo.url} title={getHeader.title} url={`/${location}/${discipline}/${grade}`} />

          {query.fromExtension !== undefined && (
            <a className={styles.marginRight} href={asPath.split('?')[0]} target="_blank" title="Open CDS HELP CENTER in a new tab">
              <img src="/open-new.svg" height={20} />
            </a>
          )}

          <div className={styles.selector}>
            <Selector icon="map-pin" label={location.toUpperCase()} path={[location]} />
          </div>

          <div className={styles.selector}>
            <Selector icon="graduation-cap"  label={discipline.toUpperCase()} path={[location, discipline]}  />
          </div>

          <div className={styles.selector}>
            <Selector icon="student"  label={grade.toUpperCase()} path={[location, discipline, grade]} />
          </div>
        </div>

        <div className={styles.headerRight}>
          { notifications && <Notifications notifications={notifications} /> }
          { getHeader && query.fromExtension === undefined && <MenuMobile items={getHeader.menu} /> }
        </div>
      </header>

      { getHeader && <Menu items={getHeader.menu} /> }
    </>
  );
}