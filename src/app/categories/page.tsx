'use client';

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Grid, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { Add } from "@mui/icons-material";
import { createCategory, deleteCategoryByLabel, updateCategory } from "../../api/categoriesApi";
import { CategoryModel } from "../../data-models/Category/CategoryModel";
import { CategoryRequestModel } from "../../data-models/Category/CategoryRequestModel";
import CategoryItem from "../../components/molecules/CategoryItem";
import AtomButton from "../../components/atoms/Button/Button";
import { CategoriesContext } from "../../context/categories";
import { isValidLabel } from "../../utils/utils";

const CatgoriesPage = () => {
  const { categories, refetchCategories } = useContext(CategoriesContext);

  const [categoryToEdit, setCategoryToEdit] = useState<CategoryModel | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = (category?: CategoryModel) => {
    setCategoryToEdit(category || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateCategory = async (category: CategoryModel) => {
    if (!isValidLabel(category.label)) {
      toast.error("Invalid label format. Please adjust your input.");
      return;
    }

    const categoryPayload: CategoryRequestModel = { ...category };

    const { status } = await createCategory(categoryPayload);

    if (status === 201) {
      refetchCategories();
      toast.success("Category successfully created");
    } else {
      toast.error("Error by creating the category");
    }
  }

  const handleUpdateCategory = async (category: CategoryModel) => {
    if (!categoryToEdit) return;

    const categoryPayload: Partial<CategoryRequestModel> = {
      name: category.name,
      label: categoryToEdit.label,
    };

    const { status } = await updateCategory(categoryToEdit.label, categoryPayload);

    if (status === 200) {
      refetchCategories();
      toast.success("Category successfully updated");
    } else {
      toast.error("Error by updating the category");
    }
  }

  const handleDeleteCategory = async (label: string) => {
    if (window.confirm("Do you really want to delete the category?")) {
      try {
        const { status } = await deleteCategoryByLabel(label);

        if (status === 200) {
          refetchCategories();
          toast.success("Category successfully deleted!");
        } else if (status === 400) {
          toast.error("Category is in use and can't be deleted");
        } else {
          toast.error("Error deleting the category");
        }
      } catch (error) {
        console.error("Delete category error:", error);
        toast.error("An unexpected error occurred while deleting the category");
      }
    }
  }

  useEffect(() => {
    refetchCategories();
  }, []);

  return (
    <>
      <Grid container gap={3} justifyContent={"center"} margin='0 auto' sx={{ padding: `24px 16px 0` }}>
        <Grid item xs={12} md={6}>
          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h5">Categories</Typography>
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
                onEdit={(category) => handleOpenDialog(category)}
                onDelete={(label) => handleDeleteCategory(label)}
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

            categoryToEdit ? handleUpdateCategory(formJson as CategoryModel) : handleCreateCategory(formJson as CategoryModel);

            handleCloseDialog();
          },
        }}
      >
        <DialogTitle>{categoryToEdit ? "Edit category" : "Add new Category"}</DialogTitle>
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
            defaultValue={categoryToEdit?.name || null}
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
            disabled={!!categoryToEdit}
            defaultValue={categoryToEdit?.label || null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <AtomButton type="submit" color="success" label="Save" />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CatgoriesPage;
