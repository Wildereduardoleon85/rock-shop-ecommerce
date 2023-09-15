import React, { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  children: React.JSX.Element | React.JSX.Element[]
  wrapperId: string
}

function createWrapperAndAppendToBody(wrapperId: string): HTMLDivElement {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)

  return wrapperElement
}

function Portal({ children, wrapperId }: PortalProps) {
  const [wrapperElement, setWrapperElement] = useState<null | HTMLElement>(null)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false

    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }

    setWrapperElement(element)

    return () => {
      const htmlElement = element as HTMLElement
      if (systemCreated && htmlElement.parentNode) {
        htmlElement.parentNode.removeChild(htmlElement)
      }
    }
  }, [wrapperId])

  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}

export default Portal
