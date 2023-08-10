import { useEffect, useRef, ReactNode } from 'react'

type ClickAwayWrapperProps = {
  children: ReactNode
  onClickAway: Function
}

function ClickAwayWrapper({ children, onClickAway }: ClickAwayWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handleClick(e: globalThis.MouseEvent) {
    const elementRef = ref.current as HTMLDivElement
    const target = e.target as Document
    if (elementRef && !elementRef.contains(target)) {
      onClickAway()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return <div ref={ref}>{children}</div>
}

export default ClickAwayWrapper
