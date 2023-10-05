import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { getData } from "../Service/API";
import Layout from "../components/Layout";
import { Divider, List, ListItem } from "@mui/material";
import { useAuth } from "../context/Auth";
import Modal from "@mui/material/Modal";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [auth] = useAuth();

  const showData = async () => {
    const response = await getData();
    const res = response?.data?.products;
    setProduct(res);
    const productCategory = res.map((item) => item.category);
    const uniquCategory = [...new Set(productCategory)];
    setCategories(uniquCategory);
    console.log(productCategory);
    setLoading(false);
    // console.log("data", response);
  };

  const showCat = () => {};

  useEffect(() => {
    showData();
  }, []);
  useEffect(() => {
    showCat();
  }, []);

  const dataPerRow = 6;
  const [loadMoreData, setLoadMoreData] = useState(dataPerRow);
  const handleMoreData = () => {
    setLoadMoreData(loadMoreData + dataPerRow);
  };
  return (
    <>
      <Layout>
        {loading ? (
          <ClipLoader
            color="#36d7b7"
            size={100}
            cssOverride={{ marginLeft: "700px", marginTop: "200px" }}
          />
        ) : (
          showData
        )}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={2}>
            <List component="nav">
              <h3 style={{ textAlign: "center" }}>Category</h3>
              {categories.map((element) => {
                return (
                  <>
                    <ListItem>
                      <Link
                        color="inherit"
                        component={Link}
                        to={`/showdetails/${element}`}
                        sx={{ ml: 13 }}
                      >
                        {element.charAt(0).toUpperCase() +
                          element.substr(1).toLowerCase()}
                      </Link>
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={10}>
            <Container sx={{ mt: 5, mb: 5 }}>
              <Grid
                container
                rowSpacing={4}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {product.length > 0 &&
                  product.slice(0, loadMoreData).map((element, index) => {
                    return (
                      <>
                        <Grid item xs={4}>
                          <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                              sx={{ height: 140 }}
                              image={element.thumbnail}
                              title="green iguana"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {element.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {element.description}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              {!auth.user ? (
                                <>
                                
                                  <Button
                                    size="small"
                                    component={Link}
                                    to={`/login`}
                                  >
                                    Product Details
                                  </Button>
                                  
                                </>
                              ) : (
                                <Button
                                  size="small"
                                  component={Link}
                                  to={`/productdetails/${element.id}`}
                                >
                                  Product Details
                                </Button>
                              )}
                            </CardActions>
                          </Card>
                        </Grid>
                      </>
                    );
                  })}
              </Grid>
              {loadMoreData < product.length && (
                <Button
                  variant="contained"
                  onClick={handleMoreData}
                  sx={{ mt: 3 }}
                >
                  Lode More
                </Button>
              )}
            </Container>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Home;
