import { useDispatch, useSelector } from "react-redux";
import { SHOW_MODAL } from "../../Redux/types";

function Modal() {
  const dispatch = useDispatch();
  const { modal } = useSelector(state => state.sportsData);

  return (
    <>
      <div id="popupContactDett" style={{display: modal?.open ? 'block' : 'none', top: '10%', left: '28%'}}>
        <div className="RiquadroPopDettSE">
          <div className="TopSX">
              <div className="TopDX"></div>
          </div>
          <div className="Cnt">
            <div>
              <div className="divTitle">
                <div className="divTitleDX">
                  {modal?.title}
                  <a id="popupContactDettClose" onClick={() => dispatch({type: SHOW_MODAL, payload: null})}>
                    <img src="/img/close_black_ico.gif" alt="Close Modal" />
                  </a>
                </div>
              </div>
              <div id="divBody">
                {modal?.component}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        id="backgroundPopupDett"
        onClick={() => dispatch({type: SHOW_MODAL, payload: null})} 
        style={{opacity: 0.7, display: modal?.open ? 'block' : 'none'}}
      />
    </>
  );
}

export default Modal;
