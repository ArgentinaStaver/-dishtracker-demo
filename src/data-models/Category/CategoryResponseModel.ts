import { PaginatedCategoryModel } from "./CategoryModel";
import { ProductResponseModel } from "../Product/ProductResponseModel";
import { ResponseModel } from "../ResponseModel";
import { Links, Meta } from "../common/commonModels";

export interface CategoryResponseModel {
  label: string,
  parent_category: string | null,
  products: ProductResponseModel[],
  child_categories: string[],
  name: string,
}

export interface PaginatedCategoriesResponse {
  meta: Meta;
  links: Links;
  categories: CategoryResponseModel[];
}

export interface CategoryResponse extends ResponseModel {
  data?: PaginatedCategoryModel;
}
