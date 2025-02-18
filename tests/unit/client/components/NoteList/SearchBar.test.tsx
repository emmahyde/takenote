/** @vitest-environment jsdom */
import { describe, it, expect, vi } from 'vitest'
import React, { createRef } from 'react'
import { render, fireEvent } from '@testing-library/react'

import { TestID } from '@resources/TestID'
import { SearchBar, SearchBarProps } from '@/components/NoteList/SearchBar'

describe('<SearchBar />', () => {
  it('renders the SearchBar component', () => {
    const enabledProps: SearchBarProps = {
      searchRef: createRef() as React.MutableRefObject<HTMLInputElement>,
      searchNotes: vi.fn(), // Ensure the spy is a function instance
    }

    const component = render(<SearchBar {...enabledProps} />)

    expect(component).toBeTruthy()
  })

  it('renders the SearchBar and searches for text', () => {
    const enabledProps: SearchBarProps = {
      searchRef: createRef() as React.MutableRefObject<HTMLInputElement>,
      searchNotes: vi.fn(), // Use vi.fn() to create a proper mock function
    }

    const component = render(<SearchBar {...enabledProps} />)
    expect(component).toBeTruthy()

    const { getByTestId } = component

    fireEvent.change(getByTestId(TestID.NOTE_SEARCH), {
      target: { value: 'welcome' },
    })

    // Optionally, add an assertion to check that the mock function was called with the correct value
    expect(enabledProps.searchNotes).toHaveBeenCalledWith('welcome')
  })
})
