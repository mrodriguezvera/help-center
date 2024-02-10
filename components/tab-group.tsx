import React, { FC, MouseEvent, useState } from "react";
import parse from "html-react-parser";
import { TabGroup as TabGroupType } from "../model/component";

import styles from "./tab-group.module.css";

export const TabGroup: FC<{ tabGroup: TabGroupType }> = ({tabGroup: {style, tabs}}) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleClick = (index: number) => (e: MouseEvent<HTMLElement>) => {
        (e?.target as HTMLElement)?.scrollIntoView();
        setSelectedTab(index);
    }

    return (
        <>
            <div className={styles.tabSection}>
                <div className={styles.tabContainer}>
                    <div className={[styles.tabs, styles[style]].join(' ')}>
                        {tabs.map(({title}, index) =>
                            <div
                                className={`${styles.tab} ${index === selectedTab ? styles.selected : ''}`}
                                key={index}
                                onClick={handleClick(index)}
                            >{title}</div> )}
                    </div>
                </div>
            </div>

            {parse(tabs[selectedTab]?.content)}
        </>
    );
}