import React from "react";
import { Template } from "../template";
// import { Card, Button } from "react-bootstrap";

export const Dashboard = () => (
  <Template title="Главная">
    <ol>
      <li>Количество на складе (создание товара/категории))</li>
      <li>Выручка в годовом отчете (кол-во/сумма)</li>
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
