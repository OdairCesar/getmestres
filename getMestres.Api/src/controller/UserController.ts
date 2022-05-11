import { Request } from "express";
import { User } from "../entity/User";
import { BaseController } from "./BaseController";
import * as md5 from "md5";
import { sign } from "jsonwebtoken";
import { configuration } from "../configuration/config";
export class UserController extends BaseController<User> {
  constructor() {
    super(User);
  }

  async auth(request: Request) {
    let { email, password } = request.body;
    if (!email || !password) {
      return {
        status: 400,
        message: "Informe o email e sanha para efetuar o login",
      }
    } else {
      let user = await this.repository.findOne({
        email: email,
        password: md5(password),
      })

      if (user) {
        let _payload = {
          uid: user.uid,
          name: user.name,
          photo: user.photo,
          email: user.email,
        }

        return {
          status: "200",
          message: {
            user: _payload,
            token: sign({
                ..._payload,
                tm: new Date().getTime(),
              }, configuration.secretyKey )}
        }
      } else {
        return { status: 404, message: "Email ou senha inválidos" }
      }
    }
  }

  async createUser(request: Request) {
    let { name, photo, email, isRoot, confirmPassword, password } =
      request.body;
    super.isRequired(name, "Informe o nome");
    super.isRequired(photo, "Coloque uma foto");
    super.isRequired(email, "Informe seu e-mail");
    super.isRequired(password, "Informe a senha");
    super.isRequired(confirmPassword, "Confirme a sua senha");

    let _user = new User();
    _user.name = name;
    _user.photo = photo;
    _user.email = email;

    if (password !== confirmPassword) {
      return {
        status: 400,
        errors: ["A senha de confirmação esta diferente"],
      };
    }

    if (password) _user.password = md5(password);

    _user.isRoot = isRoot;

    return super.save(_user);
  }

  async save(request: Request) {
    let _user = <User>request.body;
    super.isRequired(_user.name, "O nome do usuário é obrigario");
    super.isRequired(_user.photo, "A foto do usuário é obrigario");
    super.isRequired(_user.email, "O email do usuário é obrigario");
    return super.save(_user);
  }
}
