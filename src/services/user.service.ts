import {
  IUser,
  IUserCreate,
  IUserUpdate,
  IUserResponse,
  IUserDelete,
  IUserFilter,
  IUserFilterResponse,
  IGetUser
}
  from "../interfaces/user.interface";
import mongoose from "mongoose";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { AppError } from "../errors/app.errors";

export class UserService {
  async create(user: IUserCreate): Promise<IUserResponse> {
    if (!user.name || !user.email || !user.password) {
      throw new AppError(401, "Nome, email e senha são obrigatórios")
    }

    const existUser = await UserModel.findOne({ email: user.email })
    if (existUser) {
      throw new AppError(400, "Este email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = new UserModel({
      ...user,
      password: hashedPassword
    })
    await newUser.save();
    const { password, ...userWithoutPassword } = newUser.toObject();
    return {
      ...userWithoutPassword,
      _id: newUser._id.toString(),
    };
  }

  async getUserById(data: IGetUser): Promise<IUserResponse> {
    if (!mongoose.Types.ObjectId.isValid(data._id)) {
      throw new AppError(400, "ID inválido");
    }
    const user = await UserModel.findById(data._id);
    if (!user) {
      throw new AppError(404, "Usuário não encontrado");
    }
    const { password, ...userWithoutPassword } = user.toObject();
    return {
      ...userWithoutPassword,
      _id: user._id.toString(),
    };
  }

  async deleteUser(data: IUserDelete): Promise<string> {
    if (!mongoose.Types.ObjectId.isValid(data._id)) {
      throw new AppError(400, "ID inválido");
    }

    const user = await UserModel.findByIdAndDelete(data._id);
    if (!user) {
      throw new AppError(404, "Usuário não encontrado");
    }

    return user._id.toString();
  }
}