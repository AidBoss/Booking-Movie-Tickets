import mongoose from 'mongoose';
import logger from '../../logs/logger';
import {IAddressResponse, IWard} from '../../dto/address.dto';
import Ward from '../../models/ward.model';

const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

const getAllWard = async (): Promise<IAddressResponse<IWard>> => {
    try {
        const result = await Ward.find().lean<IWard[]>()
        if (result) {
            return {
                status: 200,
                message: "Lây danh sách quận/ huyện thành công",
                data: result as IWard[]
            }
        } else {
            return {
                status: 404,
                message: "Không tìm thấy danh sách quận/huyện"
            }
        }
    } catch (error: any) {
        logger.error('Error get all Ward', error.message);
        return {
            status: 500,
            message: "Lỗi server"
        }
    }
}

const getWardById = async (id: string) => {
    if (!isValidObjectId(id)) {
        return {
            status: 404,
            message: 'ID Không hợp lệ'
        }
    }
    try {
        const result = await Ward.findById(id).lean<IWard>();
        if (result) {
            return {
                status: 200,
                message: 'Lấy thành công',
                data: result,
            };
        } else {
            return {
                status: 404,
                message: 'Không tìm thấy tỉnh/thành phố'
            };
        }
    } catch (error: any) {
        logger.error(`Lỗi khi lấy thông tin tỉnh/thành phố: ${error.message}`);
        return {
            status: 500,
            message: 'Lỗi server'
        };
    }
}

const searchWard = async (searchCriteria: Record<string, any>) => {
    try {
        const result = await Ward.find(searchCriteria).lean<IWard[]>();
        if (result && result.length > 0) {
            return {
                status: 200,
                message: 'Tìm kiếm thành công',
                data: result,
            };
        }
        return {
            status: 404,
            message: 'Không tìm thấy kết quả',
        };
    } catch (error: any) {
        logger.error(`Lỗi khi tìm kiếm tỉnh/thành phố: ${error.message}`);
        return {
            status: 500,
            message: 'Lỗi server',
        };
    }
};
export default {
    getAllWard,
    getWardById,
    searchWard,
}