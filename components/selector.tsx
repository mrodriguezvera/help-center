import React, { FC } from "react";
import { isNot } from "../helper/validation";
import { ALL } from "../constants/page";

import styles from "./selector.module.css";

export const Selector: FC<{ icon: string, label: string; path: string[] }> = ({ icon, label, path }) =>
    isNot(path, ALL) && (
        <a className={styles.info} href={`/${path.slice(0, path.length - 1).join('/')}`}>
            <img src={`/${icon}.svg`} height={18}/> {label}
        </a>
    );