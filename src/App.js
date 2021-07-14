import React, { Component } from "react";
import { connect } from "react-redux";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

// import Results from "./Results";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { errEmail: "", errName: "", errText: "" };
  }
  onchangeHandler = (e) => {
    let { name, value } = e.target;
    if (name === "state") {
      if (value === "--select-state--" || value === "") {
        this.props.dispatch({ type: "RESETCITY" });
      } else {
        let index = e.target.selectedIndex;
        let id = e.target[index].dataset.id;
        console.log(id);
        this.fetchCities(id);
      }
    }
    this.props.dispatch({ type: "INPUT", payload: { name, value } });
    if (name === "name") {
      this.setState({ errName: "" });
    } else if (name === "email") {
      this.setState({ errEmail: "" });
    } else {
      this.setState({ errText: "" });
    }
    // this.setState({ [name]: value });
  };
  validateForm = (name) => {
    let isValid = true;
    if (name === "name") {
      isValid = this.validateName();
    }
    if (name === "email") {
      isValid = this.validateEmail();
    }
    if (name === "textarea") {
      isValid = this.validateText();
    }
    return isValid;
  };
  validateName() {
    let { name } = this.state;
    if (name === "") {
      this.setState({ errName: "Name Can't Be Empty" });
    } else if (name.length < 3) {
      this.setState({ errName: "Name is Too Short" });
    } else {
      this.setState({ errName: "" });
    }
    return this.state.errName === "";
  }
  validateEmail() {
    let { email } = this.state;
    if (email === "") {
      this.setState({ errEmail: "Email Can't Be Empty" });
    } else if (!/^[a-zA-Z]+([._0-9]+)?[@][a-z]+[.][a-z]{2,3}$/.test(email)) {
      this.setState({ errEmail: "Invalid Email" });
    } else {
      this.setState({ errEmail: "" });
    }
    return this.state.errEmail === "";
  }
  validateText() {
    let { textarea } = this.state;
    if (textarea === "") {
      this.setState({ errText: "TextArea Can't Be Empty" });
    } else {
      this.setState({ errText: "" });
    }
    return this.state.errText === "";
  }
  // onblurHandler = (e) => {
  //   let { name } = e.target;

  //    this.validateForm(name);
  // };
  submitHandler(e) {
    e.preventDefault();

    let { name, email, number, address, city, state, gender, pincode } =
      this.props.formfield;
    let newData = {
      id: new Date().getTime(),
      name,
      email,
      number,
      address,
      city,
      state,
      gender,
      pincode,
    };
    let table = [...this.props.tableArray, newData];
    localStorage.setItem("table", JSON.stringify(table));

    this.props.dispatch({
      type: "SUBMIT",
      payload: { newData },
    });
    this.props.dispatch({ type: "RESET" });
  }
  removeRow = (e) => {
    let id = e.currentTarget.parentElement.id;
    this.props.dispatch({ type: "REMOVEROW", payload: { id } });
    console.log(e.currentTarget.parentElement, id);
    let table = this.props.tableArray.filter(
      (row) => Number(row.id) !== Number(id)
    );
    localStorage.setItem("table", JSON.stringify(table));
  };
  onchangeTable = (e) => {
    let id = e.target.parentElement.parentElement.id;
    // console.log(id2);
    // let id = e.target.id;
    let { name, value } = e.target;

    this.props.dispatch({ type: "CHANGE", payload: { id, name, value } });

    console.log(name, value);
  };
  onblurTable = (e) => {
    console.log(e.target);
    e.target.disabled = true;
  };
  fetchCities(id) {
    const data = null;
    let cdata = [];
    let dispatch = this.props.dispatch;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        cdata = JSON.parse(this.responseText);
        console.log(cdata);
        dispatch({ type: "CDATA", payload: { cdata } });
      }
    });
    xhr.open(
      "GET",
      `https://referential.p.rapidapi.com/v1/city?fields=iso_a2%2Cstate_code%2Cstate_hasc&iso_a2=IN&lang=en&state_code=${id}`
    );
    xhr.setRequestHeader(
      "x-rapidapi-key",
      "0bfe6ba515msh0bf74f84c535a89p1fbffcjsn00dbc8f55586"
    );
    xhr.setRequestHeader("x-rapidapi-host", "referential.p.rapidapi.com");
    xhr.send(data);
  }

  componentDidMount() {
    const data = null;
    let sdata = [];
    let dispatch = this.props.dispatch;
    console.log(this);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      console.log(this);
      if (this.readyState === this.DONE) {
        console.log(this);
        sdata = JSON.parse(this.responseText);
        console.log(sdata);
        dispatch({ type: "SDATA", payload: { sdata } });
      }
    });

    xhr.open(
      "GET",
      "https://referential.p.rapidapi.com/v1/state?fields=iso_a2&iso_a2=in&lang=en"
    );
    xhr.setRequestHeader(
      "x-rapidapi-key",
      "0bfe6ba515msh0bf74f84c535a89p1fbffcjsn00dbc8f55586"
    );
    xhr.setRequestHeader("x-rapidapi-host", "referential.p.rapidapi.com");

    xhr.send(data);
  }
  editValue = (e) => {
    e.stopPropagation();
    let el = e.currentTarget.previousElementSibling;
    console.log(el);
    el.disabled = false;
    el.focus();
  };

  render() {
    const { name, email, number, address, gender, city, state, pincode } =
      this.props.formfield;
    const { tableArray, states, cities } = this.props;

    return (
      <div>
        <div className="main-form">
          <form className="app" onSubmit={this.submitHandler.bind(this)}>
            {/* {this.state.errSubmit && <p>{this.state.errSubmit}</p>} */}
            <div>
              <label htmlFor="name">Name: </label>
              <input
                className={this.state.errName ? "danger" : null}
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={this.onchangeHandler}
                onBlur={this.onblurHandler}
                required={true}
                autoComplete="off"
              />
              {this.state.errName && (
                <div className="common">
                  <p>{this.state.errName}</p>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={this.onchangeHandler}
                onBlur={this.onblurHandler}
                required={true}
                autoComplete="off"
              />
              {this.state.errEmail && (
                <div className="common">
                  <p>{this.state.errEmail}</p>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="number">Phone: </label>
              <input
                type="number"
                name="number"
                id="number"
                value={number}
                onChange={this.onchangeHandler}
                onBlur={this.onblurHandler}
                required={true}
                autoComplete="off"
              />
              {this.state.errEmail && (
                <div className="common">
                  <p>{this.state.errEmail}</p>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="state">State: </label>
              <select
                name="state"
                id="state"
                value={state}
                onChange={this.onchangeHandler}
              >
                <option value="">--select-state--</option>
                {states.length > 0 &&
                  states.map((state) => {
                    return (
                      <option
                        key={state.key}
                        data-id={state.key}
                        value={state.value}
                      >
                        {state.value}
                      </option>
                    );
                  })}
              </select>
              <br />
              <label htmlFor="city">City: </label>
              <select
                name="city"
                id="city"
                value={city}
                onChange={this.onchangeHandler}
              >
                <option value="">--select-city--</option>
                {cities.length > 0 &&
                  cities.map((city) => {
                    return <option>{city.value}</option>;
                  })}
              </select>
            </div>
            <div>
              <div>
                <label htmlFor="address">Address:</label>
              </div>
              <textarea
                name="address"
                id="address"
                value={address}
                onChange={this.onchangeHandler}
                onBlur={this.onblurHandler}
              ></textarea>
              {this.state.errText && (
                <div className="common">
                  <p>{this.state.errText}</p>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="pincode">Pincode:</label>
              <input
                type="number"
                name="pincode"
                id="pincode"
                value={pincode}
                onChange={this.onchangeHandler}
                onBlur={this.onblurHandler}
                required={true}
                autoComplete="off"
              />
              {this.state.errEmail && (
                <div className="common">
                  <p>{this.state.errEmail}</p>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={this.onchangeHandler}
                onBlur={this.onblurHandler}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={this.onchangeHandler}
                onBlur={this.onblurHandler}
              />
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
        <div>
          {tableArray.length > 0 && (
            <table>
              <thead>
                <tr id="tr1">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Pincode</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {tableArray.length > 0 &&
                  tableArray.map((row) => {
                    const {
                      id,
                      name,
                      email,
                      number,
                      gender,
                      pincode,
                      city,
                      state,
                      address,
                    } = row;
                    return (
                      <>
                        <tr key={id} id={id}>
                          <td>
                            <input
                              value={`${name}`}
                              id={id}
                              name="name"
                              onChange={this.onchangeTable}
                            />
                          </td>
                          <td
                            onClick={(e) => {
                              let el = e.target.firstElementChild;
                              if (el === null) {
                                return;
                              }
                              e.target.firstElementChild.disabled = true;
                            }}
                          >
                            <input
                              disabled={true}
                              value={`${email}`}
                              name="email"
                              onChange={this.onchangeTable}
                              onBlur={this.onblurTable}
                            />
                            <span onClick={this.editValue}>
                              {<AiFillEdit />}
                            </span>
                          </td>
                          <td>
                            <input
                              value={`${number}`}
                              name="number"
                              onChange={this.onchangeTable}
                            />
                          </td>
                          <td>
                            <input
                              value={`${state}`}
                              name="state"
                              onChange={this.onchangeTable}
                            />
                          </td>
                          <td>
                            <input
                              value={`${city}`}
                              name="city"
                              onChange={this.onchangeTable}
                            />
                          </td>
                          <td>
                            <textarea
                              name="address"
                              onChange={this.onchangeTable}
                              value={`${address}`}
                            ></textarea>
                            {/* <input
                            type="text"
                            value={`${address}`}
                            name="address"
                            onChange={this.onchangeTable}
                          /> */}
                          </td>
                          <td>
                            <input
                              type="text"
                              value={`${pincode}`}
                              name="pincode"
                              onChange={this.onchangeTable}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={`${gender}`}
                              name="gender"
                              onChange={this.onchangeTable}
                            />
                          </td>
                          <td onClick={this.removeRow}>
                            <AiFillDelete />
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps, null)(App);
