import { configureStore } from '@reduxjs/toolkit'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import React, { ReactElement } from 'react'

import rootReducer from '@/slices'
import { RootState } from 'types'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>
  store?: ReturnType<typeof configureStore>
}

function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState as any,
    }),
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    )
  }

  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

export * from '@testing-library/react'
export { renderWithProviders as render }
