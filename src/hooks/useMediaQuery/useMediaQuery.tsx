import { useEffect, useState } from 'react'

type UseMediaQuery = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs' | ''

function useMediaQuery(): UseMediaQuery {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth)
  const [screenSize, setScreenSize] = useState<UseMediaQuery>('')

  useEffect(() => {
    const handleWindowResize = () => {
      setInnerWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  useEffect(() => {
    if (innerWidth <= 1400) {
      setScreenSize('xl')
    }

    if (innerWidth <= 1280) {
      setScreenSize('lg')
    }

    if (innerWidth <= 990) {
      setScreenSize('md')
    }

    if (innerWidth <= 840) {
      setScreenSize('sm')
    }

    if (innerWidth <= 650) {
      setScreenSize('xs')
    }

    if (innerWidth <= 420) {
      setScreenSize('xxs')
    }

    if (innerWidth > 1400) {
      setScreenSize('xxl')
    }
  }, [innerWidth])

  return screenSize
}

export default useMediaQuery
