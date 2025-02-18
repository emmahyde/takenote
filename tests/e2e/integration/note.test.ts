// note.test.ts
// Tests for managing notes (create, trash, favorite, etc)

import { Errors } from '@/utils/enums'
import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import { dynamicTimeCategoryName } from '../utils/testHelperEnums'
import {
  defaultInit,
  getNoteCount,
  navigateToNotes,
  navigateToFavorites,
  navigateToTrash,
  testIDShouldContain,
  testIDShouldNotExist,
  clickDynamicTestID,
} from '../utils/testHelperUtils'
import {
  assertNewNoteCreated,
  assertNoteEditorCharacterCount,
  assertNoteEditorLineCount,
  assertNoteListLengthEquals,
  assertNoteListLengthGTE,
  assertNoteListTitleAtIndex,
  assertNoteOptionsOpened,
  assertNotesSelected,
  clickCreateNewNote,
  createXUniqueNotes,
  clickEmptyTrash,
  clickNoteOptionDeleteNotePermanently,
  clickNoteOptionFavorite,
  clickNoteOptionRestoreFromTrash,
  clickNoteOptionTrash,
  clickNoteOptions,
  clickNoteOptionCopyLinkedNoteMarkdown,
  clickSyncNotes,
  typeNoteEditor,
  typeNoteSearch,
  clearNoteSearch,
  openNoteContextMenu,
  holdKeyAndClickNoteAtIndex,
  trashAllNotes,
  dragAndDrop,
} from '../utils/testNotesHelperUtils'
import {
  addCategory,
  selectMoveToCategoryOption,
  navigateToCategory,
} from '../utils/testCategoryHelperUtils'

describe('Manage notes test', () => {
  defaultInit()

  before(() => {
    // Delete welcome note
    clickNoteOptions()
    clickNoteOptionTrash()
  })

  beforeEach(() => {
    navigateToNotes()
    createXUniqueNotes(1)
    trashAllNotes()
    clearNoteSearch()
    createXUniqueNotes(1)
  })

  // Replace empty arrow functions with proper test implementations
  it('should send multiple selected notes to favorites when clicking on an already favorited selected note via context menu', () => {
    createXUniqueNotes(2)

    // Favorite the first note
    holdKeyAndClickNoteAtIndex(0, 'meta')
    openNoteContextMenu()
    clickNoteOptionFavorite()

    // Select both notes
    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')

    // Click favorite on the already favorited note
    openNoteContextMenu()
    clickNoteOptionFavorite()

    // Verify both notes are in favorites
    navigateToFavorites()
    assertNoteListLengthEquals(2)
  })

  it('should remove multiple selected notes from favorites when clicking on a not yet favorited selected note via context menu', () => {
    createXUniqueNotes(2)

    // Favorite both notes
    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')
    openNoteContextMenu()
    clickNoteOptionFavorite()

    navigateToFavorites()
    assertNoteListLengthEquals(2)

    // Select both notes and unfavorite
    holdKeyAndClickNoteAtIndex(0, 'meta')
    holdKeyAndClickNoteAtIndex(1, 'meta')
    openNoteContextMenu()
    clickNoteOptionFavorite()

    // Verify notes are removed from favorites
    assertNoteListLengthEquals(0)
  })
})
