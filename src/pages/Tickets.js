import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getTickets} from "../Services/apis";
import moment from "moment";
import DatePicker from "react-datepicker";

export const Tickets = ({history}) => {
    const {isAuthenticated, user} = useSelector(state => state.auth);
    const [tickets, setTickets] = useState([]);
    const [filterData, setFilterData] = useState({
        branch_id: user?.branch?.id,
        start_date: moment().toDate(),
        end_date: moment().toDate()
    });

    useEffect(() => {
        if (!isAuthenticated)
            history.push('/Login');

        fetchTickets();
    }, [isAuthenticated]);

    const fetchTickets = () => {
        getTickets(filterData).then(res => {
            setTickets(res);
        })
    }

    return (
        <>
            <div className="spacer5" />

            <table id="tblMainContent">
                <tbody>
                    <tr>
                        <td className="tdCN">
                            <div className="iSBox ctrl_ViewModeSelector">
                                <div className="viewModeSelector">
                                    <div className="typeVisbutton">
                                        <ul className="labelSteps">
                                            <li className="s0"><div>Today</div></li>
                                            <li className="s1"><div>Tomorrow</div></li>
                                            <li className="s2"><div>week</div></li>
                                            <li className="s3 sel"><div>ALL</div></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div id="MainContent">
                                <div className="Riquadro">
                                    <div className="CntSX">
                                        <div className="CntDX">
                                            <div>
                                                <div className="RiquadroSrc">
                                                    <div className="Cnt">
                                                        <div>
                                                            <table className="SearchContainerStyle">
                                                                <tbody>
                                                                <tr className="SearchSectionStyle">
                                                                    <td className="SearchDescStyle">Date</td>
                                                                    <td className="SearchControlsStyle">
                                                                        <table>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td width="20%" align="right">From</td>
                                                                                <td>
                                                                                    <DatePicker
                                                                                        dateFormat="dd/MM/yyyy"
                                                                                        selected={filterData.start_date}
                                                                                        className="textbox"
                                                                                        style={{width: '75px'}}
                                                                                        onChange={date => setFilterData({
                                                                                            ...filterData,
                                                                                            start_date: date
                                                                                        })}
                                                                                    />
                                                                                </td>
                                                                                <td width="25px" align="center">
                                                                                    <img
                                                                                        src="/img/Calendar.gif"
                                                                                        alt="Display Calendar"
                                                                                        style={{borderWidth: '0px', cursor: 'pointer'}}
                                                                                    />
                                                                                </td>
                                                                                <td width="20%" align="right">To</td>
                                                                                <td>
                                                                                    <DatePicker
                                                                                        dateFormat="dd/MM/yyyy"
                                                                                        selected={filterData.end_date}
                                                                                        className="textbox"
                                                                                        style={{width: '75px'}}
                                                                                        onChange={date => setFilterData({
                                                                                            ...filterData,
                                                                                            end_date: date
                                                                                        })}
                                                                                    />
                                                                                </td>
                                                                                <td width="25px" align="center">
                                                                                    <img
                                                                                        src="/img/Calendar.gif"
                                                                                        alt="Display Calendar"
                                                                                        style={{borderWidth: '0px', cursor: 'pointer'}}
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

                                                                    <td className="tdSrcDX">
                                                                        <input
                                                                            type="submit"
                                                                            name="searchBtn"
                                                                            value="Search"
                                                                            className="button"
                                                                            onClick={fetchTickets}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="divDg">
                                                    <div>
                                                        <table className="dgStyle" cellSpacing="0" border="0"
                                                               style={{borderWidth: '0px', borderStyle:'None', width: '100%', borderCollapse: 'collapse'}}>
                                                            <tbody>
                                                            <tr className="dgHdrStyle">
                                                                <th scope="col">S/N</th>
                                                                <th scope="col">Draw</th>
                                                                <th scope="col">Location</th>
                                                                <th scope="col">Ticket No</th>
                                                                <th scope="col">Ticket Time</th>
                                                                <th scope="col">Time Registered</th>
                                                            </tr>
                                                            {tickets.map((ticket, i) =>
                                                                <tr className="dgItemStyle">
                                                                    <td align="center">{i + 1}</td>
                                                                    <td align="center">
                                                                        <span id="s_w_PC_PC_grid_ctl02_lblData">{moment(ticket.draw?.start_time).format('DD/MM/YYYY HH:mm')}</span>
                                                                        &nbsp;-&nbsp;
                                                                        <span id="s_w_PC_PC_grid_ctl02_lblData">{moment(ticket.draw?.end_time).format('DD/MM/YYYY HH:mm')}</span>
                                                                    </td>
                                                                    <td align="center">{ticket?.branch?.name}</td>
                                                                    <td align="center">{ticket.ticket_no}</td>
                                                                    <td align="center">{ticket.ticket_timestamp}</td>
                                                                    <td align="center">{moment(ticket.createdAt).format('DD/MM/YYYY HH:mm')}</td>
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
