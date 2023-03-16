import React, { useEffect, useState } from 'react'
import './content.css'
import useModal from './hooks/useModal'
import Modal from './components/Modal'
import { ACTION } from '../popup/Popup'

interface IFooterProps {}

// port.postMessage({ joke: 'Knock knock' })
// port.onMessage.addListener(function (msg) {
//   if (msg.question === "Who's there?") port.postMessage({ answer: 'Madame' })
//   else if (msg.question === 'Madame who?') port.postMessage({ answer: 'Madame... Bovary' })
// })

const Footer: React.FC<IFooterProps> = (props) => {
  const { isShowing, toggle,onHide } = useModal()
  const { isShowing: isShowInfo, toggle: toggleInfo, onHide: onHideInfo } = useModal()

  const [data, setData] = useState({} as any)

  const [priceDisplay, setPriceDisplay] = useState('')

  useEffect(() => {
    setPriceDisplay(
      document.querySelector('.box-price.jsClick.active .box-price-present')?.textContent || '',
    )

    document.querySelectorAll('.box-price').forEach((ele) => {
      return ele.addEventListener('click', (e) => handleClick(e, ele))
    })

    return () => {
      window.removeEventListener('click', (e) => handleClick)
    }
  }, [])

  const handleClick = (e: any, ele: any) => {
    setPriceDisplay(ele.querySelector('.box-price-present')?.textContent?.replace('*', ''))
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.action === ACTION.GET_INFO) {
        getInfo()
      }

      if (request.action === ACTION.ADD_TO_CART) {
        onAddToCart()
      }
    })
  }, [])

  const onAddToCart = () => {
    setData(getDataFromEle())
    // chrome.runtime.sendMessage({
    //   data: productData,
    // })
    onHideInfo()
    toggle()
  }

  const getInfo = () => {
    setData(getDataFromEle())
    // chrome.runtime.sendMessage({
    //   data: productData,
    // })

    onHide()
    toggleInfo()
  }

  const getDataFromEle = () => {
    const property = document.querySelector('.box03.group.desk .box03__item.item.act')?.textContent
    const color = document.querySelector(
      '.box03.group.color.desk .box03__item.item.act',
    )?.textContent
    const price = document.querySelector('.box-price.jsClick.active')
      ? document
          .querySelector('.box-price.jsClick.active .box-price-present')
          ?.textContent?.replace('*', '')
      : document.querySelector('.box-price-present')?.textContent?.replace('*', '')

    // const imageNodeList = document.querySelectorAll(
    //   '.box01__show .detail-slider .owl-stage .owl-item img',
    // )
    const images: any = document.querySelector('.img-main img')
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

    // const images = [] as any

    // imageNodeList.forEach((img: any) => {
    //   if (img?.src) {
    //     images.push(img.src)
    //   } else {
    //     images.push(img.getAttribute('data-src'))
    //   }
    // })
    const id = window.location.pathname.split('/')[2]
    const productData = {
      id,
      name,
      property,
      color,
      price,
      images: `${window.location.protocol}${images?.getAttribute('data-src')}`,
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
          <div>
            {priceDisplay
              ? priceDisplay
              : document.querySelector('.box-price-present')?.textContent?.replace('*', '')}
          </div>
        </div>
        {/* <div>
          <button className="btn info" onClick={getInfo} disabled={isShowInfo}>
            GetInfo
          </button>
          <button className="btn" onClick={onAddToCart} disabled={isShowing}>
            Add to cart
          </button>
        </div> */}
      </div>
      <div className="ivgnod-ex-modal">
        <Modal
          isShowing={isShowing}
          hide={toggle}
          content={
            <div className="popup-cart">
              <img src={data?.images || ''} alt="" />

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
                <img className="detail-page__image" src={data?.images || ''} alt="" />
              </div>
              <div>{data?.detail}</div>
              <div className="parameter__list" style={{ display: 'block' }}>
                {data?.properties?.map((item: any, idx: number) => (
                  <li key={idx}>
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
