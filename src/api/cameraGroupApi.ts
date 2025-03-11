import axios from "axios";
import { DEFAULT_GATEWAY_CONFIG, headers } from "../config";
import { CameraGroupProductResponse } from "../data-models/CameraGroup/CameraGroupResponseModel";
import { CameraGroupModel, PaginatedCameraGroupProductsModel } from "../data-models/CameraGroup/CameraGroupModel";
import mapCameraGroupProductResponseToModel from "../data-models/CameraGroup/mapCameraGroupResponseToModel";
import { Links, Meta } from "../data-models/common/commonModels";
import { CameraGroupProductPayload } from "../data-models/CameraGroup/CameraGroupRequestModel";
import { ResponseModel } from "../data-models/ResponseModel";

const baseURL = DEFAULT_GATEWAY_CONFIG.baseUrl;

export const getCameraGroup = async (
  cameraGroupName: string
): Promise<CameraGroupModel> => {
  try {
    const { data } = await axios.get<CameraGroupModel>(
      `${baseURL}/api/v1/camera-group/${cameraGroupName}`,
      { headers }
    );

    return data;
  } catch (error: any) {
    console.error('Error fetching camera group:', error);
    throw new Error(`Unable to fetch camera group "${cameraGroupName}"`);
  }
};

export const getCameraGroupProducts = async (cameraGroupName: string): Promise<CameraGroupProductResponse> => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/camera-group/${cameraGroupName}/product`, { headers: headers });

    const cameraGroupaginatedProducts: PaginatedCameraGroupProductsModel = {
      meta: response.data.meta,
      links: response.data.links,
      products: response.data.data.map(mapCameraGroupProductResponseToModel),
    };

    return { data: cameraGroupaginatedProducts, status: response.status };
  } catch (error) {
    return {
      data: { meta: {} as Meta, links: {} as Links, products: [] },
      status: (error as any).response?.status,
    };
  }
};


export const updateCameraGroupProduct = async (cameraGroupName: string, products: CameraGroupProductPayload): Promise<ResponseModel> => {
  try {
    const { data, status } = await axios.put(
      `${baseURL}/api/v1/camera-group/${cameraGroupName}/product`, products, { headers: headers });

    return { status };
  } catch (error) {
    return { status: (error as any).response.status };
  }
};
