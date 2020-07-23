import React from "react";
import "./dashboard.scss";
import { Row, Col, InputGroup } from "react-bootstrap";
import { Table } from "../Table";
import { Pagination } from "../Pagination";
import { Filter } from "../Filter";
import { Link } from "react-router-dom";
export const Dashboard = () => (
  <div className="container-fluid">
    <Row className="dashboard">
      <Col className="bg-dark col-md-auto">
        <ul className="nav flex-column navbar align-items-start">
          {[
            { text: "Лодки", href: "/boats" },
            { text: "Главная", href: "/" },
            { text: "Создать товар", href: "/create-product" },
            // { text: "Лодки", href: "/boats" },
            // { text: "ЗИП Лодки" },
            // { text: "ЗИП Лодки" },
            // { text: "ПЛМ" },
            // { text: "ЗИП ПЛМ" },
            // { text: "Мото" },
            // { text: "ЗИП Мото" },
          ].map((x) => (
            <li className="nav-item">
              <Link to={x.href} className="text-white bg-dark nav-link active">
                {x.text}
              </Link>
            </li>
          ))}
        </ul>
      </Col>
      <Col>
        <Filter />
        <InputGroup className="mb-3">
          <InputGroup.Append>
            <InputGroup.Text id="basic-addon2">Продано</InputGroup.Text>
          </InputGroup.Append>
          <InputGroup.Checkbox aria-label="Checkbox for following text input" />
        </InputGroup>
        <Table />
        <Pagination />
      </Col>
    </Row>
  </div>
);
