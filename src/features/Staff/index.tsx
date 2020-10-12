import React, { useEffect, useState } from "react";
import { Template, shops as shopss } from "../template";
import { API } from "../../api";
import {} from "../Table";
import {
  Table,
  Modal,
  Form as BForm,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useStore } from "effector-react";
import swal from "sweetalert2"

export const Staff = () => {
  const [roles, setRoles] = useState<any>([]);
  const [modalAddPerson, setModalAddPerson] = useState<any>(false);
  const [modalEditPerson, setModalEditPerson] = useState<{
    modalIsOpen: boolean;
    data?: {
      info: {
        roles: {
          id: "1" | "2";
        };
      };
    };
  }>({
    modalIsOpen: false,
  });
  const [staff, setStaff] = useState<any>([]);
  const [loading, setoading] = useState<any>(false);

  const reboot = () => {
    setoading(true);
    API.get_staff().then((response: any) => {
      response.data&&setStaff(response.data.staff);
      setoading(false);
    });
  };

  useEffect(() => {
    API.get_staff().then((response: any) => response.data&&setStaff(response.data.staff));
    API.get_roles().then((response: any) => response.data&&setRoles(response.data.roles));
  }, []);

  useEffect(() => {
    reboot();
  }, []);
  return (
    <Template title="Штат">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            size="sm"
            className="table-striped w-auto"
          >
            <thead style={{ whiteSpace: "nowrap" }}>
              <tr>
                <th>ФИО</th>
                <th>Должность</th>
                <th>Магазин</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {staff?.map((user: any, i: number) => (
                <tr key={i}>
                  <td>{user.name}
              {/* <pre>{JSON.stringify(user,null," ")}</pre> */}
                  
                  </td>
                  <td>
                    {roles.find((role: any) => role.id === user.role)?.role}
                  </td>
                  <td>{user.shop_id}</td>

                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        //   setModalAddPerson({ product });
                        setModalEditPerson((data) => ({
                          data: user,
                          modalIsOpen: true,//
                        }));
                      }}
                      size="sm"
                    >
                      Изменить
                    </Button>
                  </td>
                </tr>
              ))}
              <tr></tr>
            </tbody>
          </Table>
          <Button
            onClick={() => {
              setModalAddPerson(true);
            }}
          >
            Добавить сотрудника
          </Button>
        </>
      )}

      <AddStaff
        modalAddPerson={modalAddPerson}
        setModalAddPerson={setModalAddPerson}
        roles={roles}
        reset={reboot}
      />
      <Modal
        show={modalEditPerson.modalIsOpen}
        onHide={() =>
          setModalEditPerson((data) => ({
            // ...data,
            modalIsOpen: false,
          }))
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>Редактировать данные сотрудника</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditStaff
            initialValues={{
              ...modalEditPerson.data,
            }}
            roles={roles}
            setModalEditPerson={setModalEditPerson}
            reset={reboot}
          />
        </Modal.Body>
      </Modal>
      <Modal.Body></Modal.Body>
    </Template>
  );
};

const AddStaff = ({ modalAddPerson, setModalAddPerson, roles, reset }: any): any => {
  const shops = useStore(shopss);
  const onSubmit = (values: any) => {
    console.log(values);
    API.add_user(values).then((response:any)=>{
      if(response?.data?.success){
        reset();
        swal.fire({
          title: "Успех!",
          icon: "success"
        }).then(()=>{
          setModalAddPerson(null);
        })
      }
    });
  };
  const required = (value: any) => (value ? undefined : "Required");
  return (
    <>
      <Modal show={modalAddPerson ? true : false} onHide={setModalAddPerson}>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          mutators={{
            setPrice: (args, state, utils) => {
              utils.changeValue(state, "sum", () => args);
            },
          }}
          render={({ form, handleSubmit, values, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Добавить сотрудника</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Field name="name" validate={required}>
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>ФИО</BForm.Label>
                      <FormControl
                        isInvalid={touched?.name && errors.name}
                        placeholder="фио"
                        aria-describedby="basic-addon1"
                        {...props.input}
                      />
                    </BForm.Group>
                  )}
                </Field>
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
                <Field name="shop_id" validate={required}>
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>Магазин</BForm.Label>
                      <BForm.Control
                        as="select"
                        {...props.input}
                        isInvalid={touched?.shop_id && errors.shop_id}
                      >
                        <option />
                        {shops?.map((shop: { name: string; id: string }) => (
                          <option key={shop.name} value={shop.id}>
                            {shop.name}
                          </option>
                        ))}
                      </BForm.Control>
                    </BForm.Group>
                  )}
                </Field>
                <Field name="role" validate={required}>
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>Должность</BForm.Label>
                      <BForm.Control
                        as="select"
                        {...props.input}
                        isInvalid={touched?.role && errors.role}
                      >
                        <option />
                        {roles?.map((role: any) => (
                          <option key={role.id} value={role.id}>
                            {role.role}
                          </option>
                        ))}
                      </BForm.Control>
                    </BForm.Group>
                  )}
                </Field>
                <Field name="password" validate={required}>
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>Пароль</BForm.Label>
                      <FormControl
                        isInvalid={touched?.password && errors.password}
                        placeholder="пароль"
                        aria-describedby="basic-addon1"
                        type="password"
                        {...props.input}
                      />
                    </BForm.Group>
                  )}
                </Field>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setModalAddPerson(null);
                  }}
                >
                  Отмена
                </Button>
                <Button variant="primary" type="submit">
                  Подтвердить
                </Button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    </>
  );
};

