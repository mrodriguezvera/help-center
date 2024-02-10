import { Notification, PageContent } from "./cds";

type AdditionalParam = Record<string, any>;

type Image = {
    filename: string;
    url: string;
    $: AdditionalParam;
}

type PageRef = {
  url: string;
  title: string;
  $: AdditionalParam;
};

export type MenuItem = {
  page: PageRef[];
  title: string;
};

export type Menu = {
  icon: Image;
  menu_items?: MenuItem[];
  page?: string;
  title: string;
};

export type HeaderProps = {
  description: string;
  info: any[];
  locale: string;
  logo: Image;
  menu: [Menu];
  title: string;
  $: AdditionalParam;
};

export type FooterProps = {
  locale: string;
  title: string;
  copyright: string;
  $: AdditionalParam;
};

export type PageProps = {
  locale: string;
  title: string;
  uid: string;
};

export type Context = {
  resolvedUrl: string;
  setHeader: Function;
  write: Function;
  end: Function;
};

export type AppProps = {
  page: PageContent;
  path: string;
  Component: any;
  notifications: Notification[];
  pageProps: PageProps;
  header: HeaderProps;
  footer: FooterProps;
  language: string;
};
