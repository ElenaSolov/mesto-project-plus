# Mesto backend
Server side for Instagram-like single page website (Mesto), with authentication, authorization, input validation, DB connection and logging, where a user can edit their profile and change the avatar, as well as add and delete their images. Furthermore, users can like pictures of their own and the other people that are connected to the server.

##Main features:

- Authentication: HASHING passwords before saving to the database
- Validation: Mongoose Joi Celebrate Validator
- Authorization: JSON web token (JWT)
- Centralized error handling
- Error and request logging
- Checking users rights: user is not allowed to delete other users' cards or edit other users' profiles.

## Tech stack:
- Typescript
- Mongodb+Mongoose
- Node.js + Express
- Bcrypt
- Jsonwebtoken
- Winston + express-winston for logging
- Celebrate
- ESLint

## Future plans:

- to connect to frontend
- add tests

