import { error } from "console";
import { Router } from "express";

const testRoute = Router();

testRoute.get("/", (req, res) => {
  res.send("Test Route");
});

export default testRoute;