import React from "react";
import {calculateBonus} from "../../../Utils/couponHelpers";
import {SET_COUPON_DATA} from "../../../Redux/types";
import { formatNumber } from "../../../Utils/helpers";

export const Split = ({couponData, dispatch, globalVar, bonusList}) => {
    const amounts = process.env.REACT_APP_FAST_ADD_AMOUNTS.split(',');

    const updateSystemWinnings = (stake, action) => {
        let coupondata = {...couponData};
        // coupondata.totalStake = stake;

        if(stake !== '') {
            coupondata.totalStake = coupondata.totalStake + stake;

            // coupondata.exciseDuty = coupondata.totalStake * 0 / 100;
            // coupondata.stake = coupondata.totalStake - coupondata.exciseDuty;
            coupondata.stake = coupondata.totalStake;
            coupondata.minStake = parseFloat(stake) / coupondata.noOfCombos;

            //calculate winnings
            let minWinnings = parseFloat(coupondata.minOdds) * parseFloat(coupondata.minStake);
            let maxWinnings = parseFloat(coupondata.maxOdds) * parseFloat(coupondata.minStake);
            //calculate bonus
            coupondata.minBonus = calculateBonus(minWinnings, coupondata, globalVar, bonusList);
            coupondata.maxBonus = calculateBonus(maxWinnings, coupondata, globalVar, bonusList);
            coupondata.minGrossWin = parseFloat(coupondata.minBonus) + minWinnings;
            coupondata.minWTH = (coupondata.minGrossWin - coupondata.stake) * process.env.REACT_APP_WTH_PERC / 100;
            coupondata.minWin = coupondata.minGrossWin - coupondata.minWTH;
            coupondata.grossWin = parseFloat(coupondata.maxBonus) + maxWinnings;
            const wthTax = (couponData.grossWin - couponData.stake) * process.env.REACT_APP_WTH_PERC / 100;
            coupondata.wthTax = wthTax < 1 ? 0 : wthTax;
            coupondata.maxWin = coupondata.grossWin - coupondata.wthTax;
        }
        return dispatch({type: SET_COUPON_DATA, payload: coupondata});

    }

    return (
        <div class="sel integrale">
            <div class="divCpnTipo DI">
                Split Column Bet
            </div>
            <div class="divCpnTipoCnt">
                <div class="CpnTipoRiep">
                    <div class="RiepSX">Min. Odds</div>
                    <div class="RiepDX"><span>{couponData.minOdds?.toFixed(2)}</span></div>
                </div>
                <div class="CpnTipoRiep">
                    <div class="RiepSX">Max. Odds</div>
                    <div class="RiepDX"><span>{couponData.maxOdds?.toFixed(2)}</span></div>
                </div>

            <div class="CpnTipoRiep amountdi">
                <div class="RiepSX">Amount</div>
                <div class="RiepDX">
                    <span data-coupon-split-comb="">2</span>&nbsp;x&nbsp;
                    <span><input name="split_stake" type="text" value="200" maxlength="5" class="TextBox" style={{ width: '35px'}} />&nbsp;{globalVar.Currency}</span>
                    <span id="spanCautionDI">
                        <img src="./img/Error_small.png" align="middle" style={{display: 'none'}} />
                    </span>
                </div>
            </div>
            <div class="CpnTipoRiep stake">
                <div class="RiepSX">Total Stake</div>
                <div class="RiepDX"><span class="couponEqual">=&nbsp;</span>
                <input 
                    name="totalStake" 
                    type="text" 
                    value={couponData.stake}
                    maxLength="5"
                    onChange={(e) => updateSystemWinnings(e.target.value,'max')}
                    class="TextBox" 
                    style={{ width: '35px'}} 
                /><span>&nbsp;{globalVar.Currency}</span></div>
            </div>
            
            <div class="CpnTipoRiep">

                <div class="RiepSX">Min. Bonus</div>
                <div class="RiepDX">
                    <span id="spanBonusMinDI">
                        <span>{ formatNumber(couponData.minBonus)}</span></span>&nbsp;{globalVar.Currency}
                </div>
            </div>
            <div class="CpnTipoRiep">

                <div class="RiepSX">Max. Bonus</div>
                <div class="RiepDX">
                    <span id="spanBonusMaxDI">
                    <span>{formatNumber(couponData.maxBonus)}</span></span>&nbsp;{globalVar.Currency}</div>
            </div>
            <div class="CpnTipoRiep High">
                <div class="RiepSX">Min. Pot. Winnings </div>
                <div class="RiepDX">
                    <span id="spanVincitaPotMin">
                    <span>{formatNumber(couponData.minGrossWin)}</span></span>&nbsp;{globalVar.Currency}
                </div>
            </div>
            
            <div class="CpnTipoRiep grosswin High">

                <div class="RiepSX">Max. Pot. Winnings</div>
                <div class="RiepDX">
                    <span>{formatNumber(couponData.grossWin)}</span>&nbsp;{globalVar.Currency}</div>
                <a title="Update" class="lnkRefresh" href="javascript:;" />
            </div>
            
        </div>
    </div>
    )
}
