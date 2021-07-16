function getLocalStorage() {
  let val = localStorage.getItem("table");
  if (val) {
    return JSON.parse(localStorage.getItem("table"));
  } else {
    return [];
  }
}
const initialState = {
  formfield: {
    name: "",
    email: "",
    number: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    gender: "",
  },
  tableArray: getLocalStorage(),
  states: [],
  cities: [],
};
const reducer = (state = initialState, action) => {
  if (action.type === "INPUT") {
    const { name, value } = action.payload;

    return { ...state, formfield: { ...state.formfield, [name]: value } };
  }
  if (action.type === "DEL") {
    let { id } = action.payload;
    console.log(id);
    return { ...state };
  }
  if (action.type === "SDATA") {
    const { sdata } = action.payload;
    return { ...state, states: [...sdata] };
  }
  if (action.type === "CDATA") {
    let { cdata } = action.payload;

    return { ...state, cities: [...cdata] };
  }
  if (action.type === "RESETCITY") {
    return { ...state, cities: [] };
  }
  if (action.type === "SUBMIT") {
    let { newData } = action.payload;

    let table = [...state.tableArray, newData];
    localStorage.setItem("table", JSON.stringify(table));

    return { ...state, tableArray: [...state.tableArray, newData] };
  }
  if (action.type === "CHANGE") {
    let { name, value, id } = action.payload;

    let tempArray = state.tableArray.map((row) => {
      if (row.id === Number(id)) {
        return { ...row, [name]: value };
      }
      return row;
    });
    localStorage.setItem("table", JSON.stringify(tempArray));
    return { ...state, tableArray: tempArray };
  }
  if (action.type === "REMOVEROW") {
    let { id } = action.payload;

    let tempArray = state.tableArray.filter((row) => {
      return Number(row.id) !== Number(id);
    });
    return { ...state, tableArray: [...tempArray] };
  }
  if (action.type === "RESET") {
    return {
      ...state,
      formfield: {
        ...state.formfield,
        name: "",
        email: "",
        number: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        gender: "",
      },
    };
  }
  return state;
};
export default reducer;
