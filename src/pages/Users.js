import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useSWR from "swr";
import {getUsers, saveUser} from "../Services/apis";
import {toast} from "react-toastify";

export const Users = ({history}) => {
    const [showUserForm, setShowUserForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: '',
        branch_id: ''
    });
    const {data: locations} = useSWR('/get-branches');

    const {isAuthenticated} = useSelector(state => state.auth);
    //
    useEffect(() => {
        if (!isAuthenticated)
            history.push('/Login');
        fetchUsers();

    }, [isAuthenticated]);

    const submit = () => {
        if (formData.username === ''){
            alert('Please enter a username');
            return
        }
        if (formData.password === ''){
            alert('Please enter a password');
            return;
        }
        setIsSubmitting(true);
        saveUser(formData).then(res => {
            setIsSubmitting(false);
            if (res.success) {
                setUsers([...users, res.user]);
            } else {
                toast.error(res.message);
            }
        }).catch(err => {
            setIsSubmitting(false);
            toast.error('Unable to process request');
        });
    }

    const fetchUsers = () => {
        getUsers(null).then(res => {
            setUsers(res);
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
                                                <div className="RiquadroSrc">
                                                    <div className="Cnt">
                                                        <div>
                                                            {showUserForm &&
                                                            <table className="SearchContainerStyle">
                                                                <tbody>
                                                                <tr className="SearchSectionStyle">
                                                                    <td className="SearchControlsStyle">
                                                                        <table>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td width="10%" align="right">Username</td>
                                                                                <td>
                                                                                    <input
                                                                                        name="from"
                                                                                        type="text" value={formData.username}
                                                                                        className="textbox"
                                                                                        style={{width: '75px'}}
                                                                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                                                                    />
                                                                                </td>
                                                                                <td width="20%" align="right">Password</td>
                                                                                <td>
                                                                                    <input
                                                                                        name="from"
                                                                                        type="password" value={formData.password}
                                                                                        className="textbox"
                                                                                        style={{width: '75px'}}
                                                                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                                                    />
                                                                                </td>
                                                                                <td width="20%" align="right">Branch</td>
                                                                                <td>
                                                                                    <select
                                                                                        name="branch_id"
                                                                                        value={formData.branch_id}
                                                                                        onChange={(e) => setFormData({...formData, branch_id: e.target.value})}
                                                                                    >
                                                                                        <option value="">Select Location</option>
                                                                                        {locations?.map(branch =>
                                                                                            <option key={branch.id} value={branch.id}>{branch.name}</option>
                                                                                        )}
                                                                                    </select>
                                                                                </td>
                                                                                <td width="20%" align="right">Role</td>
                                                                                <td>
                                                                                    <select
                                                                                        name="role"
                                                                                        value={formData.role}
                                                                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                                                                    >
                                                                                        <option value="">Select Role</option>
                                                                                        <option value="User">User</option>
                                                                                        <option value="Admin">Admin</option>

                                                                                    </select>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>}
                                                            <table className="SearchButtonsStyle">
                                                                <tbody>
                                                                <tr>
                                                                    <td></td>
                                                                    <td className="tdSrcSX">
                                                                        <input
                                                                            type="submit"
                                                                            name="addUser"
                                                                            value={showUserForm ? 'Cancel' : 'Add User'}
                                                                            className="button"
                                                                            onClick={() => setShowUserForm(!showUserForm)}
                                                                        />
                                                                    </td>
                                                                    {showUserForm && <td className="tdSrcDX">
                                                                        <input
                                                                            type="button"
                                                                            name="name"
                                                                            onClick={submit}
                                                                            disabled={isSubmitting}
                                                                            value={isSubmitting ? 'Submitting' : 'Submit'}
                                                                            className="button"
                                                                        />
                                                                    </td>}
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
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Username</th>
                                                                <th scope="col">Branch</th>
                                                                <th scope="col">Last Login</th>
                                                                <th scope="col">IP Address</th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                            {users.map((user, i) =>
                                                            <tr className="dgItemStyle" key={user.id}>
                                                                <td align="center">{i + 1}</td>
                                                                <td align="center">{user.username}</td>
                                                                <td align="center">{user.branch.name}</td>
                                                                <td align="center">{user.lastLogin || '-'}</td>
                                                                <td align="center">{user.ip_address || '-'}</td>
                                                                <td>
                                                                    <img src="/img/cross-red.png" alt="" />
                                                                    <img src="/img/Dettagli.gif" alt="" />
                                                                </td>
                                                            </tr>)}
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
