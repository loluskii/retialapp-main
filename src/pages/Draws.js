import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getDraws} from "../Services/apis";
import moment from "moment";

export const Draws = ({history}) => {
    const {isAuthenticated} = useSelector(state => state.auth);
    const [draws, setDraws] = useState([]);

    useEffect(() => {
        // if (!isAuthenticated)
        //     history.push('/Login');

        fetchDraws();

    }, [isAuthenticated]);

    const fetchDraws = () => {
        getDraws().then(res => {
            setDraws(res);
        })
    }

    return (
        <>
            <div className="spacer5" />

            <table id="tblMainContent">
                <tbody>
                    <tr>
                        <td className="tdCN">

                            <div id="MainContent">
                                <div className="Riquadro">
                                    <div className="CntSX">
                                        <div className="CntDX">
                                            <div>
                                                <div className="divDg">
                                                    <div>
                                                        <table className="dgStyle" cellSpacing="0" border="0"
                                                               style={{borderWidth: '0px', borderStyle:'None', width: '100%', borderCollapse: 'collapse'}}>
                                                            <tbody>
                                                            <tr className="dgHd /rStyle">
                                                                <th scope="col"></th>
                                                                <th scope="col">Start Time</th>
                                                                <th scope="col">End Time</th>
                                                                <th scope="col">Price</th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                            {draws.map((draw, i) =>
                                                                <tr className="dgItemStyle" key={`draw-${i}`}>
                                                                    <td>{i + 1}</td>
                                                                    <td align="center">
                                                                        <span id="s_w_PC_PC_grid_ctl02_lblData">{moment(draw.start_time).format('YYYY-MM-DD HH:mm')}</span>
                                                                    </td>
                                                                    <td align="center">
                                                                        <span id="s_w_PC_PC_grid_ctl02_lblData">{moment(draw.end_time).format('YYYY-MM-DD HH:mm')}</span>
                                                                    </td>
                                                                    <td align="center">N{draw.price}</td>
                                                                    <td>
                                                                        <img src="/img/Dettagli.gif" alt="" />
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
