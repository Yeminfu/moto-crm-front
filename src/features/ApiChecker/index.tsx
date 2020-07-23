import React from "react";
// import {
//   Row,
//   Col,
//   // Card,
//   Button,
//   // ListGroup,
//   // Badge,
//   InputGroup,
//   FormControl,
// } from "react-bootstrap";
// import { Form, Field } from "react-final-form";
// import axios from "axios";
import { Login } from "./login";

// .on(sub, (count, n) => count - n)
// .reset(reset);

export const ApiChecker = () => (
  <>
    <Login />
  </>
);

// const onSubmit = (values: any) => {
//   axios.get("http://10.0.0.31:3001/api/login").then((x) => console.log("x", x));
// };

// const MyForm = () => (
//   <Form
//     onSubmit={onSubmit}
//     initialValues={{
//       login: "loginasda",
//       password: "passwordasda",
//     }}
//     render={({ handleSubmit, values }) => (
//       <form onSubmit={handleSubmit}>
//         <Row>
//           <Col sm="4">
//             <Field name="login">
//               {(props) => (
//                 <InputGroup>
//                   <FormControl
//                     placeholder="Login"
//                     aria-label="Username"
//                     aria-describedby="basic-addon1"
//                     {...props.input}
//                   />
//                 </InputGroup>
//               )}
//             </Field>
//             <Field name="password">
//               {(props) => (
//                 <InputGroup>
//                   <FormControl
//                     placeholder="Password"
//                     aria-label="Username"
//                     aria-describedby="basic-addon1"
//                     {...props.input}
//                   />
//                 </InputGroup>
//               )}
//             </Field>
//             <Button variant="outline-primary" type="submit" size="sm">
//               send
//             </Button>
//           </Col>
//         </Row>
//         <pre>{JSON.stringify(values, null, " ")}</pre>
//       </form>
//     )}
//   />
// );
