import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// COMPONENTS
import AlertMsg from "./components/AlertMsg";
import Header from "./components/Header";
import Footer from "./components/Footer";

// OHTER
import noimg from "./noimg.png";
import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./redux/actions/user.actions";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users.data);
  const status = useSelector((state) => state.user.status);
  const [leadModal, setLeadModal] = useState(false);
  const [userID, setUserID] = useState("");

  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [formInput, setFormInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    location_type: "City",
    location_string: "",
  });
  const [formUpdateInput, setFormUpdateInput] = useState({ communication: "" });
  // const [formInputAll, setFormInputAll] = useState({
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   mobile: "",
  //   location_type: "City",
  //   location_string: "",
  // });

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e) => {
    setFormUpdateInput({ ...formUpdateInput, [e.target.name]: e.target.value });
  };

  const handleUpdate = (val) => {
    dispatch(userActions.updateUser(formUpdateInput, val));
    setUpdateModal(false);
  };

  const handleDelete = (val) => {
    dispatch(userActions.deleteUser(val));
    setDeleteModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      mobile,
      location_type,
      location_string,
    } = formInput;
    dispatch(
      userActions.createUser({
        first_name,
        last_name,
        email,
        mobile,
        location_type,
        location_string,
      })
    );
    setLeadModal(false);
  };

  useEffect(() => {
    dispatch(userActions.getAllUser(1));
  }, [dispatch, status]);

  return (
    <div id="wrap" className="wrap">
      <AlertMsg />
      <Header setLeadModal={setLeadModal} />
      <div id="home" className="home">
        <div className="container">
          <ul className="leads">
            {users &&
              users.data.map((user) => (
                <li key={user._id}>
                  <div className="avatar">
                    <div className="avatar__line"></div>
                    <div
                      className="avatar__img"
                      style={{ backgroundImage: `url('${noimg}')` }}
                    ></div>
                  </div>
                  <div className="info">
                    <div className="info__line"></div>
                    <div className="info__item">
                      <div className="icon icon--name">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="user"
                          className="svg-inline--fa fa-user fa-w-14"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                          ></path>
                        </svg>
                      </div>
                      <div className="content content--name">
                        <p>
                          <strong>{user.first_name} </strong>
                          <span>{user.last_name}</span>
                        </p>
                      </div>
                    </div>
                    <div className="info__item">
                      <div className="icon">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="phone"
                          className="svg-inline--fa fa-phone fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
                          ></path>
                        </svg>
                      </div>
                      <div className="content">
                        <p>{user.mobile}</p>
                      </div>
                    </div>
                    <div className="info__item">
                      <div className="icon">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="envelope"
                          className="svg-inline--fa fa-envelope fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                          ></path>
                        </svg>
                      </div>
                      <div className="content content--email">
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="info__item">
                      <div className="icon">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="globe-asia"
                          className="svg-inline--fa fa-globe-asia fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                        >
                          <path
                            fill="currentColor"
                            d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm-11.34 240.23c-2.89 4.82-8.1 7.77-13.72 7.77h-.31c-4.24 0-8.31 1.69-11.31 4.69l-5.66 5.66c-3.12 3.12-3.12 8.19 0 11.31l5.66 5.66c3 3 4.69 7.07 4.69 11.31V304c0 8.84-7.16 16-16 16h-6.11c-6.06 0-11.6-3.42-14.31-8.85l-22.62-45.23c-2.44-4.88-8.95-5.94-12.81-2.08l-19.47 19.46c-3 3-7.07 4.69-11.31 4.69H50.81C49.12 277.55 48 266.92 48 256c0-110.28 89.72-200 200-200 21.51 0 42.2 3.51 61.63 9.82l-50.16 38.53c-5.11 3.41-4.63 11.06.86 13.81l10.83 5.41c5.42 2.71 8.84 8.25 8.84 14.31V216c0 4.42-3.58 8-8 8h-3.06c-3.03 0-5.8-1.71-7.15-4.42-1.56-3.12-5.96-3.29-7.76-.3l-17.37 28.95zM408 358.43c0 4.24-1.69 8.31-4.69 11.31l-9.57 9.57c-3 3-7.07 4.69-11.31 4.69h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.767 26.767 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a7.978 7.978 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.18 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v24.6z"
                          ></path>
                        </svg>
                      </div>
                      <div className="content">
                        <p>{user.location_type}</p>
                      </div>
                    </div>
                    <div className="info__item">
                      <div className="icon">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="map-marker-alt"
                          className="svg-inline--fa fa-map-marker-alt fa-w-12"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path
                            fill="currentColor"
                            d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                          ></path>
                        </svg>
                      </div>
                      <div className="content">
                        <p>{user.location_string}</p>
                      </div>
                    </div>
                    {user.communication ? (
                      <div className="info__item">
                        <div className="icon">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="comments"
                            className="svg-inline--fa fa-comments fa-w-18"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path
                              fill="currentColor"
                              d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"
                            ></path>
                          </svg>
                        </div>
                        <div className="content">
                          <p>{user.communication}</p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="btns">
                    <button
                      onClick={() => {
                        setUserID(user._id);
                        setUpdateModal(true);
                      }}
                    >
                      Mark Update
                    </button>
                    <button
                      onClick={() => {
                        setUserID(user._id);
                        setDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
          <Modal show={leadModal} onHide={() => setLeadModal(false)}>
            <Modal.Header>
              <Modal.Title>Add Lead</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="number"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="location_type"
                    defaultValue="City"
                    onChange={handleChange}
                  >
                    <option value="City">City</option>
                    <option value="Zip">Zip</option>
                    <option value="Country">Country</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location String</Form.Label>
                  <Form.Control
                    type="text"
                    name="location_string"
                    placeholder="Location String"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={handleSubmit}
                className="c-btn c-btn--red"
                type="submit"
              >
                Save
              </button>
              <button onClick={() => setLeadModal(false)} className="c-btn">
                Close
              </button>
            </Modal.Footer>
          </Modal>
          <Modal show={updateModal} onHide={() => setUpdateModal(false)}>
            <Modal.Header>
              <Modal.Title>Mark Communication</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group form-group--full">
                  <Form.Label>Communication</Form.Label>
                  <Form.Control
                    type="text"
                    name="communication"
                    placeholder="Communication"
                    onChange={handleUpdateChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => handleUpdate(userID)}
                className="c-btn c-btn--red"
              >
                Save
              </button>
              <button onClick={() => setUpdateModal(false)} className="c-btn">
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
          <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
            <Modal.Header>
              <Modal.Title>Do you wish to delete this lead?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <button
                onClick={() => handleDelete(userID)}
                className="c-btn c-btn--red"
              >
                Delete
              </button>
              <button onClick={() => setDeleteModal(false)} className="c-btn">
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
