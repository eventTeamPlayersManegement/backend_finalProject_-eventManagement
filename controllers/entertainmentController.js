import * as Entertainment from "../models/Entertainment.js";


export const getAll = async (req, res, next) => {
    try {
        const result = await Entertainment.getAll();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    };
};
export const create = async (req, res, next) => {
    try {
        const result = await Entertainment.create(req.body);
        res.status(201).json(result);
    } catch(error) {
        next(error);
    };
    
};

export const getOne = async (req, res, next) => {
    try {
        const result = await Entertainment.getOne(req.params.entertainmentId);
        res.status(200).json(result);
    } catch(error) {
        next(error);
    };
}
export const replace = async (req, res, next) => {
    try {
        const result = await Entertainment.replace(req.params.entertainmentId, req.body)
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
        const result = await Entertainment.update(req.params.entertainmentId, req.body);
        res.status(201).json(result);
    }catch(error) {
        next(error);
    }; 
};
export const deleteOne = async (req, res, next) => {
    try{
        const result = await Entertainment.deleteOne(req.params.EntertainmentId);
        if(result.deletedCount > 0) return res.status(204).send();
    }catch(error) {
        next(error);
    };
}


