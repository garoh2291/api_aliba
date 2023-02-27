const Port = require("../models/port");
const { validationResult } = require("express-validator");
const errorConfig = require("../utils/error.config");

class portController {
  getbatch = async (req, res) => {
    try {
      const ports = await Port.find();

      res.status(200).json(ports);
    } catch (e) {
      res.status(404).json(e);
    }
  };

  create = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation error",
          error: errors.errors[0].msg,
        });
      }
      const { port, deliveryPrice } = req.body;

      const newPort = await Port.create({
        port,
        deliveryPrice,
      });
      res.status(201).json(newPort);
    } catch (e) {
      res.status(404).json(e);
    }
  };

  deleteOne = async (req, res) => {
    try {
      const _id = req.params._id;
      const deletedPort = await Port.findById({ _id });
      if (!deletedPort) return res.status(404).json(errorConfig.portNotFound);
      res.json({ success: true });
    } catch (e) {
      res.status(404).json(e);
    }
  };

  updateOne = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation error",
          error: errors.errors[0].msg,
        });
      }

      const existed = await Port.findById({ _id: req.params._id });
      if (!existed) return res.status(404).json(errorConfig.portNotFound);

      const { port, deliveryPrice } = req.body;

      port && (existed.port = port);
      deliveryPrice && (existed.deliveryPrice = deliveryPrice);

      await existed.save();
      res.json((await existed).toObject());
    } catch (e) {
      res.status(404).json(e);
    }
  };
}

module.exports = new portController();
