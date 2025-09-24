import * as Joi from 'joi'


export default Joi.object({
	NODE_ENV: Joi.string()
		.valid('development', 'test', 'production', 'staging')
		.default('development'),
	API_VERSION: Joi.string().required(),
	DATABASE_HOST: Joi.string().default('localhost'),
	DATABASE_PORT: Joi.number().default(5432),
	DATABASE_USER: Joi.string().required(),
	DATABASE_PASSWORD: Joi.string().required(),
	DATABASE_NAME: Joi.string().required(),
	DATABASE_SYNC: Joi.string().default('false'),
	DATABASE_AUTOLOAD: Joi.string().default('false'),
	PROFILE_API_KEY: Joi.string().required(),

	JWT_SECRET: Joi.string().required(),
	JWT_TOKEN_AUDIENCE: Joi.string().required(),
	JWT_TOKEN_ISSUER: Joi.string().required(),
	JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
	JWT_REFRESH_TOKEN_TTL: Joi.number().default(86400),

	SMTP_USERNAME: Joi.string().required(),
	SMTP_PASSWORD: Joi.string().required(),
	MAIL_HOST: Joi.string().required(),
})