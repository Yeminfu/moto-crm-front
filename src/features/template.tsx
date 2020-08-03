import React, { useEffect } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../api";
import { createStore, createEvent } from "effector";
import { createComponent } from "effector-react";
import { useLocation } from "react-router-dom";

const setCategories = createEvent<any>();
export const categories = createStore<any>(null).on<any>(
  setCategories,
  (_, v) => v
);

const setShops = createEvent<any>();
export const shops = createStore<any>(null).on<any>(setShops, (_, v) => v);
API.get_shops().then((response) => {
  setShops(response.data.shops);
});

interface categoryType {
  id: string;
  name: string;
}

const Menu = createComponent(categories, (props: any, state: any) => {
  let location = useLocation();
  useEffect(() => {
    if (!state) {
      API.get_categories().then((response) => {
        setCategories(response.data.categories);
      });
    }
  }, [state]);
  return (
    <>
      <Nav variant="pills" defaultActiveKey="/home" className="flex-column">
        {state
          ?.map((category: categoryType, i: number) => ({
            text: category.name,
            href: `/products/${category.id}`,
          }))
          ?.map((x: any, i: any) => (
            <Nav.Item>
              <Link
                to={x.href}
                className={`nav-link text-white ${
                  location.pathname === x.href ? "active" : ""
                }`}
              >
                {x.text}
              </Link>
            </Nav.Item>
          ))}
      </Nav>
      <hr />
      <Nav
        variant="pills"
        defaultActiveKey="/home"
        className="flex-column navbar-inverse"
      >
        {[
          { text: "Годовой отчет", href: "/report" },
          { text: "Создать товар", href: "/create-product" },
          { text: "Создать категорию", href: "/create-category" },
          { text: "Штат", href: "/staff" },
          // { text: "Товары", href: "/products" },
        ].map((x: any, i: any) => (
          <Nav.Item>
            <Link
              to={x.href}
              className={`nav-link text-white ${
                location.pathname === x.href ? "active" : ""
              }`}
            >
              {x.text}
            </Link>
          </Nav.Item>
        ))}
      </Nav>
      {/* <ul className="nav flex-column navbar align-items-start">
        {[
          { text: "Годовой отчет", href: "/report" },
          { text: "Создать товар", href: "/create-product" },
          { text: "Создать категорию", href: "/create-category" },
          { text: "Штат", href: "/staff" },
          // { text: "Товары", href: "/products" },
        ].map((x, i) => (
          <li className="nav-item" key={i}>
            <Link to={x.href} className="text-white bg-dark nav-link active">
              {x.text}
              {location.pathname === x.href ? "active" : "not active"}
            </Link>
          </li>
        ))}
      </ul> */}
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
  // const [categories, setCategories] = useState<categoryType[]>([]);
  useEffect(() => {
    API.get_categories().then((response) => {
      setCategories(response.data.categories);
    });
  }, []);
  return (
    <div className="container-fluid">
      <Row className="dashboard">
        <Col className="bg-dark col-md-auto">
          <Menu />

          {/* <div>===========</div> */}
        </Col>
        <Col>
          <h1>{title}</h1>
          {children}
        </Col>
      </Row>
    </div>
  );
};
