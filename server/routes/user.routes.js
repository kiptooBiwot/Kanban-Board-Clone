const router = require('express').Router()
const userControllers = require('../controllers/user.controllers')

router.get('/', userControllers.getAllUsers)
router.get('/:id', userControllers.getOneUser)
// router.post('/register',)
// router.login('/login',)
// router.put('/edit/:id',)
// router.delete('/delete/:id',)

module.exports = router