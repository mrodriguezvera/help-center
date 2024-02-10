import React, { FC, PropsWithChildren } from "react";

import styles from "./page-title.module.css";

export const PageTitle: FC<PropsWithChildren> = ({children}) => (
    <>
        <div className={styles.mark} />
        <h1 className={styles.pageTitle}>{children}</h1>
    </>
);