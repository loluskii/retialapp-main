import { useEffect } from "react";
import {useSelector} from "react-redux";
import { AccountMenu } from "../Components/AccountMenu";
export const Home = ({history}) => {
    const {isAuthenticated, user} = useSelector(state => state.auth);
    
    useEffect(() => {
        document.body.classList.add('defaultlogged', 'Logged');
        document.body.classList.remove('default', 'Anonymous');
        if (!isAuthenticated) {
            history.push('/Login');
            document.body.classList.remove('defaultlogged', 'Logged');
            document.body.classList.add('default', 'Anonymous');
        }

    }, [isAuthenticated]);

    return (
        <>
            <AccountMenu componentClase="homeLoggedMenu" />
            <div className="homeShop logged">
                <div className="bottoni">
                    <a className="printOdds" href="#"></a>
                    <a className="printSoccer" href="#" target="_blank"></a>
                    {/* <a id="hl_w_PC_SoccerSpecials" className="printSoccerSpecials new" href="GroupsExt.aspx?IDSport=542" target="_blank"></a> */}
                    <a className="printToday" href="#" target="_blank"></a>
                    <a className="bookBet" href="/Sport/Cashdesk"></a>
                    <a className="liveviewer" href="#" target="_blank"></a>
                    <a className="live-scores" href="#" target="_blank"></a>
                    <a className="casino" href="#" target="_blank"></a>
                    <a className="zoroplay-v" href="#" target="_blank"></a>
                    <a className="luckyballs" href="#" target="_blank"></a>
                    <a className="live-casino" href="#" target="_blank"></a>
                    <a className="adduser" href="#" target="_blank"></a>
                    {/* <div id="divIframeSimulate">
                        <span className="btnClose" onclick="toggleCouponSimulateVisualization();"></span>
                    </div>       */}
                    {/* <a type="button" className="SimulateGames newOrange" id="SimulateGames" onclick="toggleCouponSimulateVisualization();"></a> */}
                    <a className="online-deposit" href="#" target="_blank"></a>
                </div>
                <div className="boxInserimento">
                    <div className="check">
                        <div className="check-coupon">
                            <div className="SXTitle"><a id="hl_w_PC_ctl16_A1">Coupon Check</a></div>
                            <div className="divCouponCheck">
                                <div id="hl_w_PC_ctl16_upCheckCoupon">
                                    <div className="CheckCouponMain">
                                        <div className="CheckCpnTxt">
                                            Insert the coupon code you wish to check
                                        </div>
                                        <input name="hl$w$PC$ctl16$txtCodiceCoupon" type="text" />
                                        <a className="btnCheckCoupon" title="Check" href="javascript:__doPostBack('hl$w$PC$ctl16$lnkCheckCoupon','')"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="check-search">
                            <div className="Title">Odds Search</div>
                            <div className="SXCercaContent">
                                <div className="TitleCerca">
                                    <span id="hl_w_PC_oddsSearch_lblTitle">Search</span>
                                </div>
                                <div>
                                    <input name="hl$w$PC$oddsSearch$txtSearch" type="text" maxlength="50" className="TxtCerca" />
                                </div>
                                <div>
                                    <a title="Start search" className="BtnCerca" href="javascript:__doPostBack('hl$w$PC$oddsSearch$btnCerca','')"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="MainContent">
                    <div className="RiquadroHome">
                        <div className="Cnt">
                            <div>
                                <div className="RiquadroHomeUsr">
                                    <div className="Cnt">
                                        <div>
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table cellpadding="'0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="welcomeUser">
                                                                            <span id="hl_w_PC_PC_lblBentornato">Welcome</span>&nbsp;
                                                                            <b><span id="hl_w_PC_PC_lblUtente" className="userLabel">{user?.username}</span></b>
                                                                        </td>
                                                                        <td className="pulsantiLogged">
                                                                            <span>
                                                                                <a id="A1" className="divAccessLogs" href="/Account/AccessLogs.aspx">
                                                                                    <img src="img/login.png" border="0" alt="Logins report" />
                                                                                </a>
                                                                            </span>
                                                                            <span id="divDatiUtente">
                                                                                <a id="A2" href="../Account/User.aspx">
                                                                                    <img src="img/config.png" border="0" alt="User Details" />
                                                                                </a>
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <div id="divAgente" className="divTblAgente">
                                                                <div id="hl_w_PC_PC_divRiepilogoAgente">
                                                                    <div>
                                                                        <table className="dgDefaultLoggedStyle" cellspacing="0" border="0" style={{borderCollapse:'collapse'}}>
                                                                            <tbody>
                                                                                <tr className="dgHdrDefaultLoggedStyle">
                                                                                    <th scope="col">&nbsp;</th>
                                                                                    <th align="center" scope="col">Availability</th>
                                                                                    <th align="center" scope="col">Credit</th>
                                                                                    <th align="center" scope="col">Balance</th>
                                                                                </tr>
                                                                                <tr className="dgFirstItemStyle">
                                                                                    <td>Account</td>
                                                                                    <td align="right">3,145.00</td>
                                                                                    <td align="right">0.00</td>
                                                                                    <td align="right">3,145.00</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>                        
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>     
                                <table cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="CassaStats">
                                                    <div className="CassaStatsTitle">CASHIER</div>
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr className="CassaStatsItem">
                                                                <td>SportsBetting</td>
                                                                <td align="right">3,145.00</td>
                                                            </tr>
                                                            <tr className="CassaStatsTotals">
                                                                <td>Total Balance</td>
                                                                <td align="right">3,145.00</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <div className="LastTrans">
                                                    <div className="LastTransTitle">
                                                        <a title="See all transactions" href="../Account/TransactionList.aspx">Last 10 Transactions</a>
                                                    </div>
                                                    <div className="LastTransDivCnt">
                                                        <div>
                                                            <table cellspacing="0" cellpadding="0" border="0" style={{borderWidth:'0px',width:'100%',borderCollapse:'collapse'}}>
                                                                <tbody>
                                                                    <tr className="LastTransItem">
                                                                        <td>
                                                                            <a href="../Account/TransactionDetail.aspx?IDTransazione=16284026337&amp;IDPRD=3105527">16284026337</a>
                                                                        </td>
                                                                        <td className="TemplateFieldOneColumn">
                                                                            <span>23/07/2022 11:36:08</span>
                                                                        </td>
                                                                        <td>Sport Bet</td>
                                                                        <td align="right">-150.00</td>
                                                                        <td align="right">3,145.00</td>
                                                                    </tr>
                                                                    <tr className="LastTransAItem">
                                                                        <td><a href="../Account/TransactionDetail.aspx?IDTransazione=16276730899&amp;IDPRD=3105527">16276730899</a></td>
                                                                        <td className="TemplateFieldOneColumn">
                                                                            <span>22/07/2022 17:37:25</span>
                                                                        </td>
                                                                        <td>Sport Bet</td>
                                                                        <td align="right">-150.00</td>
                                                                        <td align="right">3,295.00</td>
                                                                    </tr>
                                                                    <tr className="LastTransItem">
                                                                        <td>
                                                                            <a href="../Account/TransactionDetail.aspx?IDTransazione=16272720203&amp;IDPRD=3105527">16272720203</a>
                                                                        </td>
                                                                        <td className="TemplateFieldOneColumn">
                                                                            <span>22/07/2022 10:12:42</span>
                                                                        </td>
                                                                        <td>League&gt;Sport</td>
                                                                        <td align="right">2,130.00</td>
                                                                        <td align="right">3,445.00</td>
                                                                    </tr>
                                                                    <tr className="LastTransAItem">
                                                                        <td><a href="../Account/TransactionDetail.aspx?IDTransazione=16272049532&amp;IDPRD=3105527">16272049532</a></td>
                                                                        <td className="TemplateFieldOneColumn">
                                                                            <span>22/07/2022 08:48:52</span>
                                                                        </td>
                                                                        <td>Sport&gt;League</td>
                                                                        <td align="right">-5,000.00</td>
                                                                        <td align="right">1,315.00</td>
                                                                    </tr>
                                                                    <tr className="LastTransItem">
                                                                        <td><a href="../Account/TransactionDetail.aspx?IDTransazione=16267039707&amp;IDPRD=3105527">16267039707</a></td>
                                                                        <td className="TemplateFieldOneColumn">
                                                                            <span>21/07/2022 17:53:11</span>
                                                                        </td>
                                                                        <td>Sport Bet</td>
                                                                        <td align="right">-150.00</td>
                                                                        <td align="right">6,315.00</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
