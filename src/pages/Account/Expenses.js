import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../../Redux/actions/expenses";

/**
 * packages
 */

export const Expenses = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const expenseData = useSelector((state) => state.expenses);
  const { expense, loading } = expenseData;
  const expenseDetail = expense && expense ? expense : [];

  useEffect(() => {
    dispatch(getAllExpenses());
  }, [dispatch]);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="homeShop logged">
        <h1 style={{ color: "white" }}>Expenses</h1>
        <div class="account">
          <div class="page__head">
            <div
              class="page__head-item app-flex-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3> Expenses History</h3>
              <div class="account-head-btn">
                <input
                  type="button"
                  name="expenses"
                  id="ac_w_PC_PC_btnAvanti"
                  class="button"
                  value="+ Add Expense"
                />
              </div>
            </div>
            <table
              style={{
                borderWidth: "0px",
                borderStyle: "none",
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <tr style={{
                backgroundColor: "#975e01",
              }}>
                <th scope="col">S/N</th>
                <th align="center" scope="col">
                  ID
                </th>
                <th align="center" scope="col">
                  Date
                </th>
                <th class="dgHdrImporti" scope="col">
                  Amount
                </th>
                <th align="center" scope="col">
                  Transaction
                </th>
                <th align="center" scope="col">
                  Comment
                </th>
              </tr>
              <tbody>
                {loading ? (
                  <tr style={{ textAlign: "center", width: "100%" }}>
                    <h3>LOADING.....</h3>{" "}
                  </tr>
                ) : (
                  expenseDetail &&
                  expenseDetail.map((expense, i) => (
                    <tr className="dgItemStyle">
                      <td align="center"> {i + 1}</td>
                      <td align="center">{expense?.id}</td>
                      <td align="center"> {expense?.date}</td>
                      <td align="center">{expense?.amount}</td>
                      <td align="center">{expense?.expensetype?.title}</td>
                      <td align="center">{expense?.comment}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
