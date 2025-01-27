import { Request, Response } from "express";
import { User } from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
    const { limit = 10, page = 1, sort = "createdAt", search = "{}" } = req.query;

    const query = JSON.parse(search as string);
    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
        User.find(query).sort(sort as string).skip(skip).limit(Number(limit)),
        User.countDocuments(query),
    ]);

    res.json({
        total,
        limit: Number(limit),
        page: Number(page),
        sortBy: sort,
        items,
    });
};
