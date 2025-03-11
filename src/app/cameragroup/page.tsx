'use client';

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Add } from "@mui/icons-material";
import {
  Grid, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormControlLabel, FormGroup, Switch
} from "@mui/material";
import { CategoriesContext } from "../../context/categories";
import { deleteProductByLabel } from "../../api/productsApi";
import ProductItem from "../../components/molecules/ProductItem";
import { CameraGroupModel, CameraGroupProductModel } from "../../data-models/CameraGroup/CameraGroupModel";
import { getCameraGroup, getCameraGroupProducts, updateCameraGroupProduct } from "../../api/cameraGroupApi";
import { DEFAULT_GATEWAY_CONFIG } from "../../config";
import { CameraGroupProductRequestModel } from "../../data-models/CameraGroup/CameraGroupRequestModel";

const camera = DEFAULT_GATEWAY_CONFIG.configName;
// const cameraGroupName = camera || 'default';
const cameraGroupName = 'default';

const CGProductsPage = () => {
  const { categories } = useContext(CategoriesContext);

  const [products, setProducts] = useState<CameraGroupProductModel[]>([]);
  const [productToEdit, setProductToEdit] = useState<CameraGroupProductModel | null>(null);
  const [cameraGroup, setCameraGroup] = useState<CameraGroupModel>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = (product?: CameraGroupProductModel) => {
    setProductToEdit(product || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteProduct = async () => { };

  const fetchCameraGroup = async (): Promise<CameraGroupModel | undefined> => {
    try {
      const cameraGroup = await getCameraGroup(cameraGroupName);
      setCameraGroup(cameraGroup);
    } catch (error) {
      console.error('Error fetching camera group:', error);
      return undefined;
    }
  };

  const fetchCameraGroupProducts = async (): Promise<CameraGroupProductModel[] | undefined> => {
    try {
      const cameraGroupProducts = await getCameraGroupProducts(cameraGroupName);
      console.log(cameraGroupProducts);
      setProducts(cameraGroupProducts.data.products);
    } catch (error) {
      console.error('Error fetching camera group products:', error);
      return undefined;
    }
  };

  const handleUpdateCGProduct = async (status: "on" | "off") => {
    if (!productToEdit) {
      toast.error("No product selected for update");
      return;
    }

    const productPayload: Partial<CameraGroupProductRequestModel> = {
      label: productToEdit.label,
      enabled: status === 'on',
    };

    try {
      const { status } = await updateCameraGroupProduct(cameraGroupName, productPayload);

      if (status === 200) {
        fetchCameraGroupProducts();
        toast.success("Product successfully updated");
      } else {
        toast.error("Error updating the product");
      }
    } catch (err) {
      console.error("Unexpected error updating product:", err);
      toast.error("An unexpected error occurred");
    }
  };

  useEffect(() => {
    fetchCameraGroupProducts();
    fetchCameraGroup();
  }, []);

  return (
    <>
      <Grid container gap={2} margin='0 auto' maxWidth={"lg"} sx={{ padding: `24px 16px 0` }}>
        <Grid item xs={12}>
          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h3">Camera Group: {cameraGroup?.name}</Typography>
            <Typography variant="h3">Products</Typography>
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
                  <ProductItem product={product} status={product?.status} onEdit={() => handleOpenDialog(product)} onDelete={handleDeleteProduct} />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries((formData as any).entries());
        //     handleUpdateCGProduct(formJson.status as any);
        //     handleCloseDialog();
        //   },
        // }}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            // Assuming the switch's checked value is sent as "on" when true
            const statusValue = formData.get("status") ? "on" : "off";
            handleUpdateCGProduct(statusValue as "on" | "off");
            handleCloseDialog();
          },
        }}
      >
        <DialogTitle>{productToEdit ? "Edit product" : "Add new Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update
          </DialogContentText>


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
            disabled={true}
            defaultValue={productToEdit?.label || null}
          />
          <FormGroup>
            <FormControlLabel
              control={<Switch name="status" defaultChecked={productToEdit?.status === "active"} />}
              label="Enabled"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CGProductsPage;
