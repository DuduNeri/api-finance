import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { AppError } from "../errors/app.errors";

export class UserController {
  constructor(private userService: UserService) { }

  async create(req: Request, res: Response) {
    try {
      console.log(Error)
      const newUser = await this.userService.create(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro no controller" })
    }
  }
}