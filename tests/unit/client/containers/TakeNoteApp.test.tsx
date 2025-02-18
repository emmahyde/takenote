import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { waitFor } from '@testing-library/react'
import { name, internet, lorem } from 'faker'

import { getAuth, getCategories, getSettings, getNotes, getSync } from '@/selectors'
import { Folder, NotesSortKey } from '@/utils/enums'
import { TakeNoteApp } from '@/containers/TakeNoteApp'

import { renderWithRouter } from '../testHelpers'

vi.mock('@/selectors')

const mockedGetNotes = vi.mocked(getNotes)
const mockedGetSettings = vi.mocked(getSettings)
const mockedGetCategories = vi.mocked(getCategories)
const mockedGetSync = vi.mocked(getSync)
const mockedGetAuth = vi.mocked(getAuth)

const wrap = () => renderWithRouter(<TakeNoteApp />)

describe('<TakeNoteApp />', () => {
  it('should see empty editor if there are no active notes', async () => {
    mockedGetNotes.mockImplementation(() => {
      return {
        activeCategoryId: '',
        activeFolder: Folder.ALL,
        activeNoteId: '',
        selectedNotesIds: [],
        error: '',
        loading: false,
        notes: [],
        searchValue: '',
      }
    })
    mockedGetSettings.mockImplementation(() => {
      return {
        isOpen: false,
        loading: false,
        previewMarkdown: false,
        darkTheme: false,
        sidebarVisible: true,
        notesSortKey: NotesSortKey.LAST_UPDATED,
        codeMirrorOptions: {
          mode: 'gfm',
          theme: 'base16-light',
          lineNumbers: false,
          lineWrapping: true,
          styleActiveLine: { nonEmpty: true },
          viewportMargin: Infinity,
          keyMap: 'default',
          dragDrop: false,
          scrollPastEnd: true,
        },
      }
    })
    mockedGetCategories.mockImplementation(() => {
      return {
        categories: [],
        error: '',
        loading: false,
        editingCategory: {
          id: '',
          tempName: '',
        },
      }
    })
    mockedGetSync.mockImplementation(() => {
      return {
        error: '',
        syncing: false,
        lastSynced: '',
        pendingSync: false,
      }
    })
    mockedGetAuth.mockImplementation(() => {
      return {
        loading: false,
        currentUser: {
          bio: lorem.words(),
          name: name.findName(),
          avatar_url: internet.url(),
        },
        isAuthenticated: true,
        error: '',
      }
    })

    const component = wrap()

    await waitFor(() => component.getByTestId('empty-editor'))
  })
})
