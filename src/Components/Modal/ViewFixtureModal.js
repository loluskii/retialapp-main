import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCrosshairs, faSearch } from '@fortawesome/free-solid-svg-icons'
import { formatDate, formatOdd } from "../../Utils/helpers";
import { useEffect, useState } from 'react';
import { addToCoupon } from '../../Redux/actions';
import { createID } from '../../Utils/couponHelpers';
import { update } from 'lodash';

function ViewFixtureModal({fixture, setShow, dispatch, updateCode}) {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    if (fixture) {
      if (fixture.fixture_type === 'pre') {
        setMarkets(fixture.markets?.sort((a, b) => a.market_id - b.market_id))
      } else {
        setMarkets(fixture?.live_data?.markets?.sort((a, b) => a.id - b.id))
      }
    }
    return () => setMarkets('');

  }, [fixture]);

  const searchMarket = (e) => {
    const val = e.target.value;
    if(val === '') {
      setMarkets(fixture?.markets);
      return;
    }
    const filtered = markets.filter(market => market.market_name.includes(val.charAt(0).toUpperCase() + val.slice(1)));
    if (filtered.length) {
      setMarkets(filtered);
    } else {
      setMarkets(fixture?.markets);
    }
  }

  const addSelection = (selection, market) => {
    dispatch(addToCoupon(fixture, market?.market_id, market.market_name, selection.odds, selection.odd_id, selection.odd_name,
      createID(fixture.provider_id, market?.market_id, selection.odd_name, selection.odd_id), fixture.fixture_type));

    if(update) 
      updateCode(selection, market);

    setShow(false);
  }

  const PreMatchMarkets = ({market}) => {
    return (
      fixture.fixture_type ==='live' &&  market.active === 1 &&
      <div className="event-container opened odd" key={market.market_id}>
        <div className="subHeader">
          <div className="headerText">
            <span>{market.market_name} {market.specialOddsValue && market.specialOddsValue !== '-1' ? market.specialOddsValue : ''}</span>
          </div>
        </div>
        <div ng-className="{'wrap-6' : oddsCollection.MatchOdds.length > 6}" className={`content ${market.selections.length > 6 ? 'wrap-6' : ''}`}>
          {market.selections.map((selection,i) => 
            <div className="inner-content eventPopup" key={`selection_${market.market_name}_${selection.odd_id}`}>
              <span>{selection.odd_name}</span>
              <div style={{whiteSpace:'nowrap'}} className="innerOddItem make-offering" title="1">
                <a href="javascript:;"
                  onClick={() => addSelection(selection, market)}
                >
                  <div className="oddBorder">{selection.odds}</div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const LiveMatchMarkets = () => {

    const selectOdds = (market, selection) => {
      dispatch(addToCoupon(fixture, market.id, market.name, selection.odds, selection.type+'_'+market.id, selection.type,
              createID(fixture.provider_id, market.id, selection.type, selection.type+'_'+market.id),'live'));

      if(update) 
        updateCode(selection);

      setShow(false);
    }

    return (
      markets.map((market, i) => 
      market.active === '1' &&
      <div className="event-container opened odd" key={market.id}>
        <div className="subHeader">
          <div className="headerText">
            <span>{market.market_name} {market.specialOddsValue && market.specialOddsValue !== '-1' ? market.specialOddsValue : ''}</span>
          </div>
        </div>
        <div ng-className="{'wrap-6' : oddsCollection.MatchOdds.length > 6}" className={`content ${market.selections.length > 6 ? 'wrap-6' : ''}`}>
          {market.selections.map((selection) => 
            <div className="inner-content eventPopup" key={`selection_${market.market_name}_${selection.odd_name}`}>
              <span>{selection.odd_name}</span>
              <div style={{whiteSpace:'nowrap'}} className="innerOddItem make-offering" title="1">
                <a href="javascript:;"
                 onClick={() => selectOdds(market, selection)}
                >
                  <div className="oddBorder">
                  {formatOdd(parseFloat(selection.odds))}
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>)
    )
  }

  return (
    <>
      <div className="match-offerings-panel">
        <div className="panel panel-custom no-brand-footer">
          <div className="panel-heading w-icon panel-heading-green">
            <h3 className="panel-title">
              <FontAwesomeIcon icon={faCrosshairs} className="fa-fw" size="2x" />
              Match Offerings
            </h3>
            <span className="close-button" onClick={() => setShow()}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
            </span>
          </div>
          <div className="panel-body">
            <div className="top-bar">
              <div className="match-info-section">
                <div className="match-date-info">
                  <span className="match-date">{formatDate(fixture?.event_date, 'DD/MM/YYYY')}</span>
                  <span className="match-time">{fixture?.event_time}</span>
                </div>
                <div className="match-id">{fixture?.event_id}</div>
                <div className="match-details">
                  <span className="tournament-name">{fixture?.sport_name} / {fixture?.sport_category_name} / {fixture?.sport_tournament_name}</span>
                  <span className="match-name">{fixture?.event_name}</span>
                </div>
              </div>
              <div className="filter-section">
                <div>
                  <span className="filter-icon">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                  <input type="text" onKeyUp={(e) => searchMarket(e)} className="filter-box" placeholder="Filter Odds Type" />
                </div>
              </div>
            </div>

            <div className="results">
              <div className="results-wrapper mCustomScrollbar _mCS_20 mCS-autoHide">
                <div className="allMarkets">
                {fixture?.fixture_type === 'pre' ?
                    markets.map((market, i) => <PreMatchMarkets market={market} key={`market-${i}`} />)
                    :
                    <LiveMatchMarkets />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        className="match-offerings-overlay"
        onClick={() => setShow()}
      />
    </>
  );
}

export default ViewFixtureModal;
