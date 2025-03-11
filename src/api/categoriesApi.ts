import axios from "axios";
import { CategoryRequestModel } from "../data-models/Category/CategoryRequestModel";
import { CategoryResponse } from "../data-models/Category/CategoryResponseModel";
import mapCategoryResponseToModel from "../data-models/Category/mapCategoryResponseToModel";
import { PaginatedCategoryModel } from "../data-models/Category/CategoryModel";
import { Links, Meta } from "../data-models/common/commonModels";
import { ResponseModel } from "../data-models/ResponseModel";
import { DEFAULT_GATEWAY_CONFIG, headers } from "../config";

const baseURL = DEFAULT_GATEWAY_CONFIG.baseUrl;

export const createCategory = async (
  category: CategoryRequestModel
): Promise<CategoryResponse> => {
  try {
    const { data, status } = await axios.post(`${baseURL}/api/v1/category`, category, {
      headers: headers,
    });

    return { data: mapCategoryResponseToModel(data), status };
  } catch (error) {
    return { status: (error as any).response.status };
  }
};

export const getCategories = async (): Promise<CategoryResponse> => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/category`, { headers: headers });

    const paginatedCategories: PaginatedCategoryModel = {
      meta: response.data.meta,
      links: response.data.links,
      categories: response.data.data.map(mapCategoryResponseToModel),
    };

    return { data: paginatedCategories, status: response.status };
  } catch (error) {
    return {
      data: { meta: {} as Meta, links: {} as Links, categories: [] },
      status: (error as any).response.status,
    };
  }
};

export const updateCategory = async (label: string, category: Partial<CategoryRequestModel>): Promise<CategoryResponse> => {
  try {
    const { data, status } = await axios.put(
      `${baseURL}/api/v1/category/${label}`, category, { headers: headers });

    return { data: mapCategoryResponseToModel(data), status };
  } catch (error) {
    return { status: (error as any).response.status };
  }
};

export const deleteCategoryByLabel = async (label: string): Promise<ResponseModel> => {
  try {
    const { status } = await axios.delete(`${baseURL}/api/v1/category/${label}`, { headers: headers });

    return { status };
  } catch (error) {
    return { status: (error as any).response.status };
  }
}
