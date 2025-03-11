"use client";

import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { ProductModel } from "../../data-models/Product/ProductModel";

interface IProductItem {
  product: ProductModel;
  onEdit: (product: ProductModel) => void;
  onDelete: (label: string) => void;
}

const ProductItem = ({ product, onEdit, onDelete }: IProductItem) => {

  return (
    <Card elevation={3}>
      <CardContent>
        <Stack alignItems={'center'} justifyContent={'flex-end'} direction={'row'} gap={1}>
          <Typography flexGrow={1} variant="h5">{product.name}</Typography>
          <Button size="small" onClick={() => onEdit(product)}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(product.label)}>Delete</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProductItem;
