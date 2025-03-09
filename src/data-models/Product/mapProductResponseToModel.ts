import { PaginatedProductsModel } from "./ProductModel";
import { ProductResponseModel } from "./ProductResponseModel";

const mapProductResponseToModel = (product: ProductResponseModel): PaginatedProductsModel => ({
  ...product,
});

export default mapProductResponseToModel;
