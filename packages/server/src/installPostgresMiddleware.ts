import { AppContext, InstallMiddleware } from "./types";
import { Express } from "express";

export const installPostgresMiddleware: InstallMiddleware = (app) => {
  const contest: AppContext = app.get("context");
  app.get("/db", (req, res) => {
    res.json({ msg: "db middleware" });
  });
};
