import * as Photographer from "../models/Photographer.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await Photographer.getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const create = async (req, res, next) => {
  try {
    const result = await Photographer.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  console.log(req.params);
  try {
    const result = await Photographer.getOne(req.params.photographerId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const replace = async (req, res, next) => {
  try {
    const result = await Photographer.replace(
      req.params.photographerId,
      req.body
    );
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
    const result = await Photo.update(req.params.photographerId, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export const deleteOne = async (req, res, next) => {
  try {
    const result = await Photo.deleteOne(req.params.photographerId);
    if (result.deletedCount > 0) return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
