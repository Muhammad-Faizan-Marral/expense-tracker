import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      res.status(400).json({ errors: errorMessages });
      return;
    }
    next()
  };
};

export const registerSchema = Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()

})

export const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

// Transaction Validation Schema
export const transactionSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid('INCOME', 'EXPENSE').required(),
  category: Joi.string().valid(
    'FOOD', 'SHOPPING', 'TRAVEL', 'BILLS', 
    'SALARY', 'FREELANCING', 'INVESTMENT', 'OTHER'
  ).required(),
  notes: Joi.string().max(500).allow('', null).optional(),
});