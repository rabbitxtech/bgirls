import Joi from 'joi'

const registerSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false }
    }),
  username: Joi.string().trim().min(6).max(12).alphanum().required().messages({
    'string.min': 'Username length must be at least 6 characters long !',
    'string.max':
      'Username length must be less than or equal 12 characters long !'
  }),
  password: Joi.string()
    .trim()
    .min(8)
    .max(15)
    .regex(/[a-z]{1,}/)
    .message('Password must have be at least 1 lowercase letter !')
    .regex(/[\d]{1,}/)
    .message('Password must have be at least 1 number !')
    .regex(/[A-Z]{1,}/)
    .message('Password must have be at least 1 uppercase letter !')
    .regex(/[@$!%*?&]{1,}/)
    .message('Password must have be at least 1 special letter in @$!%*?& !')
    .required()
    .messages({
      'string.empty': 'Password is not allowed to be empty !',
      'string.min': 'Password length must be at least 8 characters long !',
      'string.max':
        'Password length must be less than or equal 15 characters long !'
    }),
  repassword: Joi.string()
    .trim()
    .required()
    .valid(Joi.ref('password'))
    .messages({ 'any.only': 'Confirm password must match password !' })
}).with('password', 'repassword')

const loginSchema = Joi.object({
  username: Joi.string()
    .trim()
    .required()
    .messages({ 'string.empty': 'Username or email is required !' }),
  password: Joi.string()
    .trim()
    .required()
    .messages({ 'string.empty': 'Password is not allowed to be empty !' })
})

export { registerSchema, loginSchema }
