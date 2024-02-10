import { Component } from "./component";

type ContentstackType = {
    locale: string;
    title: string;
    uid: string;
    url: string;
};

export type Country = ContentstackType;

export type Grade = ContentstackType & {
    code: string;
};

export type Discipline = ContentstackType & {
    code: string;
    grades: Grade[];
    short_code: string;
};

export type Content = {
    components: Component[];
}

export type Location = ContentstackType & {
    code: string;
    content: Content;
    country: Country[];
    disciplines: Discipline[];
    locale: string;
};

export type Visibility = {
    locations: Location[];
    disciplines: Discipline[];
    grades: Grade[];
}

export type SpecificContent = ContentstackType & {
    content: Content;
    visibility: Visibility;
}
  
export type PageContent = ContentstackType & {
    content: Content;
    specific_content: SpecificContent[];
};

export type Notification = ContentstackType & {
    end_date: string;
    start_date: string;
    message: string;
    type: string;
};
