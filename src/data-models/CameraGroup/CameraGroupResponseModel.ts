import { Links, Meta } from "../common/commonModels";
import { ProductResponseModel } from "../Product/ProductResponseModel";
import { ResponseModel } from "../ResponseModel";
import { CameraGroupProductModel } from "./CameraGroupModel";

export interface CameraGroupProductResponseModel extends ProductResponseModel {
  enabled: boolean;
}

export interface PaginatedCameraGroupProductResponseModel {
  meta: Meta;
  links: Links;
  products: CameraGroupProductModel[];
}

export interface CameraGroupProductResponse extends ResponseModel {
  data?: PaginatedCameraGroupProductResponseModel;
}
