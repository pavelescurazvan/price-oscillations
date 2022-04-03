import {Request, Response} from "express";

/**
 * Error Middleware
 * @param err
 * @param _req
 * @param res
 */
export const errorHandler = (err: Error, _req: Request, res: Response) => {
  console.log(err);

  res.status(500).send();
}
