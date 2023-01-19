import React from "react";

export const AccountMenu = ({componentClase}) => {

    return (
        <div className={componentClase}>
            <ul>
                <li>
                    <a title="My Account" href="#">My Account</a>
                    <ul>
                        <li><a title="Bet List" href="/Account/BetList">Bet List</a></li>
                        <li><a title="Jackpot Bet List" href="/Account/JackpotBetList">Jackpot Bet List</a></li>
                        <li><a title="Coupon Bet List" href="/Account/CouponBetList">Coupon Bet List</a></li>
                        <li><a title="Transactions List" href="/Account/TransactionList">Transactions List</a></li>
                        <li><a title="Cash In" href="/Account/Cash-In">Cash In</a></li>
                        <li><a title="Cash Out" href="/Account/Cash-Out">Cash Out</a></li>
                        <li><a title="Expenses" href="/Account/Expenses">Expenses</a></li>
                        {/* <li><a title="Bonuses" href="/Account/Bonuses">Bonuses</a></li> */}
                        <li><a title="Transactions List" href="/Account/BonusTransactionList">Bonus Transactions List</a></li>
                    </ul>
                </li>
                <li>
                    <a title="Account Detail" href="#">Account Detail</a>
                    <ul>
                        <li><a title="Change Password" href="/Account/user.aspx?tab=2">Change Password</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}
