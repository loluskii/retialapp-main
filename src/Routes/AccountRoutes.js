import React, {useEffect} from "react";
/**
 * packages
 */
import {Switch, Route, withRouter} from "react-router-dom";
import {TransactionList} from "../pages/Account/TransactionList";
// import PersonalData from "../Views/Account/PersonalData";
// import ChangePassword from "../Views/Account/ChangePassword";
import { BetList } from "../pages/Account/BetList";
import {JackpotBetList} from "../pages/Account/JackpotBetList";
import {useSelector} from "react-redux";
import {BonusTransactionList} from "../pages/Account/BonusTransactionList";
// import {Bonus} from "../pages/Account/Bonus";
import {Expenses} from "../pages/Account/Expenses";
import {CashIn} from "../pages/Account/CashIn";
import {CashOut} from "../pages/Account/CashOut";
import {CouponBetList} from "../pages/Account/CouponBetList";

const AccountRoutes = ({history}) => {
    const {isAuthenticated} = useSelector(state => state.auth);

    useEffect(() => {
        if(!isAuthenticated)
            history.replace('/');

    },  [isAuthenticated]);

  return (
      <Switch>
        {/*<Redirect exact from="/Account" to="/Account/Overview" />*/}
        <Route exact path="/Account/TransactionList" component={TransactionList} />
        <Route exact path="/Account/BonusTransactionList" component={BonusTransactionList} />
        {/* <Route exact path="/Account/Bonuses" component={Bonus} /> */}
        <Route exact path="/Account/Expenses" component={Expenses} />
        <Route exact path="/Account/Cash-In" component={CashIn} />
        <Route exact path="/Account/Cash-Out" component={CashOut} />
        {/* <Route exact path="/Account/BetDetail/:betslip" component={BetDetail} /> */}
        <Route exact path="/Account/BetList" component={BetList} />
        <Route exact path="/Account/JackpotBetList" component={JackpotBetList} />
        <Route exact path="/Account/CouponBetList" component={CouponBetList} />
      </Switch>
  );
}

export default withRouter(AccountRoutes);
