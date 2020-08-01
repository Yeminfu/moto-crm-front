import React, { useEffect, useState } from "react";
import "./style.scss";
import { Row, Col, InputGroup, Button, Spinner } from "react-bootstrap";
import { Table } from "../Table";
import { Filter } from "../Filter";
import { Link } from "react-router-dom";
import { API } from "../../api";
import { refactorReport } from "./refactor-report";

export const YearReport = (props: any) => {
  const [category, setCategory] = useState("boats");

  const [reportData, setReportData] = useState<any[]>([]);
  const [disableMonth, setDisableMonth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    API.get_report({ category, year: "2020" }).then((x) => {
      setReportData(refactorReport(x.data.data));
      setLoading(false);
    });
  }, [category]);

  const view = reportData.map((x, i) =>
    x.filter((x: any, i: any) => {
      if (i === 6) {
        return disableMonth;
      }
      return true;
    })
  );

  return (
    <div className="container-fluid">
      {/* <pre>{JSON.stringify({ params: props.location }, null, " ")}</pre> */}
      <Row className="dashboard">
        <Col className="bg-dark col-md-auto">
          {/* <ul className="nav flex-column navbar align-items-start">
            {[
              { text: "Лодки", href: "/report" },
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
          <div>===========</div> */}
          <ul className="nav flex-column navbar align-items-start">
            {[
              { text: "Годовой отчет", href: "/report" },
              { text: "Товары", href: "/products" },
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
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <>
              <Filter />
              <InputGroup className="mb-3">
                <Button
                  variant={disableMonth ? "primary" : "outline-primary"}
                  onClick={() => setDisableMonth(!disableMonth)}
                >
                  Продажи/Мес
                </Button>
              </InputGroup>
              <Table reportData={view} />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};
