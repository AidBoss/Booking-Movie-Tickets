import {Request, Response} from "express";
import mongoose from "mongoose";
import categoryServices from "../../services/admin/category.services";
import {ICategoryCreate} from "../../dto/category.dto";

const getAllCategory = async (req: Request, res: Response): Promise<void> => {
    const result = await categoryServices.getAllCategory();

    res.status(result.status).json({message: result.message, data: result.data});
};

const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    const categoryId = req.params.id;
    if (!mongoose.isValidObjectId(categoryId)) {
        res.status(400).json({message: "ID không hợp lệ"});
        return;
    }
    const result = await categoryServices.getCategoryById(categoryId);
    res.status(result.status).json({message: result.message, data: result.data});
};

const createCategory = async (req: Request, res: Response): Promise<void> => {
    const {name, description}: ICategoryCreate = req.body;
    const result = await categoryServices.createCategory({name, description});
    res.status(result.status).json({message: result.message, data: result.data});
};

const updateCategoryById = async (req: Request, res: Response): Promise<void> => {
    const categoryId = req.params.id;
    if (!mongoose.isValidObjectId(categoryId)) {
        res.status(400).json({message: "ID không hợp lệ"});
        return;
    }
    const {name, description}: ICategoryCreate = req.body;
    const result = await categoryServices.updateCategory(categoryId, {name, description});
    res.status(result.status).json({message: result.message, data: result.data});
};

const deleteCategoryById = async (req: Request, res: Response): Promise<void> => {
    const categoryId = req.params.id;
    if (!mongoose.isValidObjectId(categoryId)) {
        res.status(400).json({message: "ID không hợp lệ"});
        return;
    }
    const result = await categoryServices.deleteCategoryById(categoryId);
    res.status(result.status).json({message: result.message});
};

const deleteCategoryAll = async (req: Request, res: Response): Promise<void> => {
    const ids = req.body
    const result = await categoryServices.deleteCategoryAll(ids);
    res.status(result.status).json({message: result.message});
}

const searchCategory = async (req: Request, res: Response) => {
    const {Name} = req.query;
    const searchCriteria: Record<string, any> = {}
    if (Name) {
        searchCriteria.name = {$regex: Name, $options: 'i'};
    }
    if (Object.keys(searchCriteria).length === 0) {
        res.status(400).json({message: 'Bạn cần cung cấp ít nhất một tham số tìm kiếm'});
        return;
    }
    const result = await categoryServices.searchCategory(searchCriteria);
    res.status(result.status).json({message: result.message, data: result.data});

}

export default {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategoryById,
    searchCategory,
    deleteCategoryById,
    deleteCategoryAll
};
