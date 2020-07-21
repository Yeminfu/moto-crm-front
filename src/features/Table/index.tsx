import React from "react";
import { Table as Btable } from "react-bootstrap";
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");

interface headcolType {
  name: string;
  rowSpan: number;
  colSpan: number;
  sub_a?: Array<{
    name: string;
    colSpan: number;
  }>;
  sub_b?: Array<{
    name: string;
  }>;
}

const headcols: headcolType[] = [
  { name: "Примечание", rowSpan: 3, colSpan: 1 },
  { name: "Код товара", rowSpan: 3, colSpan: 1 },
  {
    name: "Количество",
    rowSpan: 2,
    colSpan: 2,
    sub_b: [
      {
        name: "Хаб",
      },
      {
        name: "Бир",
      },
    ],
  },
  {
    name: "Цена розница",
    rowSpan: 2,
    colSpan: 2,
    sub_b: [
      {
        name: "Хаб",
      },
      {
        name: "Бир",
      },
    ],
  },
  {
    name: "Продано",
    rowSpan: 1,
    colSpan: 24,
    sub_a: Array.from({ length: 12 }).map((_, i) => ({
      name: dayjs(`${i + 1}`, "mm").format("MMM"),
      colSpan: 2,
    })),
    sub_b: (() => {
      const arr = [];
      const cities = Array.from({ length: 12 }, () => [
        { name: "Хаб" },
        { name: "Бир" },
      ]);
      for (let index = 0; index < cities.length; index++) {
        const city = cities[index];
        arr.push(...city);
      }
      return arr;
    })(),
  },
  { name: "Закупочная цена", rowSpan: 3, colSpan: 1 },
  { name: "Себестоймость", rowSpan: 3, colSpan: 1 },
  { name: "Сумма в товаре", rowSpan: 3, colSpan: 1 },
  { name: "", rowSpan: 3, colSpan: 1 },
];

const tBody = [
  {
    id: "note",
    text: "1 шт в пути",
  },
  {
    id: "code",
    text: "0xj3",
  },
  {
    id: "name",
    text: "APEX 10",
  },
  { id: "count_hab", text: "1" },
];

export const Table = () => (
  <div style={{ overflowX: "scroll" }}>
    <Btable striped bordered hover size="sm">
      <thead style={{ whiteSpace: "nowrap" }}>
        <tr>
          {headcols.map((x, i) => (
            <th colSpan={x.colSpan} rowSpan={x.rowSpan}>
              {x.name}
            </th>
          ))}
        </tr>
        <tr>
          {headcols
            .filter((x) => x.sub_a)
            .map((x) => (
              <>
                {x.sub_a?.map((s) => (
                  <th colSpan={s.colSpan}>{s.name}</th>
                ))}
              </>
            ))}
        </tr>
        <tr>
          {headcols
            .filter((x) => x.sub_b)
            .map((x) => (
              <>
                {x.sub_b?.map((s) => (
                  <th>{s.name}</th>
                ))}
              </>
            ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {tBody.map((x) => (
            <td>{x.text}</td>
          ))}
          {Array.from({
            length: 29,
          }).map((x, i) => (
            <td>{i}</td>
          ))}
          <td>
            <Cart />
          </td>
        </tr>
      </tbody>
    </Btable>
  </div>
);

const Cart = () => (
  <svg
    width="2em"
    height="2em"
    viewBox="0 0 16 16"
    className="bi bi-cart-plus"
    fill="green"
    // fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M8.5 5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 .5-.5z"
    />
    <path
      fill-rule="evenodd"
      d="M8 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0v-2z"
    />
    <path
      fill-rule="evenodd"
      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
    />
  </svg>
);
