"use client";

import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { ProductModel } from "../../data-models/Product/ProductModel";
import { ProductStatus } from "../../data-models/CameraGroup/CameraGroupModel";

interface IProductItem {
  product: ProductModel;
  status?: ProductStatus;
  onEdit: (product: ProductModel) => void;
  onDelete: (label: string) => void;
}

const ProductItem = ({ product, status, onEdit, onDelete }: IProductItem) => {

  return (
    <Card elevation={3}>
      <CardContent>
        <Stack direction="row" alignItems="center">
          <Stack direction="column" spacing={1} flexGrow={1}>
            <Typography variant="h5">{product.name}</Typography>
            {typeof status !== "undefined" && (
              <Typography sx={{ fontSize: '14px' }}>
                {status === "active" ? "Active" : "Disabled"}
              </Typography>
            )}
          </Stack>
          <Button size="small" onClick={() => onEdit(product)}>
            Edit
          </Button>
          {
            typeof status === "undefined" && (
              <Button size="small" color="error" onClick={() => onDelete(product.label)}>
                Delete
              </Button>
            )
          }
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProductItem;
