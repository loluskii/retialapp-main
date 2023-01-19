import React, {Fragment, useEffect} from "react";
import { AccountMenu } from "../Components/AccountMenu";
import { RightSide } from "../Components/RightSide";
import { SportsMenu } from "../Components/SportsMenu";

export default function Sports({children, history}) {

    useEffect(() => {
        document.body.classList = 'bodyMain en-GB sport_master oddsasync Logged';
    }, []);

    return (
        <Fragment>
            <div class="spacer5"></div>
            <table cellPadding="0" cellSpacing="0" id="tblMainContent">
                <tbody>
                    <tr>
                        <td className="tdSX">
                            <div class="SXCercaContent">
	                            <div class="TitleCerca">
                                    <span>Search</span>
                                </div>
                                <div>
                                    <input name="s$w$PC$oddsSearch$txtSearch" type="text" maxlength="50" class="TxtCerca" />
                                </div>
                                <div>
                                    <a title="Start search" class="BtnCerca" href="#"></a>
                                </div>
                            </div>
                            <SportsMenu />

                            <AccountMenu componentClase="loggedMenu" />
                        </td>
                        <td className="tdCN">
                            {children}
                        </td>
                        <td className="tdDX">
                            <RightSide />
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    )
}
