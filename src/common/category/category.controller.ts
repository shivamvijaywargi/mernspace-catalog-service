import { Handler } from "express";

const create: Handler = (req, res) => {
  res.json("Create category");
};

export default {
  create,
};
