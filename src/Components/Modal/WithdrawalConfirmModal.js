import { LOADING, SHOW_MODAL } from "../../Redux/types";
import {  } from "../../Services/apis";
import { toast } from "react-toastify";
import { formatNumber } from "../../Utils/helpers";
import { createWithdraw } from "../../Redux/actions/onlineWithdraw";


export const WithdrawalConfirmModal = ({ data, dispatch }) => {

  const approve = () => {
    dispatch(createWithdraw({ withdraw_code: data.withdraw_code }));
    // toggle();
  };

  return (
    <div className="withdraw">
    <form className="new-entry">
      <div className="entry-field">
        <label>Username</label>
        <input
          type="text"
          name="opening"
          value={data.user.username}
          disabled={true}
        />
      </div>
      <div className="entry-field">
        <label>Withdrawal Amount</label>
        <input
          type="number"
          name="opening"
          value={formatNumber(data.amount)}
          disabled={true}
        />
      </div>
      {/* <div className="entry-field">
        <label>Code</label>
        <input
          type="text"
          name="opening"
          value={inputObject.withdrawCode}
          disabled={true}
        />
      </div> */}
      <div className="entry-field">
        <label>Account Balance</label>
        <input
          type="number"
          name="opening"
          disabled={true}
          value={data.user.balance}
        />
      </div>
    </form>
    <div className="expense-btn">
      <input
        type="button"
        name="expenses"
        value="WITHDRAW"
        className="btn-green"
        onClick={() => approve()}
      />
      <input
        type="button"
        name="expenses"
        value="CANCEL"
        className=" btn-red"
        onClick={() => dispatch({type: SHOW_MODAL, payload: null})}
      />
    </div>
  </div>
  );
}