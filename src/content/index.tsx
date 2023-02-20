import ReactDOM from 'react-dom'
import Footer from './Footer'
import { createRoot } from 'react-dom/client'

if (
  window.location.hostname === 'www.thegioididong.com' &&
  window.location.pathname.split('/')[2]
) {
  const myFooter = document.createElement('div')

  const gbTop = document.querySelector('body')
  gbTop?.append(myFooter)

  const root = createRoot(myFooter)
  root.render(<Footer />)
}
