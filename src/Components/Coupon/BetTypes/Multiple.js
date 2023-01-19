import {updateWinnings} from "../../../Redux/actions";
import React from "react";
import { formatNumber } from "../../../Utils/helpers";

export const Multiple = ({couponData, dispatch, globalVar}) => {

    return (
        <div className="divCpnTipi">
            <div className="sel multipla">
                <div className="divCpnTipo Mul" title="Single">
                    <a href="javascript:;"></a>
                    <a className="tdTabLink" title="Multiple" href="javascript:;">Multiple</a>
                </div>
                <div className="divCpnTipoCnt">
                    <div className="CpnTipoRiep todds">
                        <div className="RiepSX">Odds</div>
                        <div className="RiepDX"><span>{couponData.totalOdds}</span></div>
                    </div>
                    <div className="CpnTipoRiep stake">
                        <div className="RiepSX">Amount</div>
                        <div className="RiepDX">
                            <img src="/img/Error_small.png" align="middle" style={{visibility: 'hidden'}} />
                            <span id="spanImporto">
                                <input 
                                    name="stake" 
                                    type="text" 
                                    maxlength="9" 
                                    className="TextBox" 
                                    style={{width: '45px'}} 
                                    onChange={(e) => dispatch(updateWinnings(parseFloat(e.target.value)))}
                                    value={couponData.totalStake}
                                />&nbsp;{globalVar.Currency}
                            </span>
                        </div>                                        
                    </div>
                    <div className="CpnTipoRiep Bonus NoBonus">
                        <div className="RiepSX">
                            Bonus
                            <span style={{display: 'none'}}>0%</span>
                        </div>
                        <div className="RiepDX"><span data-coupon-single-bonus="">{formatNumber(couponData.maxBonus)}</span>&nbsp;{globalVar.Currency}</div>
                    </div>
                    <div className="CpnTipoRiep grosswin High">
                        <div className="RiepSX">Pot. Winnings</div>
                        <div className="RiepDX"><span >{formatNumber(couponData.maxWin)} </span>{globalVar.Currency}</div>
                        <a title="Update" className="lnkRefresh" href="javascript:;" />
                    </div>
                </div>
            </div>
            <div>
                <div class="divCpnTipo Sis">
                    <a href="javascript:;" />
                    <a class="tdTabLink" title="Combined Multiple" href="javascript:;">Combined Multiple</a>
                </div>
            </div>
        </div>
    )
}
