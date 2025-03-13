'use client';

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Add } from "@mui/icons-material";
import {
  Grid, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormControl, InputLabel, MenuItem, Select
} from "@mui/material";
import { ProductModel } from "../../data-models/Product/ProductModel";
import { ProductRequestModel } from "../../data-models/Product/ProductRequestModel";
import { CategoriesContext } from "../../context/categories";
import { createProduct, deleteProductByLabel, getProducts, updateProduct } from "../../api/productsApi";
import ProductItem from "../../components/molecules/ProductItem";
import AtomButton from "../../components/atoms/Button/Button";
import { isValidLabel, labelRegex } from "../../utils/utils";


const ProductsPage = () => {
  const { categories } = useContext(CategoriesContext);

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [productToEdit, setProductToEdit] = useState<ProductModel | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = (product?: ProductModel) => {
    setProductToEdit(product || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const fetchProducts = () => getProducts()
    .then((response) => setProducts(response.data.products))
    .catch(() => toast.error('Error fetching products'));


  const handleCreateProduct = async (product: ProductRequestModel) => {
    const composedLabel = `${product.category}.${product.label}`;

    if (!isValidLabel(composedLabel)) {
      toast.error("Invalid label format. Please adjust your input.");
      return;
    }

    const productPayload: ProductRequestModel = { ...product, label: composedLabel };

    const { status } = await createProduct(productPayload);

    if (status === 201) {
      fetchProducts();
      toast.success("Product successfully created");
    } else {
      toast.error("Error by creating the product");
    }
  };

  const handleUpdateProduct = async (product: ProductRequestModel) => {
    if (!productToEdit) {
      toast.error("No product selected for update");
      return;
    }

    const productPayload: Partial<ProductRequestModel> = {
      name: product.name,
      label: product.label,
      plu: product.plu,
      category: product.category,
    };

    try {
      const { status } = await updateProduct(productToEdit.label, productPayload);

      if (status === 200) {
        fetchProducts();
        toast.success("Product successfully updated");
      } else {
        toast.error("Error updating the product");
      }
    } catch (err) {
      console.error("Unexpected error updating product:", err);
      toast.error("An unexpected error occurred");
    }
  };

  const handleDeleteProduct = async (label: string) => {
    if (window.confirm("Do you really want to delete the product?")) {
      try {
        const { status } = await deleteProductByLabel(label);

        if (status === 200) {
          fetchProducts();
          toast.success("Product successfully deleted!");
        } else {
          toast.error("Error deleting the product");
        }
      } catch (error) {
        console.error("Delete product error:", error);
        toast.error("An unexpected error occurred while deleting the product");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Grid container gap={2} margin='0 auto' maxWidth={"lg"} sx={{ padding: `24px 16px 0` }}>
        <Grid item xs={12}>
          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h5">Products</Typography>
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
                Product
              </Button>
            </div>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {products.map(product => {
              return (
                <Grid item xs={12} md={4} key={product.label}>
                  <ProductItem product={product} onEdit={handleOpenDialog} onDelete={handleDeleteProduct} />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
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
            productToEdit ? handleUpdateProduct(formJson as ProductRequestModel) : handleCreateProduct(formJson as ProductRequestModel);
            handleCloseDialog();
          },
        }}
      >
        <DialogTitle>{productToEdit ? "Edit product" : "Add new Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter new data here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Product name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={productToEdit?.name || null}
          />
          <FormControl fullWidth sx={{
            marrginTop: '20px'
          }}>
            <InputLabel id="select-label">Categories</InputLabel>
            <Select
              labelId="select-label"
              defaultValue={productToEdit?.label.split('.')[0] || ''}
              required
              margin="dense"
              id="category"
              name="category"
              fullWidth
              variant="standard"
            >
              {
                categories.map((category) => <MenuItem value={category.label} key={category.label}>{category.name}</MenuItem>)
              }
            </Select>
          </FormControl>
          <TextField
            autoFocus
            required
            margin="dense"
            id="label"
            name="label"
            label="Product label"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={productToEdit?.label || null}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="plu"
            name="plu"
            label="Product PLU"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={productToEdit?.plu || null}
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

export default ProductsPage;
