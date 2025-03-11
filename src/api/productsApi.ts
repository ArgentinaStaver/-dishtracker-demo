import axios from "axios";
import { Links, Meta } from "../data-models/common/commonModels";
import { ResponseModel } from "../data-models/ResponseModel";
import { DEFAULT_GATEWAY_CONFIG, headers } from "../config";
import { ProductRequestModel } from "../data-models/Product/ProductRequestModel";
import { ProductResponse } from "../data-models/Product/ProductResponseModel";
import mapProductResponseToModel from "../data-models/Product/mapProductResponseToModel";
import { PaginatedProductsModel } from "../data-models/Product/ProductModel";

const baseURL = DEFAULT_GATEWAY_CONFIG.baseUrl;

export const createProduct = async (
  product: ProductRequestModel
): Promise<ProductResponse> => {
  try {
    const { data, status } = await axios.post(`${baseURL}/api/v1/product`, product, {
      headers: headers,
    });

    return { data: mapProductResponseToModel(data), status };
  } catch (error) {
    return { status: (error as any).response.status };
  }
};

export const getProducts = async (): Promise<ProductResponse> => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/product`, { headers: headers });

    const paginatedProducts: PaginatedProductsModel = {
      meta: response.data.meta,
      links: response.data.links,
      products: response.data.data.map(mapProductResponseToModel),
    };

    return { data: paginatedProducts, status: response.status };
  } catch (error) {
    return {
      data: { meta: {} as Meta, links: {} as Links, products: [] },
      status: (error as any).response.status,
    };
  }
};

export const updateProduct = async (label: string, product: Partial<ProductRequestModel>): Promise<ProductResponse> => {
  try {
    const { data, status } = await axios.put(
      `${baseURL}/api/v1/product/${label}`, product, { headers: headers });

    return { data: mapProductResponseToModel(data), status };
  } catch (error) {
    return { status: (error as any).response.status };
  }
};

export const deleteProductByLabel = async (label: string): Promise<ResponseModel> => {
  try {
    const { status } = await axios.delete(`${baseURL}/api/v1/product/${label}`, { headers: headers });

    return { status };
  } catch (error) {
    return { status: (error as any).response.status };
  }
}
