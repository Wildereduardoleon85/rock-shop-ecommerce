import { useEffect, useState } from 'react'

function useMediaQuery(): number {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth)

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenSize(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  return screenSize
}

export default useMediaQuery
