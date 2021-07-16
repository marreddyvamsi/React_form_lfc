import React from "react";
import { connect } from "react-redux";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function SingleRow(props) {
  let {
    id,
    name,
    email,
    number,
    gender,
    state,
    city,
    pincode,
    address,
    dispatch,

    del,
  } = props;
  const onchangeTable = (e) => {
    let id = e.target.parentElement.parentElement.id;
    let { name, value } = e.target;
    dispatch({ type: "CHANGE", payload: { id, name, value } });
  };

  const onblurTable = (e) => {
    e.target.disabled = true;
  };
  const editValue = (e) => {
    e.stopPropagation();
    let el = e.currentTarget.previousElementSibling;
    el.disabled = false;
    el.focus();
  };
//   const removeRow = (e) => {
//     let id = e.currentTarget.parentElement.id;
//     dispatch({ type: "REMOVEROW", payload: { id } });
//   };
  return (
    <>
      <tr key={id} id={id}>
        <td>
          <input
            value={`${name}`}
            id={id}
            name="name"
            onChange={onchangeTable}
          />
        </td>
        <td
          onClick={(e) => {
            let el = e.target.firstElementChild;
            if (el === null) {
              return;
            }
            el.disabled = true;
          }}
        >
          <input
            disabled={true}
            value={`${email}`}
            name="email"
            onChange={onchangeTable}
            onBlur={onblurTable}
          />
          <span onClick={editValue}>{<AiFillEdit />}</span>
        </td>
        <td>
          <input value={`${number}`} name="number" onChange={onchangeTable} />
        </td>
        <td>
          <input value={`${state}`} name="state" onChange={onchangeTable} />
        </td>
        <td>
          <input value={`${city}`} name="city" onChange={onchangeTable} />
        </td>
        <td>
          <textarea
            name="address"
            onChange={onchangeTable}
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
            onChange={onchangeTable}
          />
        </td>
        <td>
          <input
            type="text"
            value={`${gender}`}
            name="gender"
            onChange={onchangeTable}
          />
        </td>
        <td>
          <AiFillDelete style={{ cursor: "pointer" }} onClick={del} />
        </td>
      </tr>
    </>
  );
}
const mapStateToProps = (state) => {
  return { ...state };
};
const mapDispatchToProps = (dispatch, ownprops) => {
  const { id } = ownprops;
  return {
    del: () => dispatch({ type: "REMOVEROW", payload: { id } }),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleRow);
