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
  const { isShowing: isShowInfo, toggle: toggleInfo } = useModal()

  const [data, setData] = useState({} as any)

  const onAddToCart = () => {

    setData(getDataFromEle())
    // chrome.runtime.sendMessage({
    //   data: productData,
    // })

    toggle()
  }

  const getInfo = () => {


    setData(getDataFromEle())
    // chrome.runtime.sendMessage({
    //   data: productData,
    // })

    toggleInfo()
  }

  const getDataFromEle=()=>{
    const property = document.querySelector('.box03.group.desk .box03__item.item.act')?.textContent
    const color = document.querySelector(
      '.box03.group.color.desk .box03__item.item.act',
    )?.textContent
    const price = document.querySelector('.box-price-present')?.textContent?.replace('*', '')
    const imageNodeList = document.querySelectorAll(
      '.box01__show .detail-slider .owl-stage .owl-item img',
    )
    const name = document.querySelector('.detail h1')?.textContent
    const detail = document.querySelector('.content-article')?.textContent
    const rateEle = document.querySelector('.rating-top .list-star')?.outerHTML.toString()
    const rateNumber = document.querySelector('.rating-top .point')?.textContent

    const propertiesNode = document.querySelectorAll('.parameter .parameter__list li')

    const properties: any = []

    propertiesNode.forEach((element) => {
      properties.push({
        label: element.querySelector('.lileft')?.textContent,
        property: element.querySelector('.liright')?.textContent,
      })
    })

    const images = [] as any

    imageNodeList.forEach((img: any) => {
      if (img?.src) {
        images.push(img.src)
      } else {
        images.push(img.getAttribute('data-src'))
      }
    })

    const id = window.location.pathname.split('/')[2]

    const productData = {
      id,
      name,
      property,
      color,
      price,
      images,
      detail,
      rate: {
        rateNumber,
        rateEle,
      },
      properties,
    }
    return productData
  }



  return (
    <>
      <div className="ivgnod-ex-footer">
        <div>
          <div style={{ marginRight: '6px' }}>Price:</div>
          <div>{document.querySelector('.box-price-present')?.textContent?.replace('*', '')}</div>
        </div>
        <div>
          <button className="btn info" onClick={getInfo} disabled={isShowInfo}>
            GetInfo
          </button>
          <button className="btn" onClick={onAddToCart} disabled={isShowing}>
            Add to cart
          </button>
        </div>
      </div>
      <div className="ivgnod-ex-modal">
        <Modal
          isShowing={isShowing}
          hide={toggle}
          content={
            <div className="popup-cart">
              <img src={data?.images ? data?.images[0] : ''} alt="" />

              <div className="name">{data?.name}</div>

              <div>
                <span>Price:</span>
                <span>{data?.price}</span>
              </div>

              <div className="box-property">
                {data?.color ? <div className="ex-property">{data?.color}</div> : null}
                {data?.property ? <div className="ex-property">{data?.property}</div> : null}
              </div>
            </div>
          }
        />
      </div>

      <div className="ivgnod-ex-modal">
        <Modal
          isShowing={isShowInfo}
          hide={toggleInfo}
          content={
            <div className="detail-page">
              <div className="detail-page__name flex">
                <span style={{ marginRight: 12 }}>{data?.name}</span>
                <span dangerouslySetInnerHTML={{ __html: data?.rate?.rateEle }}></span>
              </div>

              <div>
                <img
                  className="detail-page__image"
                  src={data?.images ? data?.images[0] : ''}
                  alt=""
                />
              </div>
              <div>{data?.detail}</div>
              <div className="parameter__list" style={{display:'block'}}>
                {data?.properties?.map((item: any) => (
                  <li>
                    <p className="lileft">{item.label}</p>
                    <div className="liright">{item.property}</div>
                  </li>
                ))}
              </div>
            </div>
          }
        />
      </div>
    </>
  )
}

export default Footer
