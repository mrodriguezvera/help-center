import { EntryEmbedable, jsonToHTML } from "@contentstack/utils";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import getConfig from "next/config";
import {
  customHostUrl,
  initializeContentStackSdk,
  isValidCustomHostUrl,
} from "./utils";
import { formatYYYYMMDD } from "../helper/dates";
import { Query } from "contentstack";

type GetEntry = {
  contentTypeUid: string;
  jsonRtePath?: string[];
  language?: string;
  referenceFieldPath?: string[];
};

type GetEntryByUrl = GetEntry & {
  entryUrl: string;
};

type GetEntryByDate = GetEntry & {
  date: Date;
};

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY ? process.env : publicRuntimeConfig;

let customHostBaseUrl = envConfig.CONTENTSTACK_API_HOST as string;
customHostBaseUrl = customHostUrl(customHostBaseUrl);

// SDK initialization
const Stack = initializeContentStackSdk();

// set host url only for custom host or non prod base url's
if (isValidCustomHostUrl(customHostBaseUrl)) {
  Stack.setHost(customHostBaseUrl);
}

// Setting LP if enabled
ContentstackLivePreview.init({
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams: {
    host: envConfig.CONTENTSTACK_APP_HOST,
  },
  stackDetails: {
    apiKey: envConfig.CONTENTSTACK_API_KEY,
    environment: envConfig.CONTENTSTACK_ENVIRONMENT,
  },
  enable: envConfig.CONTENTSTACK_LIVE_PREVIEW === "true",
  ssr: false,
})?.catch((err) => console.error(err));

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
    span: (node: any, next: any) => next(node.children),
};

const executeQuery = ({
    contentTypeUid,
    jsonRtePath,
    language,
    referenceFieldPath,
}: GetEntry, hookQuery?: (query: Query) => void, isSingleResult?: boolean) => {
    return new Promise((resolve, reject) => {
        const query = Stack.ContentType(contentTypeUid).Query();
        
        if (referenceFieldPath) {
            query.includeReference(referenceFieldPath);
        }
        
        if (language) {
            query.language(language.toLowerCase()).includeFallback();
        }

        hookQuery?.(query);

        query
            .toJSON()
            .find()
            .then((result) => {
                jsonRtePath && jsonToHTML({
                    entry: result,
                    paths: jsonRtePath,
                    renderOption
                });
                resolve(isSingleResult ? result : result[0]);
            }, (error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const getEntry = (entry: GetEntry) => executeQuery(entry, undefined, true);

export const getEntryByUrl = ({ entryUrl, ...entry}: GetEntryByUrl) =>
    executeQuery(entry, (query: Query) => { query.where('url', entryUrl); });

export const getEntryByDate = ({ date, ...entry}: GetEntryByDate) =>
    executeQuery(entry, (query: Query) => {
        const yyyymmdd = formatYYYYMMDD(date);
        query
            .lessThanOrEqualTo("start_date", yyyymmdd)
            .greaterThanOrEqualTo("end_date", yyyymmdd);
    });
