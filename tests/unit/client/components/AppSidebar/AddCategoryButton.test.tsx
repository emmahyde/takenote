import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'

import { TestID } from '@resources/TestID'
import {
  AddCategoryButton,
  AddCategoryButtonProps,
} from '@/components/AppSidebar/AddCategoryButton'

describe('<AddCategoryButton />', () => {
  it('renders the AddCategoryButton component', () => {
    const enabledProps: AddCategoryButtonProps = {
      handler: vi.fn,
      label: 'Test',
      dataTestID: TestID.ADD_CATEGORY_BUTTON,
    }

    const component = render(<AddCategoryButton {...enabledProps} />)

    expect(component).toBeTruthy()
  })
})
