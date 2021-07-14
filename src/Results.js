import React, { Component } from "react";

export default class Results extends Component {
  render() {
    // let x = window.location.search;
    // let arr = [];
    // new URLSearchParams(x).forEach((value, key) => {
    //   arr.push(
    //     <h3>
    //       {key.toUpperCase()}:{value}
    //     </h3>
    //   );
    // });
    // return (
    //   <div>
    //     <div>{arr}</div>
    //     <h1>results page</h1>
    //   </div>
    // );
    let { name, email, textarea } = this.props.data;
    return (
      <div>
        <h3>Name:{name}</h3>
        <br />
        <h3>Email:{email}</h3>
        <br />
        <h3>TextArea:{textarea}</h3>
      </div>
    );
  }
}
