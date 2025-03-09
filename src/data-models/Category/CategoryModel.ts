import { ProductModel } from "../Product/ProductModel";
import { Meta, Links } from "../common/commonModels";

export interface CategoryModel {
  label: string;
  parent_category: string | null;
  products: ProductModel[];
  child_categories: string[];
  name: string;
}

export interface PaginatedCategoryModel {
  meta: Meta;
  links: Links;
  categories: CategoryModel[];
}
