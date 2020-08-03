import React from "react";
import { Template } from "../template";
import { Card, Button } from "react-bootstrap";

export const Dashboard = () => (
  <Template title="Главная">
    <Card className="text-center">
      <Card.Header>Внимание!</Card.Header>
      <Card.Body>
        <Card.Title>Очень важная информация</Card.Title>
        <Card.Text>
          Я еще не знаю, что тут будет, но оно будет очень важным :)
        </Card.Text>
        <Button variant="primary">Важная кнопка</Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        тут тоже можно что-нибудь написать
      </Card.Footer>
    </Card>
  </Template>
);
