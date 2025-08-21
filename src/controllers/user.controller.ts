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
      return res.status(500).json({ error: "Erro interno no servidor" })
    }
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await this.userService.getUserById({ _id: id });
      return res.status(200).json(user)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno no servidor" })
    }
  }

  async deleteUserById(req: Request, res: Response) {
    try {
      const deletedId = await this.userService.deleteUser({ _id: req.params.id });

      return res.status(200).json({
        message: "Usuário deletado com sucesso",
        deletedId,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await this.userService.updateUser(req.params.id, req.body);
      return res.status(200).json(updatedUser);
    } catch (error) {
      if(error instanceof AppError){
        return res.status(error.statusCode).json({ error: error.message })
      }
      return res.status(500).json({ error: "Erro interno no servidor" })
    }
  }
}