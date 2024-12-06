@echo off
mkdir rbac-backend
cd rbac-backend
mkdir src
cd src
mkdir config controllers middlewares models routes utils
type nul > config\db.js
type nul > controllers\authController.js
type nul > controllers\userController.js
type nul > middlewares\authMiddleware.js
type nul > middlewares\rbacMiddleware.js
type nul > models\userModel.js
type nul > routes\authRoutes.js
type nul > routes\userRoutes.js
type nul > utils\jwt.js
type nul > utils\hash.js
type nul > app.js
cd ..
mkdir swagger
type nul > swagger\swagger.json
type nul > .env
type nul > .gitignore
type nul > package.json
type nul > package-lock.json
type nul > README.md
