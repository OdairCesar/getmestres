import "reflect-metadata";
import { createConnection, getConnectionManager } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import auth from "./middlaware/auth";
import { configuration } from "./configuration/config";

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(bodyParser.json())

    app.use(auth)

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          )
          if (result instanceof Promise) {
            result.then(d => {
              d && d.status ? res.status(d.status).send(d.massage || d.errors) : res.json(d)
            } )
          } else if (result !== null && result !== undefined) {
            res.json(result)
          }
        }
      )
    })

    // setup express app here e start express server
    app.listen(configuration.port, '0.0.0.0', async () => {
      console.log(`Express server has started on port ${configuration.port}`)

      try {
        await createConnection();
        console.log('Database connected')
      } catch(error){
        if (error.name === "AlreadyHasActiveConnectionError") {
          const existentConn = getConnectionManager().get("default");
          return existentConn;
       }
      }
    })
  })
