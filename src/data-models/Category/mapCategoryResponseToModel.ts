import { PaginatedCategoryModel } from "./CategoryModel";
import { CategoryResponseModel, PaginatedCategoriesResponse } from "./CategoryResponseModel";

const mapCategoryResponseToModel = (category: PaginatedCategoriesResponse): PaginatedCategoryModel => ({
  ...category,
});

export default mapCategoryResponseToModel;
