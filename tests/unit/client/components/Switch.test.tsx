import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Switch, SwitchProps } from '@/components/Switch'

describe('<Switch />', () => {
  it('renders the Switch component', () => {
    const enabledProps: SwitchProps = {
      toggle: vi.fn(),
      checked: false,
      testId: 'fake-test-id-for-testing',
    }

    const component = render(<Switch {...enabledProps} />)

    expect(component).toBeTruthy()
  })
})
