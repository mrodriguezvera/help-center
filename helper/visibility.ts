import { SpecificContent, Visibility } from "../model/cds";

export const isVisible = (
    location: string,
    discipline: string,
    grade: string,
    { disciplines = [], grades = [], locations = [] }: Visibility
) => grade && discipline && location
    && (!grades.length || grades.some(({code}) => code === grade))
    && (!disciplines.length || disciplines.some(({code}) => code.toLowerCase() === discipline))
    && (!locations.length || locations.some(({code}) => code.toLowerCase() === location));

export const filterByVisibility = (
    location: string,
    discipline: string,
    grade: string,
    content?: SpecificContent[]
) => content?.filter(({visibility}: SpecificContent) => isVisible(location, discipline, grade, visibility)) || [];