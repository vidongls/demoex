import { useState } from 'react'

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)

  function toggle() {
    setIsShowing(!isShowing)
  }

  function onHide() {
    setIsShowing(false)
  }

  return {
    isShowing,
    toggle,
    onHide,
  }
}

export default useModal
