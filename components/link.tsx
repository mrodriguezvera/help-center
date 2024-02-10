import React, { FC } from "react";
import { Link as LinkType } from "../model/component";

export const Link: FC<{ link?: LinkType }> = ({ link }) => link && (
   <a href={link.value.href} target="_blank">{link.value.title}</a>
);