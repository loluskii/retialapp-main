import React from "react";
import {useSelector} from "react-redux";
import {formatBetslipId, formatDate, formatNumber} from "../../Utils/helpers";
import BetListOutcome from "../BetListOutcome";
import {reloadCoupon} from "../../Redux/actions";

export default function ViewCoupon({betslip, dispatch}) {
    const {loading} = useSelector(state => state.login)
    const {SportsbookGlobalVariable} = useSelector((state) => state.sportsBook);
    
    return (
        <>
            
            <table cellSpacing="0" cellPadding="0" width="100%" align="center" border="0">
                <tbody>
                <tr>
                    <td className="SectionTitle" colSpan="2">
                        Betslip
                    </td>
                </tr>
                <tr>
                    <td className="cellaSx">Betslip ID</td>
                    <td className="cellaDx" style={{textAlign: 'right'}}>{betslip?.tipster_id ? formatBetslipId(betslip?.betslip_id) : betslip?.betslip_id}</td>
                </tr>

                <tr>
                    <td className="cellaSx">Date</td>
                    <td className="cellaDx" style={{textAlign: 'right'}}>{formatDate(betslip?.created_at, 'DD/MM/YYYY HH:mm:ss')}</td>
                </tr>
                <tr>
                    <td className="cellaSx">Bet Type</td>
                    <td className="cellaDx" style={{textAlign: 'right'}}>{betslip?.event_type === 'jackpot' ? 'Jackpot' : betslip?.bet_type_desc}</td>
                </tr>
                </tbody>
            </table>
            <div className="spacer9"></div>

            <table id="popUp_PC_tbl_DettagliScommessa" cellPadding="0" cellSpacing="0" width="100%" align="center"
                    className="safe">
                <tbody>
                <tr>
                    <td className="SectionTitle" colSpan="2">
                        Detail
                    </td>
                </tr>
                <tr>
                    <td className="cellaSx">
                        <span className="detScoIG">Stakes</span>
                    </td>
                    <td className="cellaDx" style={{textAlign: 'right'}}>
                        <span className="detScoIG">{SportsbookGlobalVariable.Currency}&nbsp;{formatNumber(betslip?.stake)}</span>
                    </td>
                </tr>
                {betslip?.bet_type !== 'Jackpot' &&
                <tr>
                    <td className="cellaSx">
                        Bonus
                    </td>
                    <td className="cellaDx" style={{textAlign: 'right'}}>
                        {SportsbookGlobalVariable.Currency}&nbsp;
                        {
                            {
                                'Split': `${formatNumber(betslip?.min_bonus)} / ${formatNumber(betslip?.bonus)}`,
                                'Combo': `${formatNumber(betslip?.min_bonus)} / ${formatNumber(betslip?.bonus)}`
                            }[betslip?.bet_type] || formatNumber(betslip?.bonus)
                        }
                    </td>
                </tr>}
                <tr>
                    <td className="cellaSx">
                        <span className="detScoVP">Winnings</span>
                    </td>
                    <td className="cellaDx" style={{textAlign: 'right'}}>
                        <span className="detScoVP">
                            {SportsbookGlobalVariable.Currency}&nbsp;
                            {betslip?.bet_type === 'Jackpot' && formatNumber(betslip?.winnings) }

                            {
                                betslip?.status === 0 ? (
                                    {
                                        'Split': `${formatNumber(betslip?.min_winnings)} / ${formatNumber(betslip?.pot_winnings)}`,
                                        'Combo': `${formatNumber(betslip?.min_winnings)} / ${formatNumber(betslip?.pot_winnings)}`
                                    }[betslip?.bet_type] || formatNumber(betslip?.pot_winnings)
                                ) : formatNumber(betslip?.winnings)
                            }
                        </span>
                    </td>
                </tr>
                {betslip?.bet_type !== 'Jackpot' &&
                <tr id="ac_w_PC_PC_trQuota">
                    <td className="cellaSx"><span className="detScoOdd">Odd</span></td>
                    <td className="cellaDx" style={{textAlign: 'right'}}>
                        <span className="detScoOdd">
                            {
                                {
                                    'Split': `${formatNumber(betslip?.min_oods)} / ${formatNumber(betslip?.odds)}`,
                                    'Combo': `${formatNumber(betslip?.min_odds)} / ${formatNumber(betslip?.odds)}`
                                }[betslip?.bet_type] || formatNumber(betslip?.odds)
                            }
                        </span>
                    </td>
                </tr>
                }

                {betslip?.cashout > 0 && betslip.bet_type !== 'Jackpot' && betslip?.status === 0 &&
                <tr>
                    <td className="cellaSx">
                        <span className="detCashOut">Cashout</span>
                    </td>
                    <td className="cellaDx txt-darkgreen " style={{textAlign: 'right', fontWeight: 'bold'}}>
                        <span>{formatNumber(betslip?.cashout)}</span>
                    </td>
                </tr>}
                </tbody>
            </table>

            <div className="spacer9" />

            <table cellSpacing="0" cellPadding="0" width="100%" align="center" border="0">
                <tbody>
                <tr>
                    <td className="SectionTitle" colSpan="2">
                        Event List
                    </td>
                </tr>
                </tbody>
            </table>

            <div>
                <table className="dgStyle" cellSpacing="0" align="Center" border="0"
                        style={{
                            borderWidth: '0px',
                            borderStyle: 'None',
                            width: '100%',
                            borderCollapse: 'collapse'
                        }}>
                    <tbody>
                    <tr className="dgSubHdrStyle">
                        <th scope="col">Event</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">Quota Class</th>
                        <th scope="col">Type</th>
                        <th scope="col">Odds</th>
                        <th scope="col">HT Score</th>
                        <th scope="col">Result</th>
                        <th scope="col">Outcome</th>
                    </tr>
                    {betslip?.selections.map((selection, i) =>
                        <tr className="dgItemStyle" key={selection.provider_id}>
                            <td>
                                {selection.event}
                            </td>
                            <td align="center">{formatDate(selection.start_date, 'DD/MM/YYYY HH:mm')}</td>
                            <td align="center">
                                {betslip?.tipster_id ? '***' : selection?.market_name}
                            </td>
                            <td align="center">{betslip?.tipster_id ? '**' : selection?.odd_name}</td>
                            <td align="center">{selection.odds}</td>
                            <td className="BetDetailRisultato" align="center" style={{whiteSpace:'nowrap'}}>
                                <span title="Final Result">{selection?.ht_score}</span>
                            </td>
                            <td className="BetDetailRisultato" align="center" style={{whiteSpace:'nowrap'}}>
                                <span title="Final Result">{selection?.score}</span>
                            </td>
                            <td align="center">
                                <BetListOutcome outcome={selection.status} />
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="divCheckCpnDisclaimer">
                Bet correctly registered on {process.env.REACT_APP_NAME} Database
            </div>

            <div className="divCheckCpnRebet">
                {betslip?.event_type !== 'jackpot' && !betslip?.tipster_id &&
                    <input 
                        type="button"
                        name="popUp$PC$btnRebet"
                        value={loading ? 'Loading Games...' : 'Rebet'} 
                        onClick={() => dispatch(reloadCoupon(betslip?.betslip_id, 'rebet'))}
                        className="button"
                    />
                }
            </div>
                                
        </>
    );
}
