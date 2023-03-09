import { useEffect, useState } from 'react'
import './Popup.css'
import { chromeExtension } from '@crxjs/vite-plugin'

export const ACTION = {
  GET_INFO: 'GET_INFO',
  ADD_TO_CART: 'ADD_TO_CART',
}

function App() {
  const [data, setData] = useState([] as any)
  const [action, setAction] = useState('')

  useEffect(() => {
    // chrome.runtime.onMessage.addListener((msg: any, sender: any) => {

    // })

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: any) {
      chrome.tabs.sendMessage(tabs[0].id, action, function (response) {
        console.log(response)
      })
    })
  }, [action])

  // chrome.runtime.sendMessage({type: "ABC"})
  return (
    <div className="ivgnod-ex-popup">
      <button
        className="btn info"
        onClick={() => {
          setAction(ACTION.GET_INFO)
        }}
      >
        GetInfo
      </button>
      <button
        className="btn"
        onClick={() => {
          setAction(ACTION.ADD_TO_CART)
        }}
        // onClick={onAddToCart} disabled={isShowing}
      >
        Add to cart
      </button>
    </div>
  )
}

export default App
