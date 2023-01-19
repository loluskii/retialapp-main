import React, {Fragment, useEffect} from "react";
import { AccountMenu } from "../Components/AccountMenu";
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
                            <AccountMenu componentClase="loggedMenu" />
                        </td>
                        <td className="tdCN">
                            {children}
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </Fragment>
    )
}
