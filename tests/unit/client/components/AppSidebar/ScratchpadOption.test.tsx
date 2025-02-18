import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'

import { ScratchpadOption, ScratchpadOptionProps } from '@/components/AppSidebar/ScratchpadOption'

describe('<ScratchpadOption />', () => {
  it('renders the ScratchpadOption component', () => {
    const enabledProps: ScratchpadOptionProps = {
      swapFolder: vi.fn,
      active: true,
    }

    const component = render(<ScratchpadOption {...enabledProps} />)

    expect(component).toBeTruthy()
  })
})
