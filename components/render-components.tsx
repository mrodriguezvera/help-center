import React, { FC } from 'react';
import { RenderProps } from "../model/component";
import { SectionTitle } from './section-title';
import { SectionContent } from './section-content';
import { EmbeddedObject } from './embedded-object';
import { TabGroup } from './tab-group';
import { Link } from './link';

export const RenderComponents: FC<RenderProps> = ({ components, contentTypeUid, entryUid, locale }) => (
  <div data-pageref={entryUid} data-contenttype={contentTypeUid} data-locale={locale}>
    {components?.map((component, key: number) => {
      if (component.content) {
        return (<SectionContent content={component.content} key={`component-${key}`} />);
      }

      if (component.embed) {
        return (<EmbeddedObject object={component.embed} key={`component-${key}`} />);
      }
      
      if (component.tab_group) {
        return (<TabGroup key={`component-${key}`} tabGroup={component.tab_group} />);
      }

      if (component.title) {
        return (<SectionTitle title={component.title} key={`component-${key}`} />);
      }

      if (component.link) {
        return (<Link link={component.link} key={`component-${key}`} />);
      }
    })}
  </div>
);
