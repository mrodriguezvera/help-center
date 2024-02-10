import React, { FC } from "react";
import { useRouter } from "next/router";
import { isNot } from "../helper/validation";
import { ALL } from "../constants/page";
import { Menu as MenuItem } from "../model/layout";

import styles from "./menu.module.css";

export const Menu: FC<{ items: MenuItem[] }> = ({ items }) => {
    const {query: { discipline, grade, location}} = useRouter();

    return (
        <div className={styles.menuContainer}>
            <nav className={styles.menu}>
            {items.map(({ title, icon, menu_items }) => (
                <div className={styles.menuItemContainer} key={title} style={{
                    visibility: isNot([location as string, discipline as string, grade as string], ALL) ? "visible" : "hidden"
                }}>
                    <div className={styles.menuItem} >
                        <img src={icon.url} width={30}/>
                        <div>{title}</div>
                    </div>

                    <ul className={styles.subMenu}>
                        {menu_items?.map(({title, page}) => (
                            <li key={title}>
                                <a href={`/${location}/${discipline}/${grade}${page?.[0]?.url}`}>{title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            </nav>
        </div>
    );
}