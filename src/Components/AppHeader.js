import {REMOVE_USER_DATA} from "../Redux/types";
import {NavLink} from "react-router-dom";
import React from "react";
import { formatNumber} from "../Utils/helpers";

export const AppHeader = ({user, dispatch, isAuthenticated}) => {

    return (
        <div id="divHeader">
            <div className="MenuUpdate">
                <div id="h_w_ctl33_UpdateProgress" style={{display:'none'}} role="status" aria-hidden="true">
                    Please wait&nbsp;
                    <img id="h_w_ctl33_imgWait" src="tops/wait_top.gif" align="absmiddle" style={{borderWidth: '0px'}} alt="waiting" />
                </div>
            </div>
            <div className="content_Header">
                <div className="Logo">
                    <a href="/" id="h_w_lnkHP">
                        <img id="h_w_Image1" src="/img/header_logo.png" style={{borderWidth: '0px', width: '210px'}} alt="logo" />
                    </a>
                </div>
                <div className="Tabs">
                    <ul>
                        <li><NavLink className="sel" title="Sport" to="/SportCashdesk">Sport</NavLink></li>
                        <li><a title="Live Viewer" href="https://live-viewer1.staging.sportsbookengine.com" target="_blank">Live Viewer TV</a></li>
                        <li><a title="ZOOM TV" href="/TPAutologin.aspx?Destinazione=ZoomTV" target="_blank">ZOOM TV</a></li>
                        <li><a title="Races" href="#">Races</a></li>
                    </ul>
                </div>
                <div className="GMTPanel">
                    Timezone:
                    <div className="GMT_content_wrapper True">
                        <div className="GMTFlags ">
                            <div className="GMT41 Sel">
                                <a href="../ChooseGMT.aspx?ID=41&amp;url=/Sport/Default.aspx" className="lnkGMTBtn" title="GMT+01:00">
                                    West Central Africa
                                </a>
                            </div>
                        </div>
                        <div id="btnGMTList">
                            <a id="btnGMTList_link" href="#" />
                        </div>
                    </div>
                </div>
                <div className="Lang_content_wrapper">
                    <div className="languageFlags">
                        <div className="en-GB Sel">
                            <a href="../ChooseLanguage.aspx?ID=2&amp;url=/Sport/Default.aspx" className="lnkLangBtn"
                               title="English">English</a>
                        </div>
                    </div>
                    <div id="btnLangList">
                        <a id="btnLangList_link" href="#" />
                    </div>
                </div>
                
                {isAuthenticated && 
                <div className="AreaRiservata">
                    <div className="divLoginLogged">
                        <div></div>
                        <table className="tblLoginLogged" cellPadding="0" cellSpacing="3" width="100%">
                            <tbody>
                            <tr>
                                <td className="tdUser">
                                    <div id="hl_w_cLogin_UpPanelLogin">
                                        <span className="IDUtente">{user?.code}</span>&nbsp;{user?.username}&nbsp;&nbsp;
                                    </div>
                                </td>
                                <td>
                                    <NavLink className="btnLogout" to="/Login" onClick={() => dispatch({type: REMOVE_USER_DATA})}>Logout</NavLink>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div id="divSaldo">
                            <span> 
                                <div className="TitoloValuta">
                                    <span>Currency</span>:
                                    <span>NGN</span>
                                </div>
                                <div className="TitoloSaldo">
                                    <span>Availability</span>:
                                    <span>{formatNumber(user?.balance)}&nbsp;₦</span>
                                    <input 
                                        type="image" 
                                        name="hl$w$cLogin$btnSaldo"
                                        className="btnRefreshSaldo"
                                        src="/img/Refresh_ico.png" 
                                        alt="Refresh balance" align="absmiddle" style={{borderWidth: '0px'}} />
                                </div>
                                <div className="divSaldoUtente">
                                    <span>Balance</span>:
                                    <span>{formatNumber(user?.balance)} ₦</span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}
