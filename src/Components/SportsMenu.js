import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSports, setTournaments } from "../Redux/actions";
import { SET_TOURNAMENTS } from "../Redux/types";
import { getSportMenu } from "../Services/apis";

export const SportsMenu = () => {
    const {activePeriod, sports, tournaments} = useSelector((state) => state.sportsData);
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const toggleSportMenu = e => {
        // console.log(e);
        e.currentTarget.parentNode.classList.toggle('sel');
        // e.target.nextElementSibling.style.display = ''
    }

    const getSports = async () => {
        await getSportMenu(activePeriod).then(res => {
            dispatch(setSports(res.menu));
        });
    }

    useEffect( () => {
        getSports();
    }, [activePeriod]);

    const openEvent = (cid, tid, sid) => {

        const index = tournaments.findIndex(tournament => tournament.sport_tournament_id === tid);
        if (index !== -1) { // remove tournament
            tournaments.splice(index, 1);
            // update state
            dispatch({
                type: SET_TOURNAMENTS,
                payload: tournaments
            });

        } else {
            const pathname = window.location.pathname;
            const urlSearch= window.location.search;
            const url = `/Sport/Odds?tid=${tid}&sid=${sid}`;
            if (pathname+urlSearch === url) {
                dispatch(setTournaments({tid, sid}));
            } else {
                history.push(url);
            }
        }
        // dispatch(setTournaments({tid, sid}));
    }

    const doSearch = e => {
        e.preventDefault();
        if(keyword.length)
            history.push(`/Sport/SearchResults?q=${keyword}`)
    }

    console.log(tournaments)

    return (
        <div>
            <div className="sportPanel">
                <div className="menuContainer">
                    <div class="liveButton">
                        <span>LiveBetting</span>
                    </div>
                    <ul className="sportMenu">
                        {sports.map(sport => 
                        <li class="itemSport" key={sport.id}>
                            <div class="head" onClick={(e) => toggleSportMenu(e)}>
                                <div class="nameSport">{sport.name} </div>
                                <span class="sportCount">{sport.total}</span>
                                <div class="groupLink"></div>
                            </div>
                            {sport.categories && 
                            <ul class="groupMenu">
                                {sport.categories.map(category => 
                                    <li class="itemGroup" key={`category_${category.sport_category_id}`}>
                                        <div class="head"  onClick={(e) => toggleSportMenu(e)}>
                                            <div class="image"></div>
                                            <div class="nameGroup ">{category.name}</div>
                                            <span class="groupCount ">{category.total}</span>
                                        </div>
                                        {category.tournaments && 
                                            <ul class="eventMenu">
                                                {category.tournaments.map(tournament => 
                                                    <li 
                                                    className={`itemEvent ${tournaments.some(item => item.sport_tournament_id === tournament.sport_tournament_id) ? 'selected' : ''}`}
                                                        key={`tournament_${tournament.sport_tournament_id}`}
                                                        id={`TOR_${tournament.sport_tournament_id}`}
                                                        onClick={(e) => openEvent(category.sport_category_id, tournament.sport_tournament_id, sport.sport_id)}
                                                    >
                                                        <div class="head">
                                                            <span class="nameEvent ">{tournament.name}</span>
                                                            <span class="eventCount ">{tournament.total}</span>
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        }
                                    </li>
                                )}
                            </ul>}
                        </li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}
