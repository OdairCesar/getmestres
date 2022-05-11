import { Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { configuration } from "../configuration/config" 

export default async (req: Request, res: Response, next: Function) => {

  let token = req.body.token || req.query.token || req.headers['x-token-access']

  if(token){
    try{
      let _userAuth = verify(token, configuration.secretyKey)
      req.userAuth = _userAuth
      next()
    }
    catch (errors){
      res.status(401).send({
        message: "Token informado é invalido"
      })
      return
    }
  }else{
    res.status(401).send({ message: "Para acessar esse recurso você precisa estar autenticado" })
    return
  }
}