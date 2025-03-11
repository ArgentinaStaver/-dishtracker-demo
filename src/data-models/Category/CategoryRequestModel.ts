import { ProductModel } from "../Product/ProductModel";

export interface CategoryRequestModel {
  label: string;
  parent_category: string | null;
  products?: ProductModel[];
  child_categories?: string[];
  name: string;
}
