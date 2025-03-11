import { CameraGroupProductModel } from "./CameraGroupModel";
import { CameraGroupProductResponseModel } from "./CameraGroupResponseModel";

const mapCameraGroupProductResponseToModel = (product: CameraGroupProductResponseModel): CameraGroupProductModel => ({
  ...product,
  status: product.enabled ? 'active' : 'disabled',
});

export default mapCameraGroupProductResponseToModel;
