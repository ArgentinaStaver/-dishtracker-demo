import { Links, Meta } from "../common/commonModels";

export interface ProductModel {
  label: string;
  name: string;
  plu: string;
  category: string;
}

export interface PaginatedProductsModel {
  meta: Meta;
  links: Links;
  products: ProductModel[];
}
