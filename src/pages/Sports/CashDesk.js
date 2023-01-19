import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { CANCEL_BET, SET_COUPON_DATA } from "../../Redux/types";
import { findFixtureWithOutcomes } from "../../Services/apis";
import {
  addToCoupon,
  placeBet,
  removeSelection,
  updateWinnings,
} from "../../Redux/actions";
import { calculateBonus, createID } from "../../Utils/couponHelpers";
import { formatNumber } from "../../Utils/helpers";
import ViewFixtureModal from "../../Components/Modal/ViewFixtureModal";
import useSWR from "swr";

export const Cashdesk = () => {
  const { coupon } = useSelector((state) => state.couponData);
  const { SportsbookGlobalVariable, SportsbookBonusList } = useSelector(
    (state) => state.sportsBook
  );
  const { betPlaced } = useSelector((state) => state.couponData);

  const history = useHistory();

  const [selections, setSelections] = useState([
    {
      event_id: "",
      event_date: "",
      event_name: "",
      tournament_name: "",
      market_code: "",
      odds: "",
      outcomes: [],
    },
  ]);
  const [showFixture, setShowFixture] = useState(false);
  const [selected, setSelected] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById(`event_id_0`).focus();
    return () => dispatch({ type: CANCEL_BET });
  }, []);

  useEffect(() => {
    if (betPlaced) {
      setSelections([
        {
          event_id: "",
          event_date: "",
          event_name: "",
          tournament_name: "",
          market_code: "",
          odds: "",
          outcomes: [],
        },
      ]);
      document.getElementById(`event_id_0`).value = "";
      document.getElementById(`event_code_0`).value = "";
      document.getElementById(`event_id_0`).focus();
    }
  }, [betPlaced]);

  const {data} = useSWR('/sports/live/outcomes');

  const liveOutcomes = data?.data;

  const findEvent = (e, i) => {
    const value = e.target.value;
    const newArr = [...selections];
    newArr[i].event_id = value;
    if (value.length === 4 || e.key === "Enter") {
      // document.getElementById('FastCodeField').focus();
      findFixtureWithOutcomes(value)
        .then((res) => {
          if (res.event_name) {
            const input = document.getElementById(`event_code_${i}`);
            newArr[i].event_name = res.event_name;
            newArr[i].event_date = res.event_time;
            newArr[i].tournament_name = res.sport_tournament_name;
            // newArr[i].market_code = res.outcomes[0].code;
            // newArr[i].odds = res.outcomes[0].odds;
            newArr[i].fixture = res;
            setSelections(newArr);
            // const end = res.outcomes[0].code.length;
            // input.setSelectionRange(end, end);
            input.focus();
          } else {
            toast.error(res.message);
            e.target.value = "";
          }
        })
        .catch((err) => {
          toast.error("Something went wrong. Please try again");
        });
    }
  };

  const changeCode = (e, i) => {
    const value = e.target.value;
    const newArr = [...selections];
    newArr[i].market_code = value;
    const splitCode = value.split("/");
    const fixture = newArr[i].fixture;
    const markets = fixture.fixture_type === 'pre' ? newArr[i].fixture.markets : newArr[i].fixture.live_data.markets; 

    if (e.key === "Enter") {
      // if (Array.isArray(splitCode) && splitCode.length > 1) {
      //   for (const code of splitCode) {
      //     const outcome = getOutcome(markets, newArr[i], code);

      //     dispatch(
      //       addToCoupon(
      //         selections[i].fixture,
      //         outcome.market_id,
      //         outcome.market_name,
      //         outcome.odds,
      //         outcome.odd_id,
      //         outcome.odd_name,
      //         createID(
      //           selections[i].fixture.provider_id,
      //           outcome.market_id,
      //           outcome.odd_name,
      //           outcome.odd_id
      //         ),
      //         selections[i].fixture.fixture_type
      //       )
      //     );
      //   }
      // } else {
      //   const outcome = getOutcome(markets, newArr[i], value);

      //   dispatch(
      //     addToCoupon(
      //       selections[i].fixture,
      //       outcome.market_id,
      //       outcome.market_name,
      //       outcome.odds,
      //       outcome.odd_id,
      //       outcome.odd_name,
      //       createID(
      //         selections[i].fixture.provider_id,
      //         outcome.market_id,
      //         outcome.odd_name,
      //         outcome.odd_id
      //       ),
      //       selections[i].fixture.fixture_type
      //     )
      //   );
      // }
      addCDLine();
      setTimeout(() => {
        document.getElementById(`event_id_${i + 1}`).focus();
      }, 100);

      return;
    }
    if (splitCode.length > 1) {
      let odds = "";
      for (let s = 0; s <= splitCode.length; s++) {
        const outcome = getOutcome(markets, splitCode[s], fixture.fixture_type);
        if (outcome) {
          odds += outcome.odds + (s < splitCode.length - 1 ? "/" : "");
          dispatch(
            addToCoupon(
              fixture,
              outcome.market_id,
              outcome.market_name,
              outcome.odds,
              outcome.odd_id,
              outcome.odd_name,
              createID(
                fixture.provider_id,
                outcome.market_id,
                outcome.odd_name,
                outcome.odd_id
              ),
              fixture.fixture_type
            )
          );
        }
      }
      newArr[i].odds = odds;
    } else {
      const outcome = getOutcome(markets, value, fixture.fixture_type);
      
      if (outcome) {
        newArr[i].odds = outcome.odds;
        dispatch(
          addToCoupon(
            fixture,
            outcome.market_id,
            outcome.market_name,
            outcome.odds,
            outcome.odd_id,
            outcome.odd_name,
            createID(
              fixture.provider_id,
              outcome.market_id,
              outcome.odd_name,
              outcome.odd_id
            ),
            fixture.fixture_type
          )
        );
      } else {
        newArr[i].odds = "";
        let index = coupon.selections.findIndex(
          (item) => item.event_id === parseInt(selections[i].event_id)
        );
        dispatch(removeSelection(coupon.selections[index]));
      }
    }
    setSelections(newArr);
  };

  const addCDLine = () => {
    setSelections([
      ...selections,
      {
        event_id: "",
        event_date: "",
        event_name: "",
        tournament_name: "",
        market_code: "",
        odds: "",
        outcomes: [],
      },
    ]);
  };

  const removeCDLine = (i) => {
    const newArr = [...selections];
    if (newArr.length > 1) {
      if (newArr[i].event_id) {
        let index = coupon.selections.findIndex(
          (item) => item.event_id === selections[i].event_id
        );
        dispatch(removeSelection(coupon.selections[index]));
      }
      newArr.splice(i, 1);
      setSelections(newArr);
    }
  };

  const updateSystemWinnings = (stake, action) => {
    let coupondata = { ...coupon };
    coupondata.totalStake = stake;

    if (stake !== "") {
      coupondata.exciseDuty = (coupondata.totalStake * 0) / 100;
      coupondata.stake = coupondata.totalStake - coupondata.exciseDuty;
      coupondata.minStake = parseFloat(stake) / coupondata.noOfCombos;

      //calculate winnings
      let minWinnings =
        parseFloat(coupondata.minOdds) * parseFloat(coupondata.minStake);
      let maxWinnings =
        parseFloat(coupondata.maxOdds) * parseFloat(coupondata.minStake);
      //calculate bonus
      coupondata.minBonus = calculateBonus(
        minWinnings,
        coupondata,
        SportsbookGlobalVariable,
        SportsbookBonusList
      );
      coupondata.maxBonus = calculateBonus(
        maxWinnings,
        coupondata,
        SportsbookGlobalVariable,
        SportsbookBonusList
      );
      coupondata.minGrossWin = parseFloat(coupondata.minBonus) + minWinnings;
      coupondata.minWTH =
        ((coupondata.minGrossWin - coupondata.stake) *
          process.env.REACT_APP_WTH_PERC) /
        100;
      coupondata.minWin = coupondata.minGrossWin - coupondata.minWTH;
      coupondata.grossWin = parseFloat(coupondata.maxBonus) + maxWinnings;
      const wthTax =
        ((coupondata.grossWin - coupondata.stake) *
          process.env.REACT_APP_WTH_PERC) /
        100;
      coupondata.wthTax = wthTax < 1 ? 0 : wthTax;
      coupondata.maxWin = coupondata.grossWin - coupondata.wthTax;
    }
    return dispatch({ type: SET_COUPON_DATA, payload: coupondata });
  };

  const getOutcome = (markets, code, type) => {
    let outcome = null;
    if (type === 'live') {
        const liveOutcome = liveOutcomes.find(item => item.code === code);
        if (liveOutcome) {
            markets.forEach(market => {
                if (market.name === liveOutcome.market_name) {
                    const odd = market.odds.find((item) => {
                        if(item.type === liveOutcome.name){
                            if(liveOutcome.special_value && liveOutcome.special_value === market.specialOddsValue){
                                return item
                            }
                            return item
                        }
                    });
                    if (odd && odd.active === "1") {
                        outcome = {
                            market_id: market.id,
                            market_name: market.name,
                            odds: odd.odds,
                            odd_name: odd.type,
                            odd_id: liveOutcome.id
                        };
                    }
                }
            })
        }
    } else {
        markets.forEach(market => {
        const odd = market.selections.find((item) => item.code === code)
        if (odd) {
            outcome = odd;
            outcome.market_id = market.market_id;
            outcome.market_name = market.market_name;
        };
            return;
        });
    }
    return outcome;
  };

  const updateCode = (outcome) => {
    const i = selected.index;
    // clone selections array
    const newArr = [...selections];
    newArr[i].market_code = outcome.code;
    newArr[i].odds = outcome.odds;

    setSelections(newArr);

    // add new line
    addCDLine();
    // focus on new input field after 100 millieseconds
    setTimeout(() => {
      document.getElementById(`event_id_${i + 1}`).focus();
    }, 100);

    setSelected(null);

  }

  return (
    <div className="groupsDivMain">
      <div>
        <table
          className="dgStyle logged-table cashdesk-table"
          cellSpacing="0"
          border="0"
          style={{
            borderWidth: "0px",
            borderStyle: "None",
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr className="dgHdrStyle">
              <th></th>
              <th>Event ID</th>
              <th>Event Date</th>
              <th className="l-table__team">Event</th>
              <th>Smart Code</th>
              <th>Odds</th>
            </tr>
          </thead>
          <tbody>
            {selections.map((selection, i) => (
              <tr key={i}>
                <td onClick={() => removeCDLine(i)}>
                  <div className="add-remove-icon"></div> {i + 1}.
                </td>
                <td>
                  <input
                    autoComplete="off"
                    id={`event_id_${i}`}
                    type="text"
                    defaultValue={selection.event_id}
                    maxlength="4"
                    onKeyUp={(e) => findEvent(e, i)}
                  />
                </td>
                <td>
                  <span id="CDdate_1"> {selection.event_date}</span>
                </td>
                <td>
                  <span
                    id="CDevent_1"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      history.push(
                        `/Sport/EventDetail?EventID=${selection.fixture.provider_id}`
                      )
                    }
                  >
                    {selection.event_name}
                  </span>
                  <span style={{ color: "grey" }}>
                    {(selection.fixture?.sport_category_name || "") +
                      " - " +
                      selection.tournament_name}
                  </span>
                </td>
                <td>
                  
                  <input
                    id={`event_code_${i}`}
                    type="text"
                    autoComplete="off"
                    defaultValue={selection.market_code}
                    onKeyUp={(e) => changeCode(e, i)}
                  />
                  <div className="smart-bet">
                                    {/* <div className="red-tooltip" id="CDred_1">
                                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>Shortcut code is invalid
                                </div> */}
                      <div className="tooltip-info" onClick={() => {
                        if (selection.fixture) {
                          setShowFixture(true);
                          setSelected({fixture: selection.fixture, index: i});
                        }
                      }}>
                        <FontAwesomeIcon icon={faTable} />
                                {/* <i className="fa fa-table" aria-hidden="true"></i> */}
                      </div>
                    </div>
                </td>
                <td>
                  <span id="CDodd_1">{selection.odds}</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6">
                <div className="add-remove-icon add" onClick={addCDLine}></div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="cashdesk-content">
        <div className="cashdesk-tabs">
          <div className="row">
            <div className="tab">
              Total selection:{" "}
              <span className="selectionss">{coupon.selections.length}</span>
            </div>
            <div className="tab">
              Min Bonus:{" "}
              <span id="CDminBonus">{formatNumber(coupon.minBonus)}</span>
            </div>
            <div className="tab">
              Min Win: <span id="CDminWin">{formatNumber(coupon.minWin)}</span>
            </div>
            <div className="stake-holder">
              <span>Stake</span>
              <input
                id="cashDeskStake"
                type="text"
                onChange={(e) => {
                  if (coupon.bet_type === "Split") {
                    updateSystemWinnings(e.target.value);
                  } else {
                    dispatch(updateWinnings(e.target.value));
                  }
                }}
                value={coupon.totalStake}
              />
            </div>
          </div>
          <div className="row">
            <div className="tab">
              Total Odds: <span className="maxodd">{coupon.totalOdds}</span>
            </div>
            <div className="tab">
              Max Bonus:{" "}
              <span id="CDmaxBonus">{formatNumber(coupon.maxBonus)}</span>
            </div>
            <div className="tab green">
              Max Win: <span id="CDmaxWin">{formatNumber(coupon.maxWin)}</span>
            </div>
            <div className="buttons">
              <div
                className="cancel"
                onClick={() => dispatch({ type: CANCEL_BET })}
              >
                Cancel
              </div>
              <button
                type="button"
                className="proceed"
                onClick={(e) => dispatch(placeBet(e, "bet", null))}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
      {showFixture && <ViewFixtureModal 
        fixture={selected?.fixture}
        setShow={() => setShowFixture(false)} 
        dispatch={dispatch}
        updateCode={updateCode}
      />}
    </div>
  );
};
