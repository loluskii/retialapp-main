import React from "react";
/**
 * packages
 */
import {Switch, Route} from "react-router-dom";
import { Cashdesk } from "../pages/Sports/CashDesk";
import { Default } from "../pages/Sports/Default";
import SportOdds from "../pages/Sports/SportOdds";


export default function SportRoutes() {

  return (
      <Switch>
          <Route exact path="/Sport/Default" component={Default} />
          <Route exact path="/Sport/Cashdesk" component={Cashdesk} />
          <Route exact path="/Sport/Odds" component={SportOdds} />
          {/* <Route exact path="/Sport/OddsLessThan" component={OddsLessThan} />
          <Route exact path="/Sport/Explore" component={ExploreEvents} />
          <Route exact path="/Sport/PreMatch/:sport" component={TournamentSelector} />
          <Route exact path="/Sport/Pages/:slug" component={CMSPages} />
          <Route exact path="/Sport/Pool" component={PoolFixtures} />
          <Route exact path="/Sport/Coupon" component={WeeklyCoupon} />
          <Route exact path="/Sport/EventDetail" component={EventDetails} />
          <Route exact path="/Sport/SearchResults" component={SearchResults} />
          <Route exact path="/Sport/PrintFixtures" component={PrintFixtures} />
          <Route exact path="/Sport/Tipsters" component={Tipsters} />
          <Route exact path="/Sport/Tipsters/:id" component={TipsterBetslips} />
          <Redirect exact from="/" to="/Sport/Default"/> */}
      </Switch>
  );
}
