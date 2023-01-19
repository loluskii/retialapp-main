
export const Default = ({history}) => {

    return (
        <>
            <div class="fastBetMultiple" id="FastBetMultiple">
                <div class="FSHelp">
                    <a id="s_w_PC_FastBet_linkFastBetHelp" title="Game code list" href="javascript:openClickPopup();"></a>
                </div>
                <div class="FSdesc">Fast Sport</div>
                <div class="content">
                    <div class="FSTxt">
                        <div class="FSLabel">
                            Event Code
                        </div>
                        <div id="FBCodPub">
                            <input type="text" id="CodPubField" />        
                        </div>
                    </div>                     
                    <div class="FSSE" id="FBCode">
                        <input type="text" id="FastCodeField" />
                    </div>     
                    <div class="FSConfirm" id="FBConfirm">
                        Add to betslip    
                    </div>       
                    <div class="FSResults" id="FBResults">
                        <div class="FSTitle" id="FBTitle"></div>

                        <div class="FSCurrent" id="FBCurrent">
                            <span>Code List</span>
                            <div class="FSSelectCode" id="FBSelectCode"></div>
                        </div>
                        
                    
                        <div class="FSListCode" id="FBListCode">
                                <div class="FSPanelButton" id="FSPanelButton">
                                <span><span class="codeTitle">Available Codes</span><span id="pageCount"></span></span>
                                <div id="changeView"></div>
                                <div id="prev"></div>
                                <div id="next"></div>                        
                            </div>        
                            <div class="FSView" id="FBView"></div>                               
                        </div>          

                        <div class="FSSuggest" id="FBSuggest"></div>
                    </div>        

                </div>      
            </div>
            <div class="ctrl_ViewModeSelector">
                <div class="viewModeSelector">
                    <div class="typeVisbutton">
                    <ul class="labelSteps">
                        <li class="vt2"><div>Today</div></li>
                        <li class="vt5"><div>Tomorrow</div></li>
                        <li class="vt1680"><div>week</div></li>
                        <li class="vt1 sel"><div>ALL</div></li>
                    </ul>
                        <div class="button visAll sel">All</div>
                        <div class="button visToday">Today</div>
                        <div class="button visTomorrow">Tomorrow</div>
                        <div class="button visWeek">Week</div>
                    </div>
                </div>
            </div>
        </>
    )
}
