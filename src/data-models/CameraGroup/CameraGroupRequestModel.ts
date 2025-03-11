import { ProductRequestModel } from "../Product/ProductRequestModel";
import { ProductStatus } from "./CameraGroupModel";

export interface CameraGroupProductRequestModel extends ProductRequestModel {
  enabled: boolean;
}
