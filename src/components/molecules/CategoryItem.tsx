"use client";

import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { CategoryModel } from "../../data-models/Category/CategoryModel";

interface ICategooryItem {
  category: CategoryModel;
  onEdit: (category: CategoryModel) => void;
  onDelete: (label: string) => void;
}

const CategoryItem = ({ category, onEdit, onDelete }: ICategooryItem) => {

  return (
    <Card elevation={3}>
      <CardContent>
        <Stack alignItems={'center'} justifyContent={'flex-end'} direction={'row'} gap={1}>
          <Typography flexGrow={1} variant="h5">{category.name}</Typography>
          <Button size="small" onClick={() => onEdit(category)}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(category.label)}>Delete</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CategoryItem;
