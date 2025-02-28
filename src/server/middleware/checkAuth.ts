import { Request, Response, NextFunction } from 'express'

const checkAuth = async (request: Request, response: Response, next: NextFunction) => {
  // For local development without GitHub OAuth, you can set DEMO=true in .env
  if (process.env.NODE_ENV === 'development' && process.env.DEMO === 'true') {
    console.log('Development mode: Bypassing GitHub authentication')
    response.locals.accessToken = 'dev-token'

    return next()
  }

  const accessToken = request.cookies?.githubAccessToken

  if (accessToken) {
    response.locals.accessToken = accessToken
    next()
  } else {
    response.status(403).send({ message: 'Forbidden Resource', status: 403 })
  }
}

export default checkAuth
