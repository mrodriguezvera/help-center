import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import { fetchHeader, fetchFooter, fetchNotifications } from "../helper/entries";
import { getLanguage } from "../helper/languages";
import { AppProps } from "../model/layout";

import "../styles/style.css";

function MyApp({ Component, pageProps, header, footer, language, notifications }: AppProps) {
  return (
    <>
      <Head>
        <meta name="application-name" content="CDS Help Center" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1" />
        <title>CDS Help Center</title>
      </Head>

      <Layout
        header={header}
        footer={footer}
        language={language}
        notifications={notifications}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  const language = getLanguage(appContext?.ctx?.req);
  const header = await fetchHeader(language);
  const footer = await fetchFooter(language);
  const notifications = await fetchNotifications(new Date(), language);

  return { ...appProps, header, footer, language, notifications };
};

export default MyApp;
