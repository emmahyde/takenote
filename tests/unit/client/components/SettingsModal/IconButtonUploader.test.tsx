import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import { Camera } from 'react-feather'

import { TestID } from '@resources/TestID'
import {
  IconButtonUploader,
  IconButtonUploaderProps,
} from '@/components/SettingsModal/IconButtonUploader'

describe('<IconButtonUploader />', () => {
  it('renders the IconButtonUploader component', () => {
    const enabledProps: IconButtonUploaderProps = {
      handler: vi.fn,
      dataTestID: TestID.ICON_BUTTON_UPLOADER,
      icon: Camera,
      text: 'takeNote',
      accept: 'takeNote',
    }

    const component = render(<IconButtonUploader {...enabledProps} />)

    expect(component).toBeTruthy()
  })
})
