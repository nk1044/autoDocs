#  TypeScript Backend Starter

A lightweight and flexible `TypeScript starter` setup for backend development using Node.js, Express, and common dev tools.


# Project Structure

```
.
├── dist/               # Compiled JavaScript output
├── src/                # Source TypeScript code
│   └── index.ts        # Entry point
├── nodemon.json        # Nodemon config
├── package.json        # NPM config and scripts
├── tsconfig.json       # TypeScript compiler config
└── README.md           # This guide

```


# Prerequisites

* Node.js (v16+ recommended)
* npm or yarn


# Setup

## 1. Initialize the Project 

```bash
mkdir backend
cd backend
```

then run below command

```bash
npm init -y
```

## 2. Install Dev Dependencies 

```bash
npm install -D typescript ts-node ts-node-dev nodemon @types/node @types/express
```

*  `ts-node` is used for running TypeScript files directly.
*  `nodemon` is used for hot-reloading during development.
*  `@types` provide TypeScript type definitions.


# File & Configuration Setup

## 3. `tsconfig.json` 

Create a `tsconfig.json` file to configure TypeScript:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

## 4. `nodemon.json` 

Create a `nodemon.json` to tell Nodemon how to run your app:

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```


## 5. `src/index.ts` 

Create the main entry file:

```ts
// src/index.ts
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("Hello, TypeScript Backend!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```


# package.json Scripts

Update your `scripts` in `package.json`:

```json
"scripts": {
  "dev": "nodemon",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

* `npm run dev` – Start the dev server with hot reload
* `npm run build` – Compile TypeScript to JavaScript
* `npm start` – Run the compiled app from `dist/`

## Run the app 

# Start in development mode:

```bash
npm run dev
```

# Build and run production:

```bash
npm run build
npm start
```


# Optional Improvements

* Add `.env` and use `dotenv` for environment variables
* Add ESLint + Prettier for code quality
* Add `express` and related middlewares


#  Recommended Next Steps

* Setup Express routes and middleware
* Add a database (MongoDB, PostgreSQL, etc.)
* Add validation using libraries like `express-validator` or `zod`

