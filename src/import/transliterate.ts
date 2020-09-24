import { slugify } from "transliteration";

export const convert = (string: string) => slugify(string);
