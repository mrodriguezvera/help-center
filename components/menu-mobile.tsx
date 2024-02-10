import React, { FC, Fragment } from "react";
import { useRouter } from "next/router";
import { Menu } from "../model/layout";
import { ALL } from "../constants/page";
import { isNot } from "../helper/validation";
import { Selector } from "./selector";

import styles from "./menu-mobile.module.css";

export const MenuMobile: FC<{ items: Menu[] }> = ({items}) => {
    const {query: { discipline, grade, location}} = useRouter();

    return (
        <div className={[styles.mobileMenu, styles.floatingMenu].join(' ')}>
            <div className={styles.trigger} >
                <img src="/list-fill.svg" height={20}/>
            </div>

          <nav className={styles.menuWrapper}>
            <div className={styles.menu}>
                <div className={styles.selectors}>
                    <Selector
                        icon="map-pin"
                        label={(location as string)?.toUpperCase()}
                        path={[location as string]}
                    />
                    <Selector
                        icon="graduation-cap"
                        label={(discipline as string)?.toUpperCase()}
                        path={[location as string, discipline as string]}
                    />
                    <Selector
                        icon="student"
                        label={(grade as string)?.toUpperCase()}
                        path={[location as string, discipline as string, grade as string]}
                    />
                </div>

                {isNot([location as string, discipline as string, grade as string], ALL) && (
                    items.map(({ title, menu_items }) => (
                        <Fragment key={title}>
                            <div className={styles.title}>{title}</div>
                            <ul>
                                {menu_items?.map(({title, page}) =>
                                    <li key={title}><a href={`/${location}/${discipline}/${grade}${page?.[0]?.url}`}>{title}</a></li>
                                )}
                            </ul>
                        </Fragment>
                    ))
                )}
            </div>
          </nav>
        </div>
    );
}