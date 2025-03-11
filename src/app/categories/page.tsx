'use client';

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Grid, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { Add } from "@mui/icons-material";
import { createCategory, getCategories } from "../../api/categoriesApi";
import { CategoryModel } from "../../data-models/Category/CategoryModel";
import { CategoryRequestModel } from "../../data-models/Category/CategoryRequestModel";
import CategoryItem from "../../components/molecules/CategoryItem";

const CatgoriesPage = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = (category?: CategoryModel) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateCategory = async (category: CategoryModel
  ) => {
    const categoryPayload: CategoryRequestModel = {
      ...category,
    };

    const { status, data } = await createCategory(categoryPayload);
    console.log(data);
    if (status === 201) {
      fetchCategories();
      toast.success("Category succesfully created");
    } else {
      toast.error("Error by creating the category");
    }
  }

  const fetchCategories = () => getCategories()
    .then((response) => setCategories(response.data.categories))
    .catch(() => toast.error('Error fetching categories'));

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Grid container gap={3} justifyContent={"center"} margin='0 auto' sx={{ padding: `24px 16px 0` }}>
        <Grid item xs={12} md={6}>
          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h4">Categories</Typography>
            <div>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
                sx={{
                  backgroundColor: '#E6D263',
                  color: '#213A89',
                  '&:hover': {
                    backgroundColor: '#213A89',
                    color: '#E6D263',
                  }
                }}
              >
                Category
              </Button>
            </div>
          </Stack>
        </Grid>
        {
          categories.map((category, index) =>
            <Grid item xs={12} md={6} key={index}>
              <CategoryItem
                category={category}
                onEdit={(category) => console.log(category)}
                onDelete={(label) => console.log(label)}
              />
            </Grid>
          )
        }
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            handleCreateCategory(formJson as CategoryModel);
            handleCloseDialog();
          },
        }}
      >
        <DialogTitle>{"Add new Category"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Category name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="label"
            name="label"
            label="Label"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CatgoriesPage;
