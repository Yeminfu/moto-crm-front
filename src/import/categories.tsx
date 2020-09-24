import React from "react";
import { Button } from "react-bootstrap";
import { API } from "../api";
// import { transliterate as tr, slugify } from "transliteration";
import { convert } from "./transliterate";
const cats = [
  "Лодки ",
  "Зип лодкм",
  "ПЛМ",
  "Зип ПЛМ",
  "Мото",
  "ЗИП Мото",
  "Садовая тех",
  "ЗИП Садовая тех",
  "Велосипеды",
  "Зима",
  "Шины",
].map((x) => ({
  name: x,
  id: convert(x),
}));

const addCats = (i: number) => {
  API.add_category(cats[i]).then((_) => {
    if (cats.length > i) {
      addCats(i + 1);
    }
  });
};

export const Categories = () => {
  return (
    <div>
      <Button onClick={() => addCats(0)}>add categories</Button>
    </div>
  );
};
