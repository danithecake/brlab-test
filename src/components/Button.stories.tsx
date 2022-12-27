import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BsFillCheckCircleFill, BsChevronRight } from 'react-icons/bs'
import Button from './Button'

const contentVariants = {
  text: 'text',
  leftIcon: 'left',
  rightIcon: 'right',
  bothIcons: 'both',
  iconOnly: 'center',
} as const

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    text: {
      defaultValue: 'Кнопка',
    },
    type: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'select' },
    },
    mode: {
      options: ['button', 'link', 'div'],
      control: { type: 'select' },
    },
    href: {
      defaultValue: 'https://github.com/brlabrussia',
      control: { type: 'text' },
      if: { arg: 'mode', eq: 'link' },
    },
    content: {
      defaultValue: 'text',
      options: Object.keys(contentVariants),
      mapping: contentVariants,
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Button>

const ButtonStory: ComponentStory<typeof Button> = ({
  text,
  content,
  ...args
}: React.ComponentProps<typeof Button> & {
  content: typeof contentVariants[keyof typeof contentVariants]
}) => {
  const icon = content

  switch (icon) {
    case 'left':
    case 'right':
    case 'both':
      return (
        <Button {...args}>
          {(icon === 'left' || icon === 'both') && <BsFillCheckCircleFill />}
          <span>{text}</span>
          {(icon === 'right' || icon === 'both') && <BsChevronRight />}
        </Button>
      )
    case 'center':
      return (
        <Button {...args}>
          <BsFillCheckCircleFill />
        </Button>
      )
    default:
      return <Button text={text} {...args} />
  }
}

export const Default = ButtonStory.bind({})
export const LeftIcon = ButtonStory.bind({})
LeftIcon.args = { content: contentVariants.leftIcon }
LeftIcon.parameters = {
  docs: {
    description: {
      story: 'Иконка слева + текст',
    },
  },
}
export const RightIcon = ButtonStory.bind({})
RightIcon.args = { content: contentVariants.rightIcon }
RightIcon.parameters = {
  docs: {
    description: {
      story: 'Текст + иконка справа',
    },
  },
}
export const BothIcons = ButtonStory.bind({})
BothIcons.args = { content: contentVariants.bothIcons }
BothIcons.parameters = {
  docs: {
    description: {
      story: 'Иконка слева + текст + иконка справа',
    },
  },
}
export const IconOnly = ButtonStory.bind({})
IconOnly.args = { content: contentVariants.iconOnly }
IconOnly.parameters = {
  docs: {
    description: {
      story: 'Только иконка',
    },
  },
}
