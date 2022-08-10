import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'

import ensureAuthenticated from '../middleware/ensureAuthenticated'
import CreateUserController from '../controllers/CreateUserController'
import CreateSessionController from '../controllers/CreateSessionController'
import CreateSessionWithGoogleController from '../controllers/CreateSessionWithGoogleController'
import ProfileUserController from '../controllers/ProfileUserController'
import UpdateProfileUserController from '../controllers/UpdateProfileUserController'
import ChangeUserPasswordController from '../controllers/ChangeUserPasswordController'
import ListUserOAuthController from '../controllers/ListUserOAuthController'
import CreateUserAuthController from '../controllers/CreateUserPasswordController'
import LinkGoogleController from '../controllers/LinkGoogleController'
import UnlinkGoogleController from '../controllers/UnlinkGoogleController'
import DeleteUserAccountController from '../controllers/DeleteUserAccountController'
import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'

const createUserController = new CreateUserController()
const createSessionController = new CreateSessionController()
const createSessionWithGoogleController =
  new CreateSessionWithGoogleController()
const profileUserController = new ProfileUserController()
const updateProfileUserController = new UpdateProfileUserController()
const changeUserPasswordController = new ChangeUserPasswordController()
const listUserOAuthController = new ListUserOAuthController()
const createUserPasswordController = new CreateUserAuthController()
const linkGoogleController = new LinkGoogleController()
const unlinkGoogleController = new UnlinkGoogleController()
const deleteUserAccountController = new DeleteUserAccountController()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

const routes = Router()
const upload = multer(uploadConfig.multer)

routes.get('/', (req, res) => {
  return res.send('Seja melhor que ontem 👋')
})

routes.post('/users', createUserController.handle)
routes.post('/sessions', createSessionController.handle)
routes.post('/sessions/google', createSessionWithGoogleController.handle)
routes.post('/forgot-password', forgotPasswordController.handle)
routes.post('/reset-password', resetPasswordController.handle)

routes.get('/me', ensureAuthenticated, profileUserController.handle)
routes.delete('/me', ensureAuthenticated, deleteUserAccountController.handle)
routes.put(
  '/me',
  upload.single('file'),
  ensureAuthenticated,
  updateProfileUserController.handle
)
routes.put(
  '/me/change-password',
  ensureAuthenticated,
  changeUserPasswordController.handle
)
routes.post(
  '/me/create-password',
  ensureAuthenticated,
  createUserPasswordController.handle
)
routes.get('/me/oauth', ensureAuthenticated, listUserOAuthController.handle)

routes.post(
  '/me/oauth/google',
  ensureAuthenticated,
  linkGoogleController.handle
)
routes.delete(
  '/me/oauth/google',
  ensureAuthenticated,
  unlinkGoogleController.handle
)

export default routes
