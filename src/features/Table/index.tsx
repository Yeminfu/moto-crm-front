import React from "react";
import { Table as Btable } from "react-bootstrap";
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");

interface headcolType {
  id: string;
  name: string;
  rowSpan: number;
  colSpan: number;
  hidden?: boolean;
  sub_a?: Array<{ id: string; name: string; colSpan: number }>;
  sub_b?: Array<{ id: string; name: string }>;
}

const headcolsA: headcolType[] = [
  { id: "note", name: "Примечание", rowSpan: 3, colSpan: 1 },
  { id: "code", name: "Код товара", rowSpan: 3, colSpan: 1 },
  { id: "photo", name: "Фото", rowSpan: 3, colSpan: 1 },
  { id: "name", name: "Наименование", rowSpan: 3, colSpan: 1 },
  {
    id: "count",
    name: "Количество",
    rowSpan: 2,
    colSpan: 2,
    sub_b: [
      {
        id: "count_khv",
        name: "Хаб",
      },
      {
        id: "count_bir",
        name: "Бир",
      },
    ],
  },
  {
    id: "retail_price",
    name: "Цена розница",
    rowSpan: 2,
    colSpan: 2,
    sub_b: [
      {
        id: "retail_price_khv",
        name: "Хаб",
      },
      {
        id: "retail_price_bir",
        name: "Бир",
      },
    ],
  },
  {
    id: "sold",
    name: "Продано",
    rowSpan: 1,
    colSpan: 24,
    sub_a: Array.from({ length: 12 }).map((_, i) => ({
      id: `sold_in_month_${i + 1}`,
      name: dayjs(`${i + 1}`, "mm").format("MMM"),
      colSpan: 2,
    })),
    sub_b: (() => {
      const arr = [];
      const cities = Array.from({ length: 12 }, (_, i) => [
        {
          id: `sold_in_month_${i}_khv`,
          name: "Хаб",
        },
        { id: `sold_in_month_${i}_bir`, name: "Бир" },
      ]);
      for (let index = 0; index < cities.length; index++) {
        const city = cities[index];
        arr.push(...city);
      }
      return arr;
    })(),
  },
  { id: "purchase_price", name: "Закупочная цена", rowSpan: 3, colSpan: 1 },
  { id: "coste_price", name: "Себестоимость", rowSpan: 3, colSpan: 1 },
  { id: "amount_in_goods", name: "Сумма в товаре", rowSpan: 3, colSpan: 1 },
  { id: "cart", name: "", rowSpan: 3, colSpan: 1 },
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
    id: "img",
    text:
      "https://мотохит27.рф/wp-content/uploads/2020/05/prodracerendurol150rc15023x_3-1.jpg",
  },
  {
    id: "name",
    text: "APEX 10",
  },
  { id: "count_hab", text: "кол хаб 1" },
  { id: "count_bir", text: "кол бир 1" },
  { id: "retail_price_khv", text: "розн цена хаб1" },
  { id: "retail_price_bir", text: "розн цена бир 1" },
  ...Array.from({
    length: 24,
  }).map((product, i) => ({ id: `x_${i}`, text: `x_${i}` })),
  { id: "purchase_price", text: "Закупочная цена 1 р" },
  { id: "cost_price", text: "Себестоимость 1 р" },
  { id: "amount_in_goods", text: "Сумма в товаре 1 р" },
];

interface productType {
  id: string;
  text: string;
}

const products: productType[][] = Array.from({ length: 100 }, () => tBody);

const headcols = headcolsA.filter((x) => !x.hidden);

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
        {products.map((product, i) => (
          <tr>
            {tBody.map((x) => (
              <td className="text-left">
                {((id) => {
                  switch (id) {
                    case "img":
                      return <img src={x.text} alt="" />;
                    default:
                      return x.text;
                  }
                })(x.id)}
              </td>
            ))}
            <td>
              <Cart />
            </td>
          </tr>
        ))}
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
