import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import checkAuth from '../../../../src/server/middleware/checkAuth'

describe(`checkAuth middleware`, () => {
  let requestMock: any
  let responseMock: any
  const nextMock = vi.fn()
  const statusSend = vi.fn()

  beforeEach(() => {
    responseMock = {
      locals: {},
      status: vi.fn(() => {
        return { send: statusSend }
      }),
      clearCookie: vi.fn(),
    }
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it(`should pass saved cookies to locals`, async () => {
    requestMock = {
      cookies: {
        githubAccessToken: 'test access token',
      },
    }

    await checkAuth(requestMock, responseMock, nextMock)

    expect(responseMock.locals.accessToken).toEqual('test access token')
  })

  it(`should exit with an error if no access token cookie`, async () => {
    requestMock = {
      cookies: {},
    }

    await checkAuth(requestMock, responseMock, nextMock)

    expect(statusSend).toBeCalledWith({ message: 'Forbidden Resource', status: 403 })
  })
})
