import { useEffect, useState } from 'react'
import './Popup.css'
import { chromeExtension } from '@crxjs/vite-plugin'

function App() {
  const [data, setData] = useState([] as any)
  useEffect(() => {
    // chrome.runtime.onMessage.addListener((msg: any, sender: any) => {
    //   setData((prev: any) => {
    //     const newData = [...prev]

    //     const idx = newData.findIndex((ele) => ele.id === msg.data.id)

    //     if (idx === -1) {
    //       newData.push(msg.data)
    //     } else {
    //       newData[idx].quantity += 1
    //     }
    //     return newData
    //   })
    // })


  }, [])

  // chrome.runtime.sendMessage({type: "ABC"})
  return <div></div>
}

export default App
