import React, { Fragment } from "react";

/**
 * packages
 */
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer'

// import NotFound from "../Views/NotFound";

import SportRoutes from "./SportRoutes";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
// import {authDetails, sendLogout} from "../Services/apis";
import {REMOVE_USER_DATA, UPDATE_USER_DATA} from "../Redux/types";
import AccountRoutes from "./AccountRoutes";
// import LiveRoutes from "./LiveRoutes";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import Sports from "../Layouts/Sports";
import Account from "../Layouts/Account";


export default function Routes() {
  const {isAuthenticated} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnIdle = event => {
    // if(isAuthenticated) {
    //   sendLogout().then(res => {
    //     dispatch({type: REMOVE_USER_DATA});
    //     document.body.classList.add("Anonymous");
    //     document.body.classList.remove("Logged");
    //   }).catch (err => {
    //     dispatch({type: REMOVE_USER_DATA});
    //     document.body.classList.add("Anonymous");
    //     document.body.classList.remove("Logged");
    //   });
    // }
  }

  const handleOnActive = event => {
    // console.log('user is active', event)
    // console.log('time remaining', getRemainingTime())
  }

  const handleOnAction = (e) => {
    // console.log('user did something', e)
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 30,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })

  useEffect(() => {
    // if (isAuthenticated) {
    //   authDetails().then(resp => {
    //     if(resp.user) {
    //       const user = resp.user;
    //       dispatch({
    //         type: UPDATE_USER_DATA,
    //         payload: user
    //       });
    //     }
    //   })
    // }
  }, [isAuthenticated]);

  return (
    <Fragment>
      
      <Router>
        <Switch>
          <Redirect from="/" to="/Login" exact />
          <Route path="/Login" component={Login} />
          <Route path="/Home" component={Home} />
          {/* <Route path="/Casino" component={Casino} /> */}
          <Route path="/Sport/:path?/:extra?" exact>
            <Sports>
              <SportRoutes />
            </Sports>
          </Route>
          {/* <Route path="/Live/:path?/:extra?" exact>
            <InPlay>
              <LiveRoutes />
            </InPlay>
          </Route>*/}
          <Route path="/Account/:path?/:extra?" exact>
            <Account>
              <AccountRoutes />
            </Account>
          </Route> 
          {/* <Route x="/BecomeAnAgent/:path?/:extra?" exact>
            <BecomeAnAgent>
              <Switch>
                <Route exact path="/BecomeAnAgent/register" component={AgentRegister} />
                <Route exact path="/BecomeAnAgent/benefits" component={Benefits} />
                <Route exact path="/BecomeAnAgent/how-to-start" component={EasySteps} />
                <Route exact path="/BecomeAnAgent" component={Index} />
              </Switch>
            </BecomeAnAgent>
          </Route> */}
          {/* <Route path={["/404", "*"]} component={NotFound} /> */}
        </Switch>
      </Router>
    </Fragment>
  );
}
