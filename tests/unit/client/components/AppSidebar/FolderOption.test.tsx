import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'

import { TestID } from '@resources/TestID'
import { FolderOption, FolderOptionProps } from '@/components/AppSidebar/FolderOption'
import { Folder } from '@/utils/enums'

describe('<FolderOption />', () => {
  it('renders the FolderOption component', () => {
    const enabledProps: FolderOptionProps = {
      swapFolder: vi.fn,
      addNoteType: vi.fn,
      text: 'Test',
      dataTestID: TestID.FOLDER_NOTES,
      active: true,
      folder: Folder.CATEGORY,
    }

    const component = render(<FolderOption {...enabledProps} />)

    expect(component).toBeTruthy()
  })
})
