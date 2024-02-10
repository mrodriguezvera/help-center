import React, { FC } from "react";

import styles from "./logo.module.css";

export const Logo: FC<{ src: string, title: string, url: string }> = ({src, title, url}) => (
    <a className={styles.logo} href={url}>
        <img alt={title} src={src} title={title} width={20} />
        <span className={styles.title}>{title}</span>
    </a>
);