const {Router}  = require('express')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
const config    = require('config')
const {check, validationResult} = require('express-validator')
const User      = require('../models/User')
const router    = Router()

router.post(
    '/register', 
    [
        check('email', 'Некоректный E-Mail').normalizeEmail().isEmail(),
        check('password', 'Пароль не верный')
            .isLength({ min: 6})
    ],
    async (req, res) => {
        try{
            console.log(req.body)
            const err = validationResult(req)
            if(!err.isEmpty()){
                return res.status(400).json({
                    errors: err.array(),
                    message: 'Не удалось зарегистрировать пользователя'
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({ email })
            if(candidate){
                return res.status(400).json({
                    message: 'Такой пользователь уже зарегистрирован'
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email, 
                password: hashedPassword
            })

            await user.save()

            res.status(201).json({
                message: 'Пользователь создан'
            })

        } catch (e) {
            res.status(500).json({
                message: 'Ошибка авторизации'
            })
        }
})

router.post(
    '/login', 
    [
        check('email', 'Некоректный E-Mail').normalizeEmail().isEmail(),
        check('password', 'Пароль не верный')
            .isLength({ min: 6})
    ],
    async (req, res) => {
        try{
            const err = validationResult(req)
            if(!err.isEmpty()){
                return res.status(400).json({
                    errors: err.array(),
                    message: 'Не удалось проверить данные'
                })
            }
            
            const {email, password} = req.body
            console.log(req.body)
            const user = await User.findOne({ email })
            if(!user){
                return res.status(400).json({
                    message: 'Такого пользователя нет!'
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({
                    message: 'Пароль не верный!'
                })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            
            res.json({
                token,
                userId: user.id
            })

        } catch (e) {
            res.status(500).json({
                message: 'Ошибка авторизации'
            })
        }
})

module.exports = router