import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fastAdd, placeBet, removeSelection } from "../Redux/actions";
import { CANCEL_BET, CONFIRM_BET, LOADING, SET_COUPON_DATA, SET_TODAYS_BET } from "../Redux/types";
import { loadCoupon, todaysBet } from "../Services/apis";
import { formatNumber } from "../Utils/helpers";
import {Multiple} from "./Coupon/BetTypes/Multiple";
import {Combined} from "./Coupon/BetTypes/Combined";
import {Split} from "./Coupon/BetTypes/Split";
import { toast } from "react-toastify";

export const RightSide = () => {
    const dispatch = useDispatch();
    const {SportsbookGlobalVariable, SportsbookBonusList} = useSelector((state) => state.sportsBook);
    const {coupon, todaysBets, confirm} = useSelector((state) => state.couponData);
    const {isAuthenticated} = useSelector((state) => state.auth);
    const [code, setCode] = useState('');
    const amounts = process.env.REACT_APP_FAST_ADD_AMOUNTS.split(',');

    const findCoupon = (e) => {
        e.preventDefault();
        if (code !== '') {
            dispatch({type: LOADING});
            loadCoupon(code, 'booking').then(res => {
                dispatch({type: LOADING});
                if (res.message === 'found' && res.coupon.selections.length) {
                    let couponData = res.coupon;
                    couponData.totalStake = couponData.stake;
                    // couponData.fixtures = groupSelections(couponData.selections);
                    dispatch({type: SET_COUPON_DATA, payload: couponData});
                } else {
                    alert('Unable to rebet the selected coupon because all the events are expired');
                }
            });
        }
    }

    const getTodayBet = () => {
        todaysBet().then(res => {
            if(res.length)
                dispatch({type: SET_TODAYS_BET, payload: res});
        });
    }

    useEffect(() => {
        if (isAuthenticated) {
            getTodayBet();
        }
    }, [isAuthenticated]);

    const confirmBet = async (e) => {
        if (coupon.hasLive) {
            // set button ele
            const ele = document.getElementById('placeBetBtn');
            ele.disabled = true;
            ele.innerHTML = 'Verifying...';

            try {
                // const oddsChanged = await checkOddsChange(coupon, dispatch, SportsbookGlobalVariable, SportsbookBonusList);

                // if (oddsChanged) { // if odds have changed, close modal
                //     ele.disabled = false;
                //     ele.innerHTML = 'Place Bet';
                //     close();
                //     toast.error('Some odds have changed. Please confirm your bets to proceed');
                // } else {
                    dispatch(placeBet(ele, 'bet', null));
                // }
            } catch (e) {
                ele.disabled = false;
                ele.innerHTML = 'Place Bet';
                toast.error('We were unable to process your bet. Please try again');
            }
        }else {
            // console.log(e)
            dispatch(placeBet(e,'bet', null));
        }
    }

    return (
        <div id="divCoupon" className="divCoupon" style={{top: '149px', paddingBottom: '0px'}}> 
            
            <div>
        
                <a href="#" style={{display:'none'}}></a>

                <div className="Top">
                    <h3>Betslip</h3>
                    {coupon.selections.length > 0 && <span>No. Selections <label>{coupon.selections.length}</label></span>}
                </div>
                <div className="divNumPrenotato">
                    <div className="info">
                        <font color="black">
                            Insert Booking Number 
                            <a href="https://web.bet9ja.com/Pages/Tutorial_book/Guest">
                                <img src="/img/icon_info.png" alt="info" height="14" width="10" />
                            </a>
                        </font>
                    </div>
                    <div className="value">
                        <input 
                            name="adsf" 
                            type="text" 
                            maxlength="20" 
                            className="TextBox" 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            onKeyUp={(e) => {if(e.key === 'Enter') findCoupon()}}
                        />
                        <a className="lnk Load" href="javascript:;" onClick={findCoupon}>LOAD</a>
                    </div>         
                </div>
                

                <div className="Cnt" id="divContentCoupon">
                    <div id="divAttesa" style={{display:'none'}} className="cpnDivAttesa">
                        <div className="divAnimazioneLiveHTML"><span>Bet being placed, please wait.</span></div>
                    </div>
                    <div id="divInserimentoScommesse" className={coupon.bet_type ? coupon.bet_type.toLowerCase() : 'single'}>
                    {coupon.selections.length > 0 ?
                        <div className={ !confirm ? 'CouponMainIns' : 'CouponMainConf'}>
                            <div className="CItems">
                                {coupon.selections.map(selection => 
                                    <div className="CItem te1" key={selection.element_id}>
                                        <div className="CInfo" title={selection.tournament}></div>
                                        <div className="CCodPub"> {selection.event_id}</div>
                                        <div className="CEvento">{selection.tournament}</div>
                                        <div className="CSubEv">
                                            <span title={selection.event}>{selection.event_name}</span>
                                        </div>
                                        <div className="COdds False  T_3">
                                            {!confirm && <a title="Remove from betslip" onClick={() => dispatch(removeSelection(selection))} className="CDelete" href="javascript:;" />}
                                            <div className="CSegno" title={selection.oddname}>
                                                <span className="ClblSegno">&nbsp;</span>{selection.oddname}&nbsp;
                                                <span className="CqSegno">{selection.market_name}</span></div>
                                            <div className="valQuota_1">{selection.odds}</div>
                                            {/* <div className="DIQ" id="DIQ_20599827006">1|3.05|S|0</div> */}
                                        </div>
                                    </div>
                                )}
                            </div>
                           {!confirm && 
                            <div>
                                {
                                    {
                                        'Combo': <Combined couponData={coupon} dispatch={dispatch} globalVar={SportsbookGlobalVariable} bonusList={SportsbookBonusList} />,
                                        'Split' : <Split couponData={coupon} dispatch={dispatch} globalVar={SportsbookGlobalVariable} bonusList={SportsbookBonusList} />
                                    }[coupon.bet_type] || <Multiple couponData={coupon} dispatch={dispatch} globalVar={SportsbookGlobalVariable} />
                                }
                            </div>
                            }
                            {confirm && 
                                <div className="divCpnTipi">
                                    <div class="CpnTipoRiep HighImp ssNet">
                                        <div class="RiepSX">Amount</div>
                                        <div class="RiepDX"><span>{formatNumber(coupon.totalStake)}&nbsp;{SportsbookGlobalVariable.Currency}</span></div>
                                    </div>
                                    <div class="CpnTipoRiep netwin High">
                                        <div class="RiepSX"><span>Potential Winnings</span></div>
                                        <div class="RiepDX"><span>{formatNumber(coupon.maxWin)} {SportsbookGlobalVariable.Currency}</span></div>
                                    </div>
                                </div>
                            }
                            {!confirm && <div className="fastAmounts">
                                <a onClick={() => dispatch(fastAdd(0))}>RESET</a>
                                {amounts && amounts.map(amount => <a key={amount} className="additive" onClick={() => dispatch(fastAdd(parseInt(amount)))}> {amount}</a>)}
                            </div>}
                            <div className="CpnPuls">
                                {!confirm ?
                                 <>
                                    <a className="btnCoupon sx" onClick={() => dispatch({type: CANCEL_BET})} href="javascript:;">Cancel</a>
                                    <a className="btnCoupon dx" href="javascript:;" onClick={() => dispatch({type: CONFIRM_BET, payload: true})}>BET</a>
                                </>
                                :
                                    <>
                                        <a class="btnCoupon sx" href="javascript:;" onClick={() => dispatch({type: CONFIRM_BET, payload: false})}>Back</a>
                                        <span id="spanConferma">
                                            <a class="btnCoupon dx" href="javascript:;" onClick={(e) => confirmBet(e)}>OK</a>
                                        </span>
                                    </>
                                }
                            </div>
                        </div>
                        :
                            <div className="couponempty">
                                Click on the odds to add to your betslip
                                <div className="lnkMainSettings">Betslips settings</div>
                            </div>
                        }
                    </div>
                </div>
                <div className="Btm"></div>
            </div>

                    
        <div id="btnSimulateCoupon" className="buttonSimulateDiv" style={{display: 'none'}}>
            <button type="button" className="buttonSimulate" id="btnSimulate" onclick="toggleCouponSimulateVisualization();">BET ON SIMULATE</button>
        </div>
                    
        {/* <span>
            <div className="divLitePrintCheck">
                <input type="checkbox" name="s$w$PC$litePrint$chkLitePrint" onclick="if (!confirm('Do you wanna save your setting?')) return false;setTimeout('__doPostBack(\'s$w$PC$litePrint$chkLitePrint\',\'\')', 0)" />
                <label for="s_w_PC_litePrint_chkLitePrint">Lite Print</label>
                <input type="checkbox" name="s$w$PC$litePrint$chkBarcodePrint" onclick="if (!confirm('Do you wanna save your setting?')) return false;setTimeout('__doPostBack(\'s$w$PC$litePrint$chkBarcodePrint\',\'\')', 0)" />
                <label for="s_w_PC_litePrint_chkBarcodePrint">Barcode Print</label>
            </div>
        </span> */}


        <div className="SXTitle"><a id="s_w_PC_ctl06_A1">Coupon Check</a></div>
        <div className="divCouponCheck">

        <div id="s_w_PC_ctl06_upCheckCoupon">
	
            <div className="CheckCouponMain">
                <div className="CheckCpnTxt">
                    Insert the coupon code you wish to check
                </div>

                <input name="s$w$PC$ctl06$txtCodiceCoupon" type="text" />
                <a className="btnCheckCoupon" title="Check" href="#"></a>
            </div>
        </div>
    </div>
</div>
    )
}
