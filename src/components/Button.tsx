import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type ButtonMode = 'button' | 'link' | 'div'
type ButtonProps = {
  /** Тип отображения кнопки */
  type?: 'primary' | 'secondary' | 'tertiary'
  /** Цвет фона в виде строки с hex/rgb-значением цвета или его именем */
  bgColor?: string
  /** Цвет текста в виде строки с hex/rgb-значением цвета или его именем */
  textColor?: string
  /** Ширина кнопки. Изменения применяются только при значениях больше 0 */
  width?: number
  /** Высота кнопки. Изменения применяются только при значениях больше 0 */
  height?: number
  /** Вариант поведения кнопки. 'link' реализует ссылку через 'next/link' из NextJS */
  mode?: ButtonMode
} & (
  | { mode?: Exclude<ButtonMode, 'link'>; href?: never }
  | { mode?: Exclude<ButtonMode, 'button' | 'div'>; href: string }
) &
  (
    | ({
        /**
         * Текст кнопки.
         * Взаимоисключает использование дочерних компонентов для кнопки.
         * В случае использования дочерних компонентов для кнопки текст для нее
         * стоит пробрасывать также как дочерний элемент.
         */
        text: string
      } & Omit<React.ComponentPropsWithoutRef<any>, 'children'>)
    | ({ text?: never } & React.ComponentPropsWithoutRef<any>)
  )

const contentCN = clsx(
  'flex justify-center items-center space-x-1',
  'w-full h-full py-2 px-4 rounded',
  'hover:bg-white/20 active:bg-black/30',
  'truncate ...',
  'cursor-pointer'
)

/**
 * Компонент кнопки трех типов и трех вариантов поведения (button, link, div),
 * c возможностью изменять цвета фона и текста, а также величины ширины и высоты.
 */
export default function Button({
  text,
  type = 'primary',
  mode = 'button',
  href,
  bgColor,
  textColor,
  width = 0,
  height = 0,
  ...props
}: ButtonProps) {
  const containerCN = clsx(
    'relative inline-block w-32 h-12 rounded',
    type === 'primary' && 'bg-green-500',
    type === 'secondary' && 'bg-blue-500',
    type === 'tertiary' && 'bg-slate-900',
    'text-white'
  )
  const containerStyles: React.CSSProperties = {}

  if (bgColor) {
    containerStyles.backgroundColor = bgColor
  }

  if (textColor) {
    containerStyles.color = textColor
  }

  if (width > 0) {
    containerStyles.width = width
  }

  if (height > 0) {
    containerStyles.height = height
  }

  const Content: React.ReactNode = (props as React.ComponentProps<React.ElementType>).children

  if (mode === 'div') {
    return (
      <div {...props} className={containerCN} style={containerStyles} role="button">
        <span className={contentCN}>{Content || text}</span>
      </div>
    )
  }

  if (mode === 'link') {
    return (
      <Link {...props} className={containerCN} style={containerStyles} href={href as string} role="button">
        <span className={contentCN}>{Content || text}</span>
      </Link>
    )
  }

  return (
    <button {...props} className={containerCN} style={containerStyles} type="button">
      <span className={contentCN}>{Content || text}</span>
    </button>
  )
}
