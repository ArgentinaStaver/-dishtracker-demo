'use client';

import { useEffect } from "react";
import { useGateway } from "../../GatewayProvider";
import { gatewayApi } from "../../store";
import { Box, Container, Typography } from "@mui/material";

export default function Page() {
  const { isLoading } = useGateway();
  const skip = isLoading;
  const { useGetWhoAmIQuery, useGetEnabledCameraGroupProductsQuery } = gatewayApi;

  const cameraGroup = process.env.NEXT_PUBLIC_CAMERA_GROUP || "";
  const { data: whoAmI, isLoading: loadingWhoAmI } = useGetWhoAmIQuery(undefined, { skip });
  const { data: enabledProducts, isLoading: loadingEnabled } = useGetEnabledCameraGroupProductsQuery({ cameraGroup }, { skip });

  useEffect(() => {
    if (loadingEnabled === false) {
      const numProducts = enabledProducts?.data.length;
      console.log(`${numProducts} products enabled`);
    }
  }, [loadingEnabled]);

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          User: {loadingWhoAmI ? "Loading..." : JSON.stringify(whoAmI)}
        </Typography>
      </Box>
    </Container>
  );
}
