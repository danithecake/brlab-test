import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Popup from './Popup'

export default {
  title: 'Popup',
  component: Popup,
  argTypes: {
    header: {
      defaultValue: 'Заголовок',
    },
    description: {
      defaultValue: 'Описание',
    },
  },
} as ComponentMeta<typeof Popup>

const PopupStory: ComponentStory<typeof Popup> = (args) => {
  const [isOpen, setOpenState] = useState<boolean>(true)

  const handleClose = () => {
    setOpenState(false)
    setTimeout(() => void setOpenState(true), 2000)
  }

  return <div>{isOpen && <Popup {...args} onClose={handleClose} />}</div>
}

export const Default = PopupStory.bind({})
