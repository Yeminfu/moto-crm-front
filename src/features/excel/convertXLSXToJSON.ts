import { slugify } from "transliteration";
import { sheetWorker } from "./sheetWorker";

interface fnType {
  SheetNames: any[];
  Sheets: any[];
}
export const convertXLSXToJSON = (wb: fnType) => {
  const sheets = wb.SheetNames.map((sheetName) => ({
    name_ru: sheetName,
    name_en: slugify(sheetName),
    data: sheetWorker(wb.Sheets[sheetName]),
  }));
  return sheets;
};
