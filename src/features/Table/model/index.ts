import dayjs from "dayjs";
import { dataType } from "./type";
import "dayjs/locale/ru";
dayjs.locale("ru");

const cities_count = 2;

export const data: dataType = [
  {
    head_rows: [
      [
        {
          text: "примечание",
          colSpan: 1,
          rowSpan: 3,
        },
      ],
      [],
      [],
    ],
    body_cols: [
      {
        type: "text",
        data: "1 шт в пути",
      },
    ],
  },
  {
    head_rows: [
      [
        {
          text: "Код товара",
          colSpan: 1,
          rowSpan: 3,
        },
      ],
      [],
      [],
    ],
    body_cols: [
      {
        type: "text",
        data: "0xj3",
      },
    ],
  },
  {
    head_rows: [
      [
        {
          text: "Фото",
          colSpan: 1,
          rowSpan: 3,
        },
      ],
      [],
      [],
    ],
    body_cols: [
      {
        type: "image",
        data:
          "https://мотохит27.рф/wp-content/uploads/2020/05/prodracerendurol150rc15023x_3-1.jpg",
      },
    ],
  },
  {
    head_rows: [
      [
        {
          text: "Наименование",
          colSpan: 1,
          rowSpan: 3,
        },
      ],
      [],
      [],
    ],
    body_cols: [
      {
        type: "text",
        data: "APEX 10",
      },
    ],
  },
  {
    head_rows: [
      [
        {
          text: "Количество",
          colSpan: cities_count,
          rowSpan: 2,
        },
      ],
      [],
      [
        {
          text: "хаб",
          colSpan: 1,
          rowSpan: 1,
        },
        {
          text: "бир",
          colSpan: 1,
          rowSpan: 1,
        },
      ],
    ],
    body_cols: [
      {
        type: "text",
        data: "1 шт ",
      },
      {
        type: "text",
        data: "1 шт ",
      },
    ],
  },
  {
    head_rows: [
      [
        {
          text: "Цена розница ",
          colSpan: cities_count,
          rowSpan: 2,
        },
      ],
      [],
      [
        {
          text: "хаб",
          colSpan: 1,
          rowSpan: 1,
        },
        {
          text: "бир",
          colSpan: 1,
          rowSpan: 1,
        },
      ],
    ],
    body_cols: [
      {
        type: "text",
        data: "100000",
      },
      {
        type: "text",
        data: "100000",
      },
    ],
  },
  {
    head_rows: [
      [
        {
          text: "Продано/м",
          colSpan: cities_count * 12,
          rowSpan: 1,
        },
      ],
      [
        ...Array.from({ length: 12 }).map((_, i) => ({
          text: dayjs(`${i + 1}`, "mm").format("MMM"),
          colSpan: cities_count,
          rowSpan: 1,
        })),
      ],
      [
        ...(() => {
          const arr = [];
          const cities = Array.from({ length: 12 }, (_, i) => [
            {
              text: "хаб",
              colSpan: 1,
              rowSpan: 1,
            },
            {
              text: "бир",
              colSpan: 1,
              rowSpan: 1,
            },
          ]);
          for (let index = 0; index < cities.length; index++) {
            const city = cities[index];
            arr.push(...city);
          }
          return arr;
        })(),
      ],
    ],
    body_cols: [
      ...Array.from({
        length: 24,
      }).map((_, i) => ({
        type: "text",
        data: "1 шт ",
      })),
    ],
  },
  {
    head_rows: [
      [
        {
          text: "Продано всего",
          colSpan: cities_count,
          rowSpan: 2,
        },
      ],
      [],
      [
        {
          text: "хаб",
          colSpan: 1,
          rowSpan: 1,
        },
        {
          text: "бир",
          colSpan: 1,
          rowSpan: 1,
        },
      ],
    ],
    body_cols: [
      {
        type: "text",
        data: "100500 шт ",
      },
      {
        type: "text",
        data: "100500 шт ",
      },
    ],
  },
  {
    head_rows: [
      [
        {
          text: "Закупочная цена",
          colSpan: 1,
          rowSpan: 3,
        },
      ],
      [],
      [],
    ],
    body_cols: [
      {
        type: "text",
        data: "100000",
      },
    ],
  },
  {
    head_rows: [
      [
        {
          text: "Себестоимость",
          colSpan: 1,
          rowSpan: 3,
        },
      ],
      [],
      [],
    ],
    body_cols: [
      {
        type: "text",
        data: "100000",
      },
    ],
  },
  {
    head_rows: [
      [
        {
          text: "Сумма в товаре",
          colSpan: 1,
          rowSpan: 3,
        },
      ],
      [],
      [],
    ],
    body_cols: [
      {
        type: "text",
        data: "100000",
      },
    ],
  },
];
