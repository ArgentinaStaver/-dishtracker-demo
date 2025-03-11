export type GatewayConfig = {
  baseUrl: string;
  bearerToken: string;
  locationId: string;
  configName: string | null;
};

export const DEFAULT_GATEWAY_CONFIG: GatewayConfig = {
  baseUrl: "https://checkout-cloud-proxy-xwjw6zpyiq-ew.a.run.app",
  bearerToken: process.env.NEXT_PUBLIC_RECOGNITION_TOKEN,
  locationId: process.env.NEXT_PUBLIC_RECOGNITION_LOCATION_ID,
  configName: process.env.NEXT_PUBLIC_CAMERA_GROUP,
};

export const headers = {
  "Authorization": `Bearer ${DEFAULT_GATEWAY_CONFIG.bearerToken}`,
  "X-Location-Id": DEFAULT_GATEWAY_CONFIG.locationId,
  "content-type": "application/json",
}
