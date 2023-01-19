import React, {useEffect} from "react";

/**
 * packages
 */

export const CouponBetList = () => {
    return (
        <>
                  <div className="homeShop logged">
        <h1 style={{ color: "white" }}>Coupon BetList Page</h1>
      </div>
      <div className="RiquadroSrc">
        <div className="Cnt">
          <div>
            <div id="ac_w_PC_PC_BetList_panForm">
              <table id="tblSearch" className="SearchContainerStyle">
                <tbody>
                  <tr className="SearchSectionStyle">
                    <td className="SearchDescStyle">
                      Date
                      <select
                        name="ac$w$PC$PC$BetList$ddlFiltoData"
                        id="ac_w_PC_PC_BetList_ddlFiltoData"
                        className="dropdownFiltoData"
                        style={{ width: "100px" }}
                      >
                        <option selected="selected" value="1">
                          Bet
                        </option>
                        <option value="2">Outcome</option>
                      </select>
                    </td>
                    <td className="SearchControlsStyle">
                      <table width="100%">
                        <tbody>
                          <tr>
                            <td width="20%" className="SearchControlDesc">
                              From
                            </td>
                            <td width="30%">
                              <table cellPadding="0" cellSpacing="0">
                                <tbody>
                                  <tr>
                                    <td>
                                      <input type="date" name="" id="" />
                                    </td>
                                    <td width="25px" align="center">
                                      <img
                                        id="ac_w_PC_PC_BetList_cpopDal_CalendarBase_imgCalendar"
                                        src="/img/Calendar.gif"
                                        alt="Display Calendar"
                                        style={{
                                          borderWidth: "0px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td width="20%" className="SearchControlDesc">
                              To
                            </td>
                            <td width="30%">
                              <table cellPadding="0" cellSpacing="0">
                                <tbody>
                                  <tr>
                                    <td>
                                      <input type="date" name="" id="" />
                                    </td>
                                    <td width="25px" align="center">
                                      <img
                                        id="ac_w_PC_PC_BetList_cpopAl_CalendarBase_imgCalendar"
                                        src="/img/Calendar.gif"
                                        alt="Display Calendar"
                                        style={{
                                          borderWidth: "0px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr className="SearchSectionStyle">
                    <td className="SearchDescStyle">Betslip</td>
                    <td className="SearchControlsStyle">
                      <table className="SearchControlsContainerStyle">
                        <tbody>
                          <tr>
                            <td width="10%" className="SearchControlDesc">
                              ID
                            </td>
                            <td width="30%">
                              <input
                                name="ac$w$PC$PC$BetList$txtCodiceCoupon"
                                type="text"
                                id="ac_w_PC_PC_BetList_txtCodiceCoupon"
                                className="textbox"
                                style={{ width: "75px" }}
                              />
                            </td>
                            <td width="10%" className="SearchControlDesc">
                              Outcome
                            </td>
                            <td width="30%">
                              <select
                                name="ac$w$PC$PC$BetList$ddlEsito"
                                id="ac_w_PC_PC_BetList_ddlEsito"
                                className="dropdown"
                                style={{ width: "100px" }}
                              >
                                <option value="all"></option>
                                <option value="0">Running</option>
                                <option value="1">Won</option>
                                <option value="2">Lost</option>
                                <option value="4">Cancelled</option>
                                <option value="3">Void</option>
                              </select>
                            </td>
                            <td width="20%"></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  <tr className="SearchSectionStyle">
                    <td className="SearchDescStyle">Payment State</td>
                    <td className="SearchControlsStyle">
                      <tr>
                        <td>
                          <input
                            id="ac_w_PC_PC_rblTipoImporto_0"
                            type="radio"
                            name="ac$w$PC$PC$rblTipoImporto"
                            value="-1"
                          />
                          <label htmlFor="ac_w_PC_PC_rblTipoImporto_0">
                            All
                          </label>
                        </td>
                        <td>
                          <input
                            id="ac_w_PC_PC_rblTipoImporto_1"
                            type="radio"
                            name="ac$w$PC$PC$rblTipoImporto"
                            value="1"
                          />
                          <label htmlFor="ac_w_PC_PC_rblTipoImporto_1">
                            Credits
                          </label>
                        </td>
                        <td>
                          <input
                            id="ac_w_PC_PC_rblTipoImporto_2"
                            type="radio"
                            name="ac$w$PC$PC$rblTipoImporto"
                            value="2"
                          />
                          <label htmlFor="ac_w_PC_PC_rblTipoImporto_2">
                            Debits
                          </label>
                        </td>
                      </tr>
                    </td>
                  </tr>

                  <tr>
                    <td className="SearchDescStyle">Page Size</td>
                    <td className="SearchControlsStyle">
                      <table className="SearchControlsContainerStyle">
                        <tbody>
                          <tr>
                            <td width="20%" className="SearchControlDesc">
                              &nbsp;
                            </td>
                            <td width="80%" colSpan="3">
                              <select
                                name="ac$w$PC$PC$BetList$ddlPageSize"
                                id="ac_w_PC_PC_BetList_ddlPageSize"
                                className="dropdown"
                                style={{ width: "75px" }}
                              >
                                <option selected="selected" value="15">
                                  15
                                </option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr class="SearchSectionStyle" id="trCreditTypes">
                    <td class="SearchDescStyle">Credit Type</td>
                    <td class="SearchControlsStyle">
                      <table class="SearchControlsContainerStyle">
                        <tbody>
                          <tr>
                            <td class="SearchControlDesc">
                              <label for="ac_w_PC_PC_BetList_chkRealAmount">
                                Real Amount
                              </label>
                              <input
                                id="ac_w_PC_PC_BetList_chkRealAmount"
                                type="checkbox"
                                name="ac$w$PC$PC$BetList$chkRealAmount"
                                checked="checked"
                              />
                            </td>
                            <td>
                              <label for="ac_w_PC_PC_BetList_chkBonus">
                                Bonus
                              </label>
                              <input
                                id="ac_w_PC_PC_BetList_chkBonus"
                                type="checkbox"
                                name="ac$w$PC$PC$BetList$chkBonus"
                                checked="checked"
                              />
                            </td>
                            <td>
                              <label for="ac_w_PC_PC_BetList_chkFrebeets">
                                Freebets
                              </label>
                              <input
                                id="ac_w_PC_PC_BetList_chkFrebeets"
                                type="checkbox"
                                name="ac$w$PC$PC$BetList$chkFrebeets"
                                checked="checked"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="SearchButtonsStyle">
                <tbody>
                  <tr>
                    <td></td>
                    <td className="tdSrcSX">
                      <input
                        type="submit"
                        name="ac$w$PC$PC$BetList$btnCancella"
                        value="Cancel"
                        id="ac_w_PC_PC_BetList_btnCancella"
                        className="button"
                      />
                    </td>
                    <td className="tdSrcDX">
                      <input
                        type="submit"
                        name="ac$w$PC$PC$BetList$btnAvanti"
                        value="Continue"
                        id="ac_w_PC_PC_BetList_btnAvanti"
                        className="button"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table id="tblSearch2" className="SearchContainerStyle Secondary">
              <tbody>
                <tr className="SearchSectionStyle">
                  <td className="SearchDescStyle">
                    <div style={{ position: "relative" }}>
                      No. Bets
                      <div className="Dati">
                        <span id="ac_w_PC_PC_BetList_lblNumSco"></span>
                      </div>
                    </div>
                  </td>
                  <td className="SearchControlsStyle">000</td>
                </tr>
              </tbody>
            </table>
            <table className="SearchContainerStyle Secondary">
              <tbody>
                <tr className="SearchSectionStyle">
                  <td className="SearchDescStyle">Key</td>
                  <td className="SearchControlsStyle">
                    <table className="SearchControlsContainerStyle">
                      <tbody>
                        <tr>
                          <td
                            className="SearchControlDesc"
                            style={{ textAlign: "left" }}
                          >
                            Outcome:
                          </td>
                          <td>
                            <img
                              id="ac_w_PC_PC_BetList_imgLegEsito1"
                              src="/img/ScommesseEsito_1.gif"
                              style={{ borderWidth: "0px" }}
                            />{" "}
                          </td>
                          <td>Winning</td>
                          <td>
                            <img
                              id="ac_w_PC_PC_BetList_imgLegEsito2"
                              src="/img/ScommesseEsito_2.gif"
                              style={{ borderWidth: "0px" }}
                            />
                          </td>
                          <td>Lost</td>
                          <td>
                            <img
                              id="ac_w_PC_PC_BetList_imgLegEsito3"
                              src="/img/ScommesseEsito_3.gif"
                              style={{ borderWidth: "0px" }}
                            />{" "}
                          </td>
                          <td>Running</td>
                          <td>
                            <img
                              id="ac_w_PC_PC_BetList_imgLegEsito4"
                              src="/img/ScommesseEsito_4.gif"
                              style={{ borderWidth: "0px" }}
                            />{" "}
                          </td>
                          <td>Cancelled</td>
                          <td>
                            <img
                              id="ac_w_PC_PC_BetList_imgLegEsito5"
                              src="/img/ScommesseEsito_5.gif"
                              style={{ borderWidth: "0px" }}
                            />{" "}
                          </td>
                          <td>Being processed</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{ borderWidth:'0px', borderStyle: 'none', width:'100%', borderCollapse: 'collapse' }}>
                <tr style={{ borderWidth:'0px', borderStyle: 'none', width:'100%', borderCollapse: 'collapse', backgroundColor:'#975e01' }} class="dgHdrStyle">
                <th align="center" scope="col">
                    Betslip
                  </th>
                  <th scope="col">User</th>
                  <th scope="col">Bet Type</th>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">Date</th>
                  <th scope="col">Result Date</th>
                  <th class="dgHdrImporti" scope="col">
                    Amount
                  </th>
                  <th scope="col">Outcome</th>
                  <th class="dgHdrImporti" scope="col">
                    Winnings
                  </th>
                  <th scope="col">Settled Bet</th>
                </tr>
            </table>
          </div>
        </div>
      </div>
    </>

    )
}
