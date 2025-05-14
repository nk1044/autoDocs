# Introduction to Express Validator

**express-validator## is a set of express.js middlewares that wraps [docs](https://express-validator.github.io/docs), allowing you to validate and sanitize incoming request data. It helps keep your routes clean and ensures robust data validation for your backend APIs.


# Install express-validator

```bash
npm install express-validator
```


# Create Validators for Routes

##  Register User Validator 

```javascript
import { body } from "express-validator";

export const registerUserValidator = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("phone")
    .notEmpty().withMessage("Phone is required")
    .isMobilePhone("any").withMessage("Invalid phone number"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];
```

## Login User Validator 

```javascript

export const loginUserValidator = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

```


# Using express-validator in Routes

Apply the validators as middleware in your routes before the actual controller logic:

```javascript
import express from "express";
import { registerUserValidator, loginUserValidator } from "./validators.js";
import { RegisterUser, LoginUser } from "./controllers.js";

const router = express.Router();

router.route("/register").post(registerUserValidator, RegisterUser);
router.route("/login").post(loginUserValidator, LoginUser);

export default router;

```

