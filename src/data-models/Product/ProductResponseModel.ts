import { Meta, Links } from "../common/commonModels";
import { ResponseModel } from "../ResponseModel";

export interface ProductResponseModel {
  label: string;
  name: string;
  plu: string;
  category: string;
}

export interface PaginatedProductResponseModel {
  meta: Meta;
  links: Links;
  products: ProductResponseModel[];
}

export interface ProductResponse extends ResponseModel {
  data?: PaginatedProductResponseModel;
}
