export type Content = {
  value: string;
}

export type EmbeddedObject = {
  html_code: string;
  label: string;
}

export type Tab = {
  content: string;
  title: string;
}

export type TabGroup = {
  style: 'button' | 'default' | 'wizard';
  tabs: [Tab];
}

export type Title = {
  title: string;
  depth: number;
}

export type Link = {
  value: {
    href: string;
    title: string;
  }
}

export type Component = {
  content?: Content;
  embed?: EmbeddedObject;
  link: Link;
  tab_group?: TabGroup;
  title?: Title;
}

export type RenderProps = {
  components: Component[];
  contentTypeUid: string;
  entryUid: string;
  locale: string;
}