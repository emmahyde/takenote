import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'

import { TestID } from '@resources/TestID'
import { AddCategoryForm, AddCategoryFormProps } from '@/components/AppSidebar/AddCategoryForm'

describe('<AddCategoryForm />', () => {
  it('renders the AddCategoryForm component', () => {
    const enabledProps: AddCategoryFormProps = {
      submitHandler: vi.fn,
      changeHandler: vi.fn,
      resetHandler: vi.fn,
      editingCategoryId: 'Category-id',
      tempCategoryName: 'Category-id',
      dataTestID: TestID.NEW_CATEGORY_INPUT,
    }

    const component = render(<AddCategoryForm {...enabledProps} />)

    expect(component).toBeTruthy()
  })
})
