import React from "react";
import SingleRow from "./SingleRow";
import { connect } from "react-redux";

function Table({ tableArray }) {
  return (
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
                return (
                  <>
                    <SingleRow {...row} />
                  </>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return { tableArray: state.tableArray };
};
export default connect(mapStateToProps, null)(Table);
