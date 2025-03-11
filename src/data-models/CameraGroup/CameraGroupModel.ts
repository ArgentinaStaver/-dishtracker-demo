import { Links, Meta } from "../common/commonModels";
import { ProductModel } from "../Product/ProductModel";

export type ProductStatus = 'active' | 'disabled' | 'deleted';

export interface CameraGroupModel {
  name: string;
}

export interface CameraGroupProductModel extends ProductModel {
  status: ProductStatus;
}

export interface PaginatedCameraGroupProductsModel {
  meta: Meta;
  links: Links;
  products: CameraGroupProductModel[];
}
