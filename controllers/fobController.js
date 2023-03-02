const Fob = require("../models/fob");
const { validationResult } = require("express-validator");
const errorConfig = require("../utils/error.config");

class fobController {
  getBatch = async (req, res) => {
    try {
      const fob = await Fob.find();
      res.status(200).json(fob);
    } catch (e) {
      res.status(404).json(e);
    }
  };
  getFiltered = async (req, res) => {
    try {
      const { value } = req.params;
      let price;
      console.log(value);
      const fobs = await Fob.find();
      const filtered = fobs.find((fob) => {
        if (fob.maxValue) {
          return +value >= +fob.minValue && +value <= +fob.maxValue;
        } else {
          return +value >= +fob.minValue;
        }
      });

      if (filtered.maxValue) {
        price =
          +filtered.additionalFee1 +
          +filtered.additionalFee2 +
          +filtered.additionalFee3 +
          +filtered.additionalFee4;
      } else {
        price =
          (value * +filtered.additionalFee1) / 100 +
          +filtered.additionalFee2 +
          +filtered.additionalFee3 +
          +filtered.additionalFee4;
      }
      res.json({ price });
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
      const newFob = await Fob.create({
        ...req.body,
      });

      res.status(201).json(newFob);
    } catch (e) {}
  };
  deleteOne = async (req, res) => {
    try {
      const _id = req.params._id;
      const deletedFob = await Fob.findById({ _id });
      if (!deletedFob) return res.status(404).json(errorConfig.fobNotFound);
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

      const existed = await Fob.findById({ _id: req.params._id });
      if (!existed) return res.status(404).json(errorConfig.fobNotFound);
      const { additionalFee1, additionalFee2, additionalFee3, additionalFee4 } =
        req.body;

      additionalFee1 && (existed.additionalFee1 = additionalFee1);
      additionalFee2 && (existed.additionalFee2 = additionalFee2);
      additionalFee3 && (existed.additionalFee3 = additionalFee3);
      additionalFee4 && (existed.additionalFee4 = additionalFee4);

      await existed.save();
      res.json((await existed).toObject());
    } catch (e) {
      res.status(404).json(e);
    }
  };
}

module.exports = new fobController();