const EditStaff = ({
  modalAddPerson,
  setModalEditPerson,
  roles,
  initialValues,
  reset
}: any): any => {
  const shops = useStore(shopss);
  const onSubmit = (values: any) => {
    console.log(values);
    API.edit_staff(values).then((response)=>{
      if(response?.data?.success){
        reset();
        swal.fire({
          title:"Успех!",
          // "text"
          icon:"success"
        }).then(()=>{
          setModalEditPerson({modalIsOpen:false});
        })
      }
      console.log('setModalEditPerson',response.data.success);
    })
  };

  const required = (value: any) => (value ? undefined : "Required");
  return (
    <>
      {/* <pre>{JSON.stringify({ initialValues }, null, " ")}</pre> */}
      {/* <Modal show={modalAddPerson ? true : false} onHide={setModalAddPerson}> */}
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        mutators={{
          setPrice: (args, state, utils) => {
            utils.changeValue(state, "sum", () => args);
          },
        }}
        render={({ form, handleSubmit, values, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            {/* <pre>{JSON.stringify({ values }, null, " ")}</pre> */}
            {/* <Modal.Header closeButton>
                <Modal.Title>Добавить сотрудника</Modal.Title>
              </Modal.Header>
              <Modal.Body> */}
            <Field name="name" validate={required}>
              {(props) => (
                <BForm.Group>
                  <BForm.Label>ФИО</BForm.Label>
                  <FormControl
                    isInvalid={touched?.name && errors.name}
                    placeholder="фио"
                    aria-describedby="basic-addon1"
                    {...props.input}
                  />
                </BForm.Group>
              )}
            </Field>
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
            <Field name="shop_id" validate={required}>
              {(props) => (
                <BForm.Group>
                  <BForm.Label>Магазин</BForm.Label>
                  <BForm.Control
                    as="select"
                    {...props.input}
                    isInvalid={touched?.shop_id && errors.shop_id}
                  >
                    <option />
                    {shops?.map((shop: { name: string; id: string }) => (
                      <option key={shop.name} value={shop.id}>
                        {shop.name}
                      </option>
                    ))}
                  </BForm.Control>
                </BForm.Group>
              )}
            </Field>
            <Field name="role" validate={required}>
              {(props) => (
                <BForm.Group>
                  <BForm.Label>Должность</BForm.Label>
                  <BForm.Control
                    as="select"
                    {...props.input}
                    isInvalid={touched?.role && errors.role}
                  >
                    <option />
                    {roles?.map((role: any) => (
                      <option key={role.id} value={role.id}>
                        {role.role}
                      </option>
                    ))}
                  </BForm.Control>
                </BForm.Group>
              )}
            </Field>
            <Field name="password" validate={required}>
              {(props) => (
                <BForm.Group>
                  <BForm.Label>Пароль</BForm.Label>
                  <FormControl
                    isInvalid={touched?.password && errors.password}
                    placeholder="пароль"
                    aria-describedby="basic-addon1"
                    type="password"
                    {...props.input}
                  />
                </BForm.Group>
              )}
            </Field>
            {/* </Modal.Body> */}
            <Modal.Footer>
              {/* <Button
                variant="secondary"
                onClick={() => {
                  setModalEditPerson({
                    modalIsOpen:false
                  });
                }}
              >
                Отмена
              </Button> */}
              <Button variant="danger" onClick={()=>{
                
                API.fire_an_employee({
                  user_id:initialValues.id
                }).then((response:any)=>{
                  if(response.data?.success){
                    reset();
                    swal.fire({
                      title:"Сотрудник уволен",
                      icon: "success"
                    }).then(()=>{
                      setModalEditPerson({
                        modalIsOpen:false
                      });
                    })
                  }
                })
              }
              }>
                Уволить сотрудника
              </Button>
            </Modal.Footer>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setModalEditPerson({
                    modalIsOpen:false
                  });
                }}
              >
                Отмена
              </Button>
              <Button variant="primary" type="submit">
                Подтвердить
              </Button>
            </Modal.Footer>
          </form>
        )}
      />
      {/* </Modal> */}
    </>
  );
};
