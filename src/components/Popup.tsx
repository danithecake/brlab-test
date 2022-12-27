import React, { TransitionEventHandler, useEffect, useState } from 'react'
import { BsXCircle } from 'react-icons/bs'
import clsx from 'clsx'

type PopupProps = {
  /** Текст заголовка */
  header: string
  /** Текст описания */
  description: string
  /** Ширина кнопки. Изменения применяются только при значениях больше 0 */
  width?: number
  /** Высота кнопки. Изменения применяются только при значениях больше 0 */
  height?: number
  /** Цвет фона в виде строки с hex/rgb-значением цвета или его именем */
  bgColor?: string
  /** Цвет текста в виде строки с hex/rgb-значением цвета или его именем */
  textColor?: string
  /**
   * Callback-функция запускаемая при нажатии пользователем ⓧ (кнопки закрытия)
   * и после завершения анимации закрытия.
   * При использовании данной callback-функции можно удалить компонент закрытого popup из DOM.
   */
  onClose?: () => void
}

/**
 * Компонент popup'а содержащего заголовок и описание,
 * c возможностью изменять цвета фона и текста, а также величины ширины и высоты.
 * Появление popup'а анимировано с помощью transform: scale из TailwindCSS и активируется
 * при добавлении компонента popup'а в DOM.
 * Скрытие popup'а также анимировано и активируется при удалении компонента popup'а из DOM.
 */
export default function Popup({ header, description, width = 0, height = 0, bgColor, textColor, onClose }: PopupProps) {
  const [isOpen, setOpenState] = useState<boolean>(false)
  const [isClosingTransition, setClosingTransitionState] = useState<boolean>(false)

  const handleClose = () => {
    if (!isOpen) {
      return
    }

    setClosingTransitionState(true)
    setOpenState(false)
  }
  const handleTransitionEnd: TransitionEventHandler = () => {
    if (!isClosingTransition) {
      return
    }

    setClosingTransitionState(false)
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  useEffect(() => {
    requestAnimationFrame(() => setOpenState(true))
  }, [])

  const containerStyles: React.CSSProperties = {}

  if (width > 0) {
    containerStyles.width = width
  }

  if (height > 0) {
    containerStyles.height = height
  }

  if (bgColor) {
    containerStyles.backgroundColor = bgColor
  }

  if (textColor) {
    containerStyles.color = textColor
  }

  return (
    <div
      className={clsx(
        'flex flex-col',
        'p-3 w-80 h-24 rounded-lg border border-inherit',
        'bg-white drop-shadow-xl',
        'transition-transform scale-0',
        isOpen && 'scale-100'
      )}
      style={containerStyles}
      onTransitionEndCapture={handleTransitionEnd}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="flex-1 pr-1 text-xl font-bold truncate ...">{header}</h3>
        <button
          type="button"
          className="border-0 bg-transparent hover:text-black/50 active:text-black"
          onClick={handleClose}
        >
          <BsXCircle />
        </button>
      </div>
      <section className="flex-1 overflow-y-auto text-sm">{description}</section>
    </div>
  )
}
