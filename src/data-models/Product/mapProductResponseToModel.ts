import { PaginatedProductsModel } from "./ProductModel";
import { PaginatedProductResponseModel } from "./ProductResponseModel";

const mapProductResponseToModel = (product: PaginatedProductResponseModel): PaginatedProductsModel => ({
  ...product,
});

export default mapProductResponseToModel;
