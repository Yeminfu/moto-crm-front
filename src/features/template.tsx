import React, { useEffect } from "react";
import { Row, Col, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../api";
import { createStore, createEvent } from "effector";
import { createComponent } from "effector-react";
import { useLocation } from "react-router-dom";
import { logout } from "./Login";
import { $auth } from "./Login";
import { useStore } from "effector-react";

const setCategories = createEvent<any>();
export const categories = createStore<any>([]).on<any>(
  setCategories,
  (_, v) => v
);

const setShops = createEvent<any>();
export const shops = createStore<any>(null).on<any>(setShops, (_, v) => v);

interface categoryType {
  id: string;
  name: string;
}

const Menu = createComponent(categories, (props: any, state: any) => {
  let location = useLocation();
  const { user } = useStore<any>($auth);
  useEffect(() => {
    API.get_shops().then((response) => {
      setShops(response.data?.shops);
    });
    if (!state) {
      API.get_categories().then((response) => {
        setCategories(response.data?.categories);
      });
    }
  }, [state]);
  return (
    <>
      <Button
        variant="outline-danger"
        size="sm"
        className="ml-3 mb-3 mt-2"
        onClick={logout}
      >
        Выйти
      </Button>
      <Nav
        variant="pills"
        defaultActiveKey="/home"
        className="flex-column navbar-inverse"
      >
        {[{ text: "Главная", href: "/" }].map((x: any, i: any) => (
          <Nav.Item key={i}>
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
      <Nav variant="pills" defaultActiveKey="/home" className="flex-column">
        {state
          ?.map((category: categoryType, i: number) => ({
            text: category.name,
            href: `/products/${category.id}`,
          }))
          ?.map((x: any, i: any) => (
            <Nav.Item key={i}>
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
          ...(() => {
            if (user?.role === "1") {
              return [
                { text: "Excel импорт", href: "/excel" },
                { text: "Архив", href: "/archive-products" },
                { text: "Сумма в товаре", href: "/in-products" },
                { text: "Годовой отчет", href: "/report" },
                { text: "Создать магазин", href: "/create-shop" },
                { text: "Штат", href: "/staff" },
              ];
            }
            return [];
          })(),
          { text: "Создать товар", href: "/create-product" },
          { text: "Создать категорию", href: "/create-category" },
          // { text: "Товары", href: "/products" },
        ].map((x: any, i: any) => (
          <Nav.Item key={i}>
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
      setCategories(response.data?.categories);
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
