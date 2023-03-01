import * as Event from "../models/Event.js";


export const getAll = async (req, res, next) => {
    try {
        const result = await Event.getAll(req.query.userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    };
};
export const create = async (req, res, next) => {
    try {
        const result = await Event.create({...req.body, user: req.query.userId});
        res.status(201).json(result);
    } catch(error) {
        next(error);
    };
    
};

export const getOne = async (req, res, next) => {
    try {
        const result = await Event.getOne(req.params.eventId);
        res.status(200).json(result);
    } catch(error) {
        next(error);
    };
}
export const replace = async (req, res, next) => {
    try {
        const result = await Event.replace(req.params.eventId, req.body)
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
        const result = await Event.update(req.params.eventId, req.body);
        res.status(201).json(result);
    }catch(error) {
        next(error);
    }; 
};
export const deleteOne = async (req, res, next) => {
    try{
        const result = await Event.deleteOne(req.params.eventId);
        if(result.deletedCount > 0) return res.status(204).send();
    }catch(error) {
        next(error);
    };
}


