import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Layout from "../components/Layout";
import { getData } from "../Service/API";
import { ClipLoader } from "react-spinners";

const ShowDetails = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  console.log("cat", category);

  const showdata = async () => {
    const response = await getData();
    setProduct(response?.data?.products);
    setLoading(false);
  };
  console.log("data", product);

  useEffect(() => {
    showdata();
  }, []);

  const dataPerRow = 3;
  const [loadMoreData, setLoadMoreData] = useState(dataPerRow);
  const handleMoreData = () => {
    setLoadMoreData(loadMoreData + dataPerRow);
  };

  const categoryData = product.filter((obj) => obj.category === category);

  console.log("category", categoryData);
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
          showdata
        )}
      <Container sx={{ mt: 5, mb: 5 }}>
        <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {categoryData.length > 0 &&
            categoryData.slice(0, loadMoreData).map((element, index) => {
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
                        <Typography gutterBottom variant="h5" component="div">
                          {element.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {element.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          component={Link}
                          to={`/productdetails/${element.id}`}
                        >
                          Product Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              );
            })}
        </Grid>
        {loadMoreData < category.length && (
          <Button variant="contained" onClick={handleMoreData} sx={{ mt: 3 }}>
            Lode More
          </Button>
        )}
      </Container>
      </Layout>
    </>
  );
};

export default ShowDetails;
