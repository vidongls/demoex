import React from 'react'
import ReactDOM from 'react-dom'

interface IMoDalProps {
  isShowing: boolean
  hide: () => void
  data: any
}

const Modal: React.FC<IMoDalProps> = ({ isShowing, hide, data }) => {

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay" />
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header">
                <button type="button" className="modal-close-button" onClick={hide}>
                  <span>×</span>
                </button>
              </div>
              <div className="modal-content">
                <img src={data?.images[0]} alt="" />

                <div>
                  <span>Price:</span>
                  <span>{data?.price}</span>
                </div>

                <div className="box-property">
                  <div className="ex-property">{data?.color}</div>
                  <div className="ex-property">{data?.property}</div>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.querySelector('body')!,
      )
    : null
}

export default Modal
