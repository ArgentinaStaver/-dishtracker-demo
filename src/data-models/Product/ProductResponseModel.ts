import { Meta, Links } from "../common/commonModels";
import { ResponseModel } from "../ResponseModel";

export interface ProductResponseModel {
  label: string;
  name: string;
  plu: string;
  category: string;
}

export interface ProductResponseModel {
  meta: Meta;
  links: Links;
  products: ProductResponseModel[];
}

export interface ProductResponse extends ResponseModel {
  data?: ProductResponseModel;
}
