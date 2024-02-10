import React, { FC } from "react";
import { SectionTitle } from "../components/section-title";
import Link from "next/link";

const PageNotFound: FC = () => (
  <div className="page-not-found">
    <SectionTitle title={{ depth: 4, title: "404: Page Not Found" }} />
    
    <p>Sorry, you just hit a route that doesn&#39;t exist.</p>
  </div>
);

export default PageNotFound;