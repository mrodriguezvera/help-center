import React from 'react';
import parse from 'html-react-parser';
import { Content } from '../model/component';

import styles from "./section-content.module.css";

export const SectionContent = ({content}: { content: Content }) => content && (
   <div className={styles.content}>{parse(content.value)}</div>
);