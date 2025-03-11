import { useRouter } from "next/navigation";
import { AppBar, Toolbar, IconButton, Typography, Stack, Link } from "@mui/material";


const Header = () => {
  const router = useRouter();

  const navigateTo = (path: string) => router.push(path);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="Go to home"
          sx={{ mr: 4 }}
          onClick={() => navigateTo("/")}
        >
          <Typography variant="h6" color="#FFFFFF">
            DT
          </Typography>
        </IconButton>
        <Stack direction="row" spacing={4}>
          <Link
            component="button"
            underline="none"
            onClick={() => navigateTo("/products")}
          >
            <Typography color="#FFFFFF">
              Products
            </Typography>
          </Link>
          <Link
            component="button"
            underline="none"
            onClick={() => navigateTo("/categories")}
          >
            <Typography color="#FFFFFF">
              Categories
            </Typography>
          </Link>
          <Link
            component="button"
            underline="none"
            onClick={() => navigateTo("/cameragroup")}
          >
            <Typography color="#FFFFFF">
              Camera Group
            </Typography>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
