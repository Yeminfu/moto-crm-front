import React from "react";
import { Template } from "../template";
// import { Card, Button } from "react-bootstrap";

export const Dashboard = () => (
  <Template title="Главная">
    <ol>
      <li>Редактировать товар: нет вариативной розничной цены (init)</li>
      <li>Редактировать товар: не меняется розничная цена</li>
      <li>
        Выручка в годовом отчете (кол-во/сумма)
        <ol>
          <li>
            Категория товаров: не выводится количество товаров на складе
            биробиджан ()
          </li>
        </ol>
      </li>
      <li>Розничная цена (фиксированая, процент, ручная) от себестоимости</li>
    </ol>
    {/* <Card className="text-center">
      <Card.Header>Внимание!</Card.Header>
      <Card.Body>
        <Card.Title>Очень важная информация</Card.Title>
        <Card.Text>...</Card.Text>
        <Button variant="primary">Важная кнопка</Button>
      </Card.Body>
      <Card.Footer className="text-muted">...</Card.Footer>
    </Card> */}
  </Template>
);
