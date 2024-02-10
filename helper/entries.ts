import { Location, Notification, PageContent } from "../model/cds";
import { FooterProps, HeaderProps } from "../model/layout";
import { getEntry, getEntryByDate, getEntryByUrl } from "../contentstack-sdk";

export const fetchHeader = async (language?: string): Promise<HeaderProps> =>
  (await getEntry({
    contentTypeUid: "cds_header",
    referenceFieldPath: ["menu.page", "menu.menu_items", "menu.menu_items.page"],
    language
  }) as HeaderProps[][])[0][0];

export const fetchFooter = async (language?: string): Promise<FooterProps> => (await getEntry({
    contentTypeUid: "cds_footer",
    referenceFieldPath: undefined,
    jsonRtePath: ["copyright"],
    language
  }) as FooterProps[][])[0][0];

export const fetchAllPages = async (language?: string): Promise<PageContent[]> =>
  (await getEntry({
    contentTypeUid: "cds_page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
    language
  }) as PageContent[][])[0];

export const fetchPage = async (entryUrl: string, language?: string): Promise<PageContent> =>
  (await getEntryByUrl({
    contentTypeUid: "cds_page",
    entryUrl,
    referenceFieldPath: [
      "specific_content",
      "specific_content.visibility.locations",
      "specific_content.visibility.disciplines",
      "specific_content.visibility.grades"
    ],
    jsonRtePath: [
      "content.components.content.value",
      "content.components.tab_group.tabs.content",
      "specific_content.content.components.content.value",
      "specific_content.content.components.tab_group.tabs.content"
    ],
    language
  }) as PageContent[])[0];

export const fetchLocations = async (language?: string): Promise<Location[]> => 
  (await getEntry({
    contentTypeUid: "cds_branch",
    jsonRtePath: ["description"],
    language,
    referenceFieldPath: ["country", "disciplines"],
  }) as Location[][])[0];

export const fetchLocation = async (location: string, language?: string): Promise<Location> =>
  (await getEntryByUrl({
    contentTypeUid: "cds_branch",
    entryUrl: `/${location}`,
    jsonRtePath: [
      "content.components.content.value",
      "content.components.tab_group.tabs.content"
    ],
    language,
    referenceFieldPath: ["country", "disciplines", "disciplines.grades"],
  }) as Location[])?.[0];

export const fetchNotifications = async (date: Date, language?: string): Promise<Notification[]> =>
  (await getEntryByDate({
    date,
    contentTypeUid: "cds_notification",
    jsonRtePath: ['message'],
    language
  }) as Notification[]);
