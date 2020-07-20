import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./login.scss";

export const Login = () => (
  <>
    <div className="login">
      <Container>
        <div className="login__inner rounded">
          <Row>
            <Col sm={7}>
              <div>sitename</div>
              <div>descr</div>
              <div>form</div>
            </Col>
            <Col sm={5}>sm=4</Col>
          </Row>
        </div>
      </Container>
    </div>
  </>
);
