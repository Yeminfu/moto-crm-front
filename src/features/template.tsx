import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../api";
import { createStore, createEvent } from "effector";
import { createComponent } from "effector-react";

const setCategories = createEvent<any>();
export const categories = createStore<any>(null).on<any>(
  setCategories,
  (_, v) => v
);

const setShops = createEvent<any>();
export const shops = createStore<any>(null).on<any>(setShops, (_, v) => v);
API.get_shops().then((response) => {
  setShops(response.data.shops);
  // console.log("response", response);
});

interface categoryType {
  id: string;
  name: string;
}

const Nav = createComponent(categories, (props: any, state: any) => {
  useEffect(() => {
    if (!state) {
      API.get_categories().then((response) => {
        setCategories(response.data.categories);
      });
    }
  }, []);
  return (
    <>
      <ul className="nav flex-column navbar align-items-start">
        {state
          ?.map((category: categoryType, i: number) => ({
            text: category.name,
            href: `/products/${category.id}`,
          }))
          ?.map((x: any, i: any) => (
            <li className="nav-item" key={i}>
              <Link to={x.href} className="text-white bg-dark nav-link active">
                {x.text}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
});

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
          <Nav />

          {/* <div>===========</div> */}
          <ul className="nav flex-column navbar align-items-start">
            {[
              { text: "Годовой отчет", href: "/report" },
              { text: "Создать товар", href: "/create-product" },
              // { text: "Товары", href: "/products" },
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
        </Col>
      </Row>
    </div>
  );
};
