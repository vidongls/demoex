import React from 'react'
import ReactDOM from 'react-dom'

interface IMoDalProps {
  isShowing: boolean
  hide: () => void
  content?: React.ReactNode
}

const Modal: React.FC<IMoDalProps> = ({ isShowing, hide, content }) => {
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
              <div className="modal-content">{content ? content : null}</div>
            </div>
          </div>
        </>,
        document.querySelector('body')!,
      )
    : null
}

export default Modal
