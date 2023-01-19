import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCashOuts } from "../../Services/apis";

/**
 * packages
 */

export const CashOut = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCashout();
  }, [dispatch]);

  const fetchCashout = () => {
    setLoading(true);
    getCashOuts()
      .then((r) => {
        if (r.success) {
          setDetails(r.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className="homeShop logged">
        <h1 style={{ color: "white" }}>Cash Out</h1>
        <table
          style={{
            borderWidth: "0px",
            borderStyle: "none",
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tr
            style={{
              borderWidth: "0px",
              borderStyle: "none",
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#975e01",
            }}
            class="dgHdrStyle"
          >
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
              Comment
            </th>
          </tr>
          {loading ? (
            <tr style={{ textAlign: "center", width: "100%" }}>
              <h3>LOADING.....</h3>{" "}
            </tr>
          ) : (
            details &&
            details.map((expense, i) => (
              <tr className="dgItemStyle" key={i}>
                <td align="center">{expense?.id}</td>
                <td align="center"> {expense?.date}</td>
                <td align="center">{expense?.amount}</td>
                <td align="center">{expense?.comment}</td>
              </tr>
            ))
          )}
        </table>
      </div>
    </>
  );
};
