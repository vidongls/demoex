import React, { useEffect, useState } from 'react'
import './content.css'
import useModal from './hooks/useModal'
import Modal from './components/Modal'

interface IFooterProps {}

// port.postMessage({ joke: 'Knock knock' })
// port.onMessage.addListener(function (msg) {
//   if (msg.question === "Who's there?") port.postMessage({ answer: 'Madame' })
//   else if (msg.question === 'Madame who?') port.postMessage({ answer: 'Madame... Bovary' })
// })

const Footer: React.FC<IFooterProps> = (props) => {
  const { isShowing, toggle } = useModal()
  const [data, setData] = useState({} as any)

  const onAddToCart = () => {
    const property = document.querySelector('.box03.group.desk .box03__item.item.act')?.textContent
    const color = document.querySelector(
      '.box03.group.color.desk .box03__item.item.act',
    )?.textContent
    const price = document.querySelector('.box-price-present')?.textContent?.replace('*', '')
    const imageNodeList = document.querySelectorAll(
      '.box01__show .detail-slider .owl-stage .owl-item img',
    )
    const images = [] as any

    imageNodeList.forEach((img: any) => {
      if (img?.src) {
        images.push(img.src)
      } else {
        images.push(img.getAttribute('data-src'))
      }
    })
    const id = window.location.pathname.split('/')[2]

    const productData = { id, property, color, price, images, quantity: 1 }

    setData(productData)
    // chrome.runtime.sendMessage({
    //   data: productData,
    // })

    toggle()
  }


  const onHide = () => {}

  return (
    <>
      <div className="ivgnod-ex-footer">
        <div>
          <div style={{ marginRight: '6px' }}>Price:</div>
          <div>{document.querySelector('.box-price-present')?.textContent?.replace('*', '')}</div>
        </div>
        <button className="btn" onClick={onAddToCart} disabled={isShowing}>
          Add to cart
        </button>
      </div>
      <div className="ivgnod-ex-modal">
        <Modal isShowing={isShowing} hide={toggle} data={data} />
      </div>
    </>
  )
}

export default Footer
