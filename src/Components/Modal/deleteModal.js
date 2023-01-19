import React from "react";
import { useDispatch } from "react-redux";
import {
  getAllExpenses,
  deleteExpenseItem,
} from "../../Redux/actions/expenses";

function DeleteModal({ toggle, id }) {
  const dispatch = useDispatch();

  const deleteItem = () => {
    console.log(id, 79);
    dispatch(deleteExpenseItem(id));
    dispatch(getAllExpenses());
    toggle();
  };
  return (
    <div
      style={{ textAlign: "center", marginBottom: "4rem", marginTop: "2rem" }}
    >
      <h4 style={{ color: "#4c4c4c" }}>Are you sure ?</h4>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="red"
          onClick={() => deleteItem()}
          style={{
            background: "red",
            color: "white",
            marginRight: "1rem",
            border: "0px",
            padding: ".3rem 1rem",
          }}
        >
          YES
        </button>
        <button
          className="green"
          onClick={() => toggle()}
          style={{
            background: "#000229",
            color: "white",
            marginRight: "1rem",
            border: "0px",
            padding: ".3rem 1rem",
          }}
        >
          NO
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
