import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import Post, { TFilter } from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()


app.get('/',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Start Time:", new Date())
    const users = await Post.findAll()
    const response = createResponse("OK", users, undefined)
    console.log("End Time:", new Date())
    res.json(response)
  })
)

app.get('/:id',
  [param('id'), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const deleted = await Post.findByUid(Number(id));
    const response = createResponse("OK", deleted, undefined)
    res.json(response)
  })
)

app.post('/',
  [body('status').isBoolean(),
  body('description').isString(),
  body("title").isString(), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { status, description, title } = req.body
    const newUser = await Post.createNew({ status, description, title })
    const response = createResponse("OK", newUser, undefined)
    console.log("End Time:", new Date())
    res.json(response)
  })
)

app.put('/:id',
  [param('id'),
  body('status').isBoolean(),
  body('description').isString(),
  body("title").isString(), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { status, description, title } = req.body
    const newUser = await Post.updateById(Number(req.params.id), { status, description, title })
    const response = createResponse("OK", newUser, undefined)
    res.json(response)
  })
)

app.delete('/:id',
  [param('id'), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const deleted = await Post.deleteById(Number(id));
    const response = createResponse("OK", "Success", undefined)
    res.json(response)
  })
)

app.use(expressErrorHandler);

export default app

