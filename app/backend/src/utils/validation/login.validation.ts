import * as Joi from 'joi';
import ILogin from '../../interfaces/ILogin';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginFieldsValidation = (body: ILogin) => {
  const { error } = loginSchema.validate(body);
  if (error) return 'All fields must be filled';
};

export default loginFieldsValidation;
