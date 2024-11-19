import Joi from "joi";

// Define validation schemas
const schemas = {
  createProduct: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().max(500),
    imageUrl: Joi.string().uri(),
    stockQuantity: Joi.number().min(0),
    type: Joi.string().valid("stock", "custom").required(),
  }),
  updateProduct: Joi.object({
    name: Joi.string().min(2).max(100),
    price: Joi.number().min(0),
    description: Joi.string().max(500),
    imageUrl: Joi.string().uri(),
    stockQuantity: Joi.number().min(0),
    type: Joi.string().valid("stock", "custom"),
  }),
  createOrder: Joi.object({
    customerId: Joi.string().required(),
    products: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required(),
          quantity: Joi.number().min(1).required(),
        })
      )
      .min(1)
      .required(),
    paymentMethod: Joi.string()
      .valid("card", "bank_transfer", "paypal", "apple_pay")
      .required(),
  }),
  registerCustomer: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
    address: Joi.string().max(200),
  }),
  updateCustomer: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(128),
    address: Joi.string().max(200),
  }),
  createAdmin: Joi.object({
    username: Joi.string().min(3).max(50).required(), // Username is required
    password: Joi.string().min(8).max(128).required(), // Password is required and must meet length constraints
  }),
  adminLogin: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

// Middleware to validate request
export function validateRequest(schemaKey) {
  return (req, res, next) => {
    const schema = schemas[schemaKey];
    if (!schema) {
      return res.status(500).json({ error: "Invalid schema key" });
    }

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}
