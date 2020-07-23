interface colType {
  head_rows: {
    text: string;
    colSpan: number;
    rowSpan: number;
  }[][];
  body_cols: {
    type: string; //"text" | "image";
    data: string;
  }[];
}

export type dataType = Array<colType>;
