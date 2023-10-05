import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import Carousel from "react-material-ui-carousel";
import { getDataID } from "../Service/API";
import Layout from "../components/Layout";
import { ClipLoader } from "react-spinners";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const showData = async () => {
    const response = await getDataID(id);
    setProduct(response?.data);
    setLoading(false);
    console.log("data", product);
  };

  const imageUrl = [product.images];
  console.log("imageurl", imageUrl);

  useEffect(() => {
    showData();
  }, []);

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
      <Container sx={{ mt: 5, mb: 5 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            {imageUrl.map((image, index) => {
              return (
                <>
                <Carousel>
                  {image?.map((element, i) => {
                    return (
                      <>
                        
                            <img src={element} key={i}/>
                        {console.log("imggg", element)}
                      </>
                    );
                  })}
                  </Carousel>
                </>
              );
            })}
          </Grid>
          <Grid item xs={6}>
            <List sx={style} component="nav" aria-label="mailbox folders">
              <ListItem>
                <ListItemText primary={product.title} />
              </ListItem>
              <Divider />
              <ListItem divider>
                <ListItemText
                  primary="Description"
                  secondary={product.description}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Price" secondary={product.price} />
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText
                  primary="Discount Price"
                  secondary={product.discountPercentage}
                />
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary="Rating" secondary={product.rating} />
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary="Stock" secondary={product.stock} />
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary="Brand" secondary={product.brand} />
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary="Category" secondary={product.category} />
              </ListItem>
              <Divider light />
            </List>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              component={Link}
              to={`/cart/${product.id}`}
            >
              <ShoppingCartIcon sx={{ mr: 1 }} /> Add to Cart 
            </Button>
            <Button variant="contained" sx={{ mt: 3, ml: 3 }}>
              <FlashOnIcon sx={{ mr: 1 }} /> Buy Now
            </Button>
          </Grid>
        </Grid>
      </Container>
      </Layout>
    </>
  );
};

export default ProductDetails;
