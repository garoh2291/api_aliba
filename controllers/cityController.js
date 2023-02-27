const City = require("../models/city");
const { validationResult } = require("express-validator");
const errorConfig = require("../utils/error.config");

class cityController {
  getBash = async (req, res) => {
    try {
      const { query } = req;
      const dbquery = {};

      if (query.search) {
        const searchReg = new RegExp(query.search, "ig");
        dbquery.$or = [{ city: searchReg }];
      }

      const cities = await City.find(dbquery).populate("activeport");

      res.status(200).json(cities);
    } catch (e) {
      res.status(404).json(e);
    }
  };

  getBashPublic = async (req, res) => {
    try {
      const cities = await City.find().populate("activeport");
      const filtered = cities.map((city) => {
        return {
          _id: city._id,
          city: `${city.state}, ${city.city}`,
          price: +city.deliveryprice + +city.activeport.deliveryPrice,
        };
      });

      res.status(200).json(filtered);
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

      const { city, state, activeport, deliveryprice } = req.body;

      const existed = await City.findOne({ city });

      if (existed) {
        return res.status(404).json(errorConfig.cityExists);
      }

      const newCity = await City.create({
        city,
        state,
        deliveryprice,
        activeport,
      });

      const createdCity = await City.findById(newCity._id).populate(
        "activeport"
      );

      res.status(201).json(createdCity);
    } catch (e) {
      res.status(404).json(e);
    }
  };

  deleteOne = async (req, res) => {
    try {
      const _id = req.params._id;

      const deletedGame = await City.findByIdAndDelete({ _id: req.params._id });
      if (!deletedGame) return res.status(404).json(errorConfig.cityNotFound);
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

      const existed = await City.findById({
        _id: req.params._id,
      });

      if (!existed) {
        return res.status(404).json(errorConfig.cityNotFound);
      }

      const { city, state, activeport, deliveryprice } = req.body;

      city && (existed.games = city);
      state && (existed.state = state);
      activeport && (existed.activeport = activeport);
      deliveryprice && (existed.deliveryprice = deliveryPrice);

      await existed.save();
      res.json((await existed.populate("activeport")).toObject());
    } catch (e) {
      res.status(404).json(e);
    }
  };
}

module.exports = new cityController();
