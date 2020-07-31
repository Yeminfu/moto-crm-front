import React from "react";
import { Table as Btable } from "react-bootstrap";
// import { Cart } from "./atoms/cart";

export const Table = ({ reportData }: any) => (
  <div style={{ overflowX: "scroll" }}>
    {reportData.length && (
      <Btable striped bordered hover size="sm">
        <thead style={{ whiteSpace: "nowrap" }}>
          <tr>
            {reportData[0].map((x: any) =>
              x.head_rows[0].map((y: any, i: number) => (
                <th colSpan={y.colSpan} rowSpan={y.rowSpan} key={i}>
                  {y.text}
                </th>
              ))
            )}
          </tr>
          <tr>
            {reportData[0].map((x: any) =>
              x.head_rows[1].map((y: any, i: number) => (
                <th colSpan={y.colSpan} rowSpan={y.rowSpan} key={i}>
                  {y.text}
                </th>
              ))
            )}
          </tr>
          <tr>
            {reportData[0].map((x: any) =>
              x.head_rows[2].map((y: any, i: number) => (
                <th colSpan={y.colSpan} rowSpan={y.rowSpan} key={i}>
                  {y.text}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {reportData.map((row: any, ind: any) => (
            <tr key={ind}>
              {row.map((x: any) =>
                x.body_cols.map((y: any, i: number) => (
                  <td key={i}>
                    {((type) => {
                      switch (type) {
                        case "image":
                          return (
                            <img
                              src={typeof y.data === "string" ? y.data : ""}
                              alt=""
                            />
                          );
                        default:
                          return y.data;
                      }
                    })(y.type)}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </Btable>
    )}
  </div>
);
