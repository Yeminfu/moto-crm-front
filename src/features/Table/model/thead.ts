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

export const headcols = headcolsA.filter((x) => !x.hidden);
