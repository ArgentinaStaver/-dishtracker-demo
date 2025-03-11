import { ProductRequestModel } from "../Product/ProductRequestModel";

export interface CameraGroupProductRequestModel extends ProductRequestModel {
  enabled: boolean;
}

export interface CameraGroupProductPayload {
  products: Partial<CameraGroupProductRequestModel>[];
}
