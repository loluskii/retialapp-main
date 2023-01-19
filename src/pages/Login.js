import * as Yup from "yup";
import {Formik} from "formik";
import {ClipLoader} from "react-spinners";
import {toast} from "react-toastify";
import {login} from "../Services/apis";
import {SET_USER_DATA} from "../Redux/types";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { NavLink } from "react-router-dom";

const FormSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Minimum 3 letters")
        .required(),
    password: Yup.string()
        .min(3, "Minimum 3 letters")
        .required("Enter a password")
});

export const Login = ({history}) => {
    const dispatch = useDispatch();

    const {isAuthenticated} = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/Home');
            document.body.classList.add('defaultlogged', 'Logged');
            document.body.classList.remove('default', 'Anonymous');
        }

    }, [isAuthenticated]);

    const toggleDisplay = (e) => {
        const ele = e.currentTarget;
        const prevEle = e.currentTarget.previousElementSibling;
        prevEle.focus();
        ele.style.display = ele.style.display === 'none' ? '' : 'none';
    }

    return (
        <div className="homeShop">
            <div className="bottoni">
                <NavLink className="bookBet" to="/Sport/Cashdesk" />
                {/* <a className="admin" href="../TPAutologin.aspx?Destinazione=ShopAdmin" target="_blank"></a> */}
                <a className="liveviewer" href="../TPAutologin.aspx?Destinazione=ShopCompetition" target="_blank"></a>
                <a className="live-scores" href="../TPAutologin.aspx?Destinazione=LottoPrintOdds" target="_blank"></a>
                {/* <a className="LottoResults" href="../TPAutologin.aspx?Destinazione=Lotto_Results" target="_blank"></a> */}
            </div>
            <div className="boxInserimento">
                <div className="login">
                    <div className="LoginTitle">Welcome</div>
                    <div id="h_w_PC_cLogin_phAnonimo">
                        <table cellSpacing="0" cellPadding="0" border="0" style={{width:'100%', borderCollapse:'collapse'}}>
                            <tbody>
                            <tr>
                                <td>
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={{
                                            username: '',
                                            password: ''
                                        }}
                                        validationSchema={FormSchema}
                                        onSubmit={(values, { setSubmitting, resetForm }) => {
                                            login(values).then(res => {
                                                setSubmitting(false);
                                                if (res.success){
                                                    dispatch({
                                                        type: SET_USER_DATA,
                                                        payload: {
                                                            user: res.user,
                                                            access_token: res.token,
                                                            isAuthenticated: true
                                                        }
                                                    });
                                                } else {
                                                    toast.error(res.message);
                                                }
                                            }).catch(err => {
                                                setSubmitting(false);
                                                toast.error('Error: ' + err.message);
                                            })
                                        }}
                                    >
                                        {({
                                              values,
                                              errors,
                                              touched,
                                              setFieldValue,
                                              handleSubmit,
                                              isSubmitting
                                        }) => (
                                            <form noValidate onSubmit={handleSubmit}>
                                                <div>
                                                    <div className="pnlLogged">
                                                        <div className="tdRegister">
                                                            <div className="divRegMain">
                                                                <div className="RegTxtUsr">
                                                                    <input
                                                                        name="username"
                                                                        className="txtLogin"
                                                                        value={values.username}
                                                                        type="text"
                                                                        onFocus={(e) => {
                                                                            const nextElement = e.currentTarget.nextElementSibling;
                                                                            nextElement.style.display = '';
                                                                        }}
                                                                        onBlur={(e) => {
                                                                            const val = e.target.value;
                                                                            if(!val.length){
                                                                                const nextElement = e.currentTarget.nextElementSibling;
                                                                                nextElement.style.display = '';
                                                                            }
                                                                        }}
                                                                        onChange={(e) => setFieldValue('username', e.target.value)}
                                                                    />
                                                                    <span className="fieldLabel" onClick={toggleDisplay}>Username</span>
                                                                    {errors.username && <span className="reqFieldMsg requsername"
                                                                          style={{color:'Red',display:'none'}}>
                                                                        {errors.username}
                                                                        <span className="imgError" />
                                                                    </span>}
                                                                </div>
                                                                <div className="RegTxtPwd">
                                                                    <input
                                                                        name="password"
                                                                        type="password"
                                                                        onBlur={(e) => {
                                                                            const val = e.target.value;
                                                                            if(!val.length){
                                                                                const nextElement = e.currentTarget.nextElementSibling;
                                                                                nextElement.style.display = ''
                                                                            }
                                                                        }}
                                                                        value={values.password}
                                                                        className="txtLogin" style={{display: 'inline'}}
                                                                        onChange={(e) => setFieldValue('password', e.target.value)}
                                                                    />
                                                                    <span className="fieldLabel" onClick={toggleDisplay}>Password</span>
                                                                    {errors.password && <span className="reqFieldMsg reqpassword" style={{color:'Red', display:'none'}}>
                                                                        {errors.password}
                                                                        <span className="imgError"/>
                                                                    </span>}
                                                                </div>
                                                                <div className="RegDivBtn">
                                                                    <a title="Log in" className="btnLogin" href="javascript:;" onClick={handleSubmit}>
                                                                        {isSubmitting ? <ClipLoader color="#fff" size={30} /> : 'Log in' }
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
                <div className="check">
                    <div className="check-coupon">
                        <div className="SXTitle"><a id="h_w_PC_ctl05_A1">Coupon Check</a></div>
                        <div className="divCouponCheck">
                            <div id="h_w_PC_ctl05_upCheckCoupon">
                                <div className="CheckCouponMain">
                                    <div className="CheckCpnTxt">
                                        Insert the coupon code you wish to check
                                    </div>
                                    <input name="h$w$PC$ctl05$txtCodiceCoupon" type="text" id="h_w_PC_ctl05_txtCodiceCoupon" />
                                    <a className="btnCheckCoupon" title="Check" href="javascript:__doPostBack('h$w$PC$ctl05$lnkCheckCoupon','')"></a>
                                </div>
                            </div>
                        </div>

                        <div id="popupCC">
                            <div className="RiquadroPopRiserva">
                                <div className="TopSX">
                                    <div className="TopDX" />
                                </div>
                                <div className="Cnt">
                                    <div id="h_w_PC_ctl05_pnl">
                                        <div className="divTitle">
                                            <h3>Coupon Check</h3>
                                            <a id="popupCCClose">
                                                <img src="../App_Themes/Bet9jaShop_1/images/icons/close_black_ico.gif" id="h_w_PC_ctl05_imgClose" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="BtmSX">
                                    <div className="BtmDX" />
                                </div>
                            </div>
                        </div>
                    <div id="backgroundPopupCC" />
                </div>
                <div className="check-search">
                    <div className="Title">Odds Search</div>
                    <div id="h_w_PC_oddsSearch_panelSearch" className="SXCercaContent" >
                        <div className="TitleCerca">
                            <span id="h_w_PC_oddsSearch_lblTitle">Search</span>
                        </div>
                        <div>
                            <input name="h$w$PC$oddsSearch$txtSearch" type="text" maxlength="50" className="TxtCerca" />
                        </div>
                        <div>
                            <a id="h_w_PC_oddsSearch_btnCerca" title="Start search" className="BtnCerca" href="javascript:__doPostBack('h$w$PC$oddsSearch$btnCerca','')"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
