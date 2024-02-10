import React, { FC, PropsWithChildren } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Notification } from "../model/cds";
import { FooterProps, HeaderProps } from "../model/layout";

const Layout: FC<PropsWithChildren<{
  header: HeaderProps;
  footer: FooterProps;
  language?: string;
  notifications: Notification[];
}>> = ({
  children,
  header,
  footer,
  language,
  notifications,
}) => (
  <>
    {header && <Header header={header} language={language} notifications={notifications}/> }
    <main>{children}</main>
    {footer && <Footer footer={footer} language={language} /> }
  </>
);

export default Layout;
