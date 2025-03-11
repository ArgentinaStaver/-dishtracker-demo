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
        <Stack alignItems={'center'} justifyContent={'flex-end'} direction={'row'} gap={1}>
          <Typography flexGrow={1} variant="h5">{product.name}</Typography>
          {typeof status !== "undefined" &&
            <Typography flexGrow={1} variant="h5">{status === "active" ? "Active" : "Disabled"}</Typography>
          }
          <Button size="small" onClick={() => onEdit(product)}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(product.label)}>Delete</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProductItem;
