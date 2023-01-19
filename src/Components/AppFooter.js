import React from "react";

export const AppFooter = () => {

    return (
        <div id="divFooter">
            <div className="Main">
                <div className="Content">
                    <div className="Social">
                        <a className="facebook" href="https://www.facebook.com/Bet9ja.Official/" target="_blank"></a>
                        <a className="twitter" href="https://twitter.com/Bet9jaOfficial" target="_blank"></a>
                        <a className="gplus" target="_blank"></a>
                        <a className="instagram" href="https://www.instagram.com/bet9jaig/" target="_blank"></a>
                    </div>
                    <div className="Terms">
                        <ul>
                            <li><a title="" href="#">BET9JA</a></li>
                            <li><a title="Home" href="/Sport/Default.aspx">Home</a></li>
                            <li><a title="About Us" href="/Pages/aboutus/Content">About Us</a></li>
                            <li><a title="Become an Agent" onclick="window.open('https://agents.bet9ja.com/','_blank')">Become an Agent</a></li>
                            <li><a title="Contact Us" href="/TPAutologin.aspx?Destinazione=contact_us_agent">Contact Us</a></li>
                            <li><a title="Results" onclick="window.open('https://web.bet9ja.com/Sport/Results.aspx','', 'width=860,height=700,scrollbars=1')">Results</a></li>
                            <li><a title="Web Affiliates" onclick="window.open('https://affiliates.bet9ja.com','', 'width=860,height=700,scrollbars=1')" target="_self">Web Affiliates</a></li>
                            <li><a title="Apps" href="https://promo.bet9ja.com/mobileapps/" target="_blank">Apps</a></li>
                        </ul>
                        
                        <ul>
                            <li><a title=""> </a></li>
                            <li><a title="Terms and Conditions" href="/pages/SportFooter_Terms/Content">Terms and Conditions</a></li>
                            <li><a title="Sport T&amp;C" href="/pages/SportFooter_SportTerms/Content">Sport T&amp;C</a></li>
                            <li><a title="Responsible Gaming" href="/pages/SportFooter_RespGaming/Content">Responsible Gaming</a></li>
                            <li><a title="Privacy" href="/pages/SportFooter_Privacy/Content">Privacy</a></li>
                        </ul>
                    </div>
                    <div className="divBottom">
                        <div className="Disclaimer">
                            2020 All rights reserved
                            <div className="CreditLogo" />
                            <span className="eighteen" />
                        </div>
                    </div>
                    <div className="divDisclaimer">
                        Bet9ja is not affiliated or connected with sports teams, event organisers and/or players displayed on its images/websites.
                    </div>
                </div>
                <span className="redLine" />
            </div>
        </div>
    )
}
