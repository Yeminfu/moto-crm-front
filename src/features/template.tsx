import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../api";

interface categoryType {
  id: string;
  name: string;
}

export const Template = ({
  title,
  children,
}: {
  children: any;
  title: string;
}) => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  useEffect(() => {
    API.get_categories().then((response) => {
      setCategories(response.data.categories);
    });
  }, []);
  return (
    <div className="container-fluid">
      <Row className="dashboard">
        <Col className="bg-dark col-md-auto">
          <ul className="nav flex-column navbar align-items-start">
            {[
              ...categories.map((category: categoryType, i: number) => ({
                text: category.name,
                href: `/products/${category.id}`,
              })),
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
          <div>===========</div>
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
          <h1>{title}</h1>
          {children}

          {/* <h1>asd</h1>
  <Filter
    filterHandle={filterHandle}
    reportData={reportData}
    categories={categories}
  />
  <InputGroup className="mb-3">
    <Button
      variant={disableMonth ? "primary" : "outline-primary"}
      onClick={() => setDisableMonth(!disableMonth)}
    >
      Продажи/Мес
    </Button>
  </InputGroup>
  {loading ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <>
      <Table reportData={view} />
    </>
  )} */}
        </Col>
      </Row>
    </div>
  );
};
