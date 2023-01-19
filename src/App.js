import React, {Fragment, useCallback, useEffect} from 'react';
import { SWRConfig } from "swr";
import { ToastContainer} from "react-toastify";
import './App.scss';
import {AppHeader} from "./Components/AppHeader";
import Http from "./Utils/Http";
import ErrorBoundary from "./ErrorBoundary";
import {useDispatch, useSelector} from "react-redux";
import { AppFooter } from './Components/AppFooter';
import Routes from './Routes/Routes';
import { NavLink } from 'react-router-dom';
import { fetchBonusList, fetchGlobalVars } from './Services/apis';
import * as types from './Redux/types';

function App({history}) {
    const {isAuthenticated, user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
  
    const init = useCallback(() => {
      Promise.all([
        fetchBonusList(),
        fetchGlobalVars(),
      ]).then(res => {
        dispatch({type: types.SET_BONUS_LIST, payload: res[0]});
        dispatch({type: types.SET_GLOBAL_VAR, payload: res[1]});
      });
    }, [dispatch]);
  
    useEffect(() => {
      init();
    }, [init]);

    return (
      <ErrorBoundary>
          <SWRConfig
              value={{
                  fetcher: (url) => Http.get(url).then((res) => res),
                  refreshInterval: 15 * 60 * 1000,
                  shouldRetryOnError: false,
                  revalidateOnFocus: false,
                  errorRetryInterval: 0,
                  errorRetryCount: 2,
              }}
          >
            <Fragment>
              <AppHeader user={user} isAuthenticated={isAuthenticated} dispatch={dispatch} />
              <div className="container_TopMenu">
                <div className="topMenu">
                  <div className="tblMenu">
                    <ul>
                      <li><NavLink title="Home" to="/Home">Home</NavLink></li>
                      <li><a title="About Us" href="/Pages/aboutus/content">About Us</a></li>
                      <li><a title="Tutorials" href="/Pages/Tutorial_main/content">Tutorials</a></li>
                      <li><a title="FAQ" href="/Pages/Sport_header_Menu_Faqs/content">FAQ</a></li>
                      <li><a title="Deposit/Withdrawal" href="/TPAutologin.aspx?Destinazione=HowtoDepositWithdraw" target="_blank">Deposit/Withdrawal</a></li>
                      <li><a title="Livescore" onclick="window.open('https://ls.sir.sportradar.com/bet9ja','', 'width=1000,height=700,scrollbars=1')">Livescore</a></li>
                      <li><a title="Results" href="/Sport/Results.aspx">Results</a></li>
                      <li><a title="Statistics" onclick="window.open('https://s5.sir.sportradar.com/bet9ja','', 'width=1000,height=700,scrollbars=1')">Statistics</a></li>
                      <li><a title="Contact Us" href="/Pages/contactus/content">Contact Us</a></li>
                    </ul>
                  </div>    
                  <div id="LP_shop_notlogged" className="liveChat" />
                </div>
              </div>
              <div className="bannerHome">
                <div className="divMainHome">
                  <div id="divMain">
                    <div id="divContent">
                      <Routes />
                      <div className="spacer30"></div>
                    </div>
                  </div>
                </div>
              </div>
              <AppFooter />
            </Fragment>
          </SWRConfig>
          <ToastContainer
              position="bottom-right"
              autoClose={10000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
          />
      </ErrorBoundary>
  );
}

export default App;
