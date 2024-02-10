import React, { useState, useEffect, FC } from "react";
import { onEntryChange } from "../contentstack-sdk";
import { fetchFooter } from "../helper/entries";
import { FooterProps} from "../model/layout";
import parse from "html-react-parser";

import styles from "./footer.module.css";

export const Footer: FC<{ footer: FooterProps, language?: string }> = ({ footer, language }) => {
  const [getFooter, setFooter] = useState(footer);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!footer) {
          const footerRes = await fetchFooter(language);
          setFooter(footerRes);
        }
      } catch (error) {
        console.error(error);
      }
    }

    onEntryChange(() => fetchData());
  }, [footer, language]);

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        {parse(getFooter?.copyright)}
      </div>
    </footer>
  );
}
