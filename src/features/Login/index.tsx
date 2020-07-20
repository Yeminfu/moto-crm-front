import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./login.scss";
import { Form as FinalForm } from "react-final-form";

export const Login = () => (
  <>
    <div className="login d-flex flex-column justify-content-center">
      <Container className="rounded">
        <div className="login__inner rounded ">
          <Row className="">
            <Col xs={12} md={7} className="login__left pt-4 pb-4">
              <div className="p-lg-5">
                <h1>Мотохит27</h1>
                <h3>Вход для оптовых клиентов</h3>
                <p>
                  Если Вы уже являетесь нашим оптовым клиентом и получали у
                  своего менеджера данные для доступа на портал, введите их ниже
                </p>
                <div className="mt-2 mb-2">
                  <MyForm />
                </div>
              </div>
            </Col>
            <Col
              xs={12}
              md={5}
              className="login__right d-flex flex-column justify-content-center  pt-4 pb-4"
            >
              <div className="p-lg-5">
                <h3>Получить аккаунт</h3>
                <p>
                  Если Вы только хотите им стать, то Вы можете заполнить заявку,
                  и после ее рассмотрения наши менеджеры свяжутся с Вами и
                  предоставят данные для доступа. Для этого Вы можете написать
                  нам на{" "}
                  <b style={{ whiteSpace: "nowrap" }}>
                    <a href="mailto:bir-moto@mail.ru">bir-moto@mail.ru</a>
                  </b>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  </>
);

const onSubmit = () => alert("submit");

const MyForm = () => (
  <FinalForm
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Row className="align-items-center mt-2">
          <Col className="col-md-auto">
            <Button variant="danger" type="submit">
              Войти
            </Button>
          </Col>
          <Col>
            <Button variant="link">Забыли пароль?</Button>
          </Col>
        </Row>
      </form>
    )}
  />
);
