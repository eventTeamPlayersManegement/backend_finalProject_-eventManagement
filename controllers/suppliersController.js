import * as Photographer from "../models/Photographer.js";
import * as Restaurant from "../models/Restaurant.js";
import * as Rentauto from "../models/Rentauto.js";
import * as Entertainment from "../models/Entertainment.js";

export const getRandom = async (req, res, next) => {
  const random = (num) => {
    return Math.floor(Math.random() * num);
  };
  try {
    let suppliersArr = [];
    const resultRes = await Restaurant.getAll();

    if (resultRes.length) {
      suppliersArr = [
        ...suppliersArr,
        ...resultRes[random(resultRes.length)].fotos,
      ];
    }
    const resultPhoto = await Photographer.getAll();
    if (resultPhoto.length) {
      suppliersArr = [
        ...suppliersArr,
        ...resultPhoto[random(resultPhoto.length)].fotos,
      ];
    }
    const resultAuto = await Rentauto.getAll();
    if (resultAuto.length) {
      suppliersArr = [
        ...suppliersArr,
        ...resultAuto[random(resultAuto.length)].fotos,
      ];
    }
    const resultEnt = await Entertainment.getAll();
    if (resultEnt.length) {
      suppliersArr = [
        ...suppliersArr,
        ...resultEnt[random(resultEnt.length)].fotos,
      ];
    }
    res.status(200).json(suppliersArr);
  } catch (error) {
    next(error);
  }
};
