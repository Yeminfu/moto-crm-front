import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  Form as BForm,
} from "react-bootstrap";
import "./login.scss";
import { Form as FinalForm, Field } from "react-final-form";
import { API } from "../../api";
import { createEvent, createStore } from "effector";
// import { useStore } from "effector-react";
import Swal from "sweetalert2";

export const setAuth = createEvent<any>();
export const $auth = createStore({}).on(setAuth, (_, x: any) => x);
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setAuth({});
};

export const Login = () => {
  // const user = useStore($auth);
  return (
    <>
      {/* <pre>{JSON.stringify(user, null, " ")}</pre> */}
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
                    своего менеджера данные для доступа на портал, введите их
                    ниже
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
                    Если Вы только хотите им стать, то Вы можете заполнить
                    заявку, и после ее рассмотрения наши менеджеры свяжутся с
                    Вами и предоставят данные для доступа. Для этого Вы можете
                    написать нам на{" "}
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
};

const onSubmit = ({ email, password }: any) => {
  API.login(email, password).then((response: any) => {
    const { success, token, user } = response.data;
    if (success) {
      setTimeout(() => {
        setAuth({
          token,
          user,
        });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }, 1000);
    } else {
      Swal.fire({
        title: "Ошибка!",
        text: "Неправильный логин или пароль",
        icon: "error",
        confirmButtonText: "Ок",
      });
    }
  });
};

const required = (value: any) => (value ? undefined : "Required");

const MyForm = () => (
  <FinalForm
    onSubmit={onSubmit}
    initialValues={{
      email: "smet@mail.ru",
      password: "фывфыв",
    }}
    render={({ handleSubmit, values, touched, errors }) => (
      <form onSubmit={handleSubmit}>
        <Field name="email" validate={required}>
          {(props) => (
            <BForm.Group>
              <BForm.Label>Email</BForm.Label>
              <FormControl
                isInvalid={touched?.email && errors.email}
                placeholder="email"
                aria-describedby="basic-addon1"
                {...props.input}
              />
            </BForm.Group>
          )}
        </Field>
        <Field name="password" validate={required}>
          {(props) => (
            <BForm.Group>
              <BForm.Label>Password</BForm.Label>
              <FormControl
                isInvalid={touched?.password && errors.password}
                placeholder="password"
                type="password"
                aria-describedby="basic-addon1"
                {...props.input}
              />
            </BForm.Group>
          )}
        </Field>
        <Row className="align-items-center mt-2">
          <Col className="col-md-auto">
            <Button type="submit" size="sm">
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
