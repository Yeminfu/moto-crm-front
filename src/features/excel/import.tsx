// @ts-nocheck
import React from "react";
import { Button } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import XLSX from "xlsx";
import { convertXLSXToJSON } from "./convertXLSXToJSON";
import { constants } from "./constants";
// import { Table } from "react-bootstrap";
import { API } from "../../api";
import { slugify } from "transliteration";
// import { Template } from "../template";

const onSubmit = () => {};

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const getWorkBook = async (e?: HTMLInputEvent) => {
  var files = e.target.files,
    f = files[0];
  var reader = new FileReader();
  return new Promise<xlsx.IWorkBook>((resolve, reject) => {
    reader.onload = function (e?: HTMLInputEvent) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: "array" });
      resolve(workbook);
    };
    reader.readAsArrayBuffer(f);
  });
};

const getType = (value) => {
  if (/\*/.test(value?.f))
    return {
      type: "percent",
      value: value?.f?.replace(/^.+\*/, ""),
    };
  if (/\+/.test(value?.f))
    return {
      type: "fix",
      value: value?.f?.replace(/^.+\+/, ""),
    };
};

const getval = (val) => (val ? val : "");

const convert = (sheet) => {
  let rows = Array.from({ length: 100 }, (_, i) => i + 3);
  rows = rows.map((i) => {
    if (sheet.data[constants.name.cell + i]) {
      const output = {
        retail_prices: [
          {
            id: "khv",
            name: "Хабаровск",
            price_type: getval(
              getType(sheet.data[constants.retail_price_khv.cell + i])?.type
            ),
            count: getval(
              getType(sheet.data[constants.retail_price_khv.cell + i])?.value
            ),
          },
          {
            id: "bir",
            name: "Биробиджан",
            price_type: getval(
              getType(sheet.data[constants.retail_price_bir.cell + i])?.type
            ),
            count: getval(
              getType(sheet.data[constants.retail_price_bir.cell + i])?.value
            ),
          },
        ],
        stock_count: [
          {
            id: "khv",
            name: "Хабаровск",
            value: getval(sheet.data[constants.stock_count_khv.cell + i]?.v),
          },
          {
            id: "bir",
            name: "Биробиджан",
            value: getval(sheet.data[constants.stock_count_bir.cell + i]?.v),
          },
        ],
        cost_type: getType(sheet.data[constants.cost_value.cell + i])?.type?getType(sheet.data[constants.cost_value.cell + i])?.type:"handle",
        cost_value: getval(getType(sheet.data[constants.cost_value.cell + i])?.value),
        purchase_price: getval(
          sheet.data[constants.purchase_price.cell + i]?.v
        ),
        id: slugify(getval(sheet.data[constants.name.cell + i]?.v)),
        name: getval(sheet.data[constants.name.cell + i]?.v),
        code: getval(sheet.data[constants.code.cell + i]?.v),
        category_id: sheet.name_en,
        note: getval(sheet.data[constants.note.cell + i]?.v),
      };
      return output;
    } else {
      return null;
    }
  }).filter(x=>x);

  return rows;
};

export const ExcelImport = () => {
  // const [sheetsJSON, setSheetsJSON] = useState([]);
  const forma = (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Button onClick={() => {}}>get excel</Button>
          <Field name={"nama"}>
            {(props) => {
              return (
                <input
                  // {...input}
                  type="file"
                  onChange={(e) => {
                    getWorkBook(e).then((wb) => {
                      const data = convertXLSXToJSON(wb).map((v) => ({
                        ...v,
                        data: convert(v),
                      }));
                      API.update_sheets(JSON.stringify(data));
                    });
                  }}
                  {...props}
                />
              );
            }}
          </Field>
        </form>
      )}
    />
  );
  return forma;
  // return <Template title="Import excel"></Template>;
};
