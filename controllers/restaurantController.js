import * as Restaurant from "../models/Restaurant.js";

export const getAll = async (req, res, next) => {
  try {
    if (req.query.city) {
      const result = await Restaurant.findOnCity(
        req.query.city,
        req.query.capacity
      );
      res.status(200).json(result);
    } else {
      const result = await Restaurant.getAll();
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }

};
export const create = async (req, res, next) => {
  try {
    const result = await Restaurant.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const result = await Restaurant.getOne(req.params.restaurantId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const replace = async (req, res, next) => {
  try {
    const result = await Restaurant.replace(req.params.restaurantId, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export const update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(204).send();
    return;
  }
  try {
    const result = await Restaurant.update(req.params.restaurantId, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export const deleteOne = async (req, res, next) => {
  try {
    const result = await Restaurant.deleteOne(req.params.restaurantId);
    if (result.deletedCount > 0) return res.status(204).send();
    res.status(404).send();
  } catch (error) {
    next(error);
  }
};
