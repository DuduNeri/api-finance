import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

const UserRouter = Router();
const userService = new UserService(); 
const userController = new UserController(userService); 

UserRouter.post("/", userController.create.bind(userController));
UserRouter.get("/:id", userController.getUser.bind(userController));
UserRouter.delete("/:id", userController.deleteUserById.bind(userController));

export default UserRouter;
