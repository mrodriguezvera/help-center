import React, { FC } from "react";
import parse from "html-react-parser";
import { EmbeddedObject as EmbeddedObjectType } from "../model/component";

import styles from "./embedded-object.module.css";

export const EmbeddedObject: FC<{ object: EmbeddedObjectType }> = ({ object }) => (
    <div className={styles.embeddedObject}>
        {parse(object.html_code)}
        <div className={styles.label}>{object.label}</div>
    </div>
);