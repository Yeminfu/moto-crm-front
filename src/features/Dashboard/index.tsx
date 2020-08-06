import React from "react";
import { Template } from "../template";
// import { Card, Button } from "react-bootstrap";

export const Dashboard = () => (
  <Template title="Главная">
    <ol>
      <li>
        Создать товар: изменить поля розничной цены на вариативные (наценка)
        <ol>
          <li>бэк</li>
        </ol>
      </li>
      <li>
        КАтегория товаров: не выводится количество товаров на складе биробиджан
        ()
      </li>
      <li>Количество на складе (создание товара/категории) (бэк)</li>
      <li>Выручка в годовом отчете (кол-во/сумма)</li>
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
