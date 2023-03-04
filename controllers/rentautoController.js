import * as Rentauto from "../models/Rentauto.js";


export const getAll = async (req, res, next) => {
    try {
        const result = await Rentauto.getAll();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    };
};
export const create = async (req, res, next) => {
    try {
        const result = await Rentauto.create(req.body);
        res.status(201).json(result);
    } catch(error) {
        next(error);
    };
    
};

export const getOne = async (req, res, next) => {
    try {
        const result = await Rentauto.getOne(req.params.rentautoId);
        res.status(200).json(result);
    } catch(error) {
        next(error);
    };
}
export const replace = async (req, res, next) => {
    try {
        const result = await Rentauto.replace(req.params.rentautoId, req.body)
        res.status(201).json(result);
    }catch(error) {
        next(error);
    };
};
export const update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        res.status(204).send()
        return
    }
    try {
        const result = await Rentauto.update(req.params.rentautoId, req.body);
        res.status(201).json(result);
    }catch(error) {
        next(error);
    }; 
};
export const deleteOne = async (req, res, next) => {
    try{
        const result = await Rentauto.deleteOne(req.params.rentautoId);
        if(result.deletedCount > 0) return res.status(204).send();
    }catch(error) {
        next(error);
    };
}


