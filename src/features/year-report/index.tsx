import React, { useEffect, useState } from "react";
import "./style.scss";
import { Row, Col, InputGroup } from "react-bootstrap";
import { Table } from "../Table";
import { Pagination } from "../Pagination";
import { Filter } from "../Filter";
import { Link, useParams } from "react-router-dom";
import { API } from "../../api";
import { refactorReport } from "./refactor-report";

export const YearReport = (props: any) => {
  let { id } = useParams();
  const [reportData, setReportData] = useState<any[]>([]);
  useEffect(() => {
    API.get_report({ category: id, year: "2020" }).then((x) => {
      // console.log("response", x.data.data);
      refactorReport(x.data.data);
      setReportData(refactorReport(x.data.data));
    });
  }, [id]);
  // console.log("reportData", reportData);

  return (
    <div className="container-fluid">
      <Row className="dashboard">
        <Col className="bg-dark col-md-auto">
          <ul className="nav flex-column navbar align-items-start">
            {[
              { text: "Лодки", href: "/report/boats" },
              { text: "Мотоциклы", href: "/report/moto" },
              { text: "Главная", href: "/" },
              { text: "Создать товар", href: "/create-product" },
            ].map((x, i) => (
              <li className="nav-item" key={i}>
                <Link
                  to={x.href}
                  className="text-white bg-dark nav-link active"
                >
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
          <Table reportData={reportData} />
          <Pagination />
        </Col>
      </Row>
    </div>
  );
};
