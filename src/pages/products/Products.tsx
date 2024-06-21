import { useQuery } from "@tanstack/react-query";
import "./Products.scss";
import newAxiosRequest from "../../utils/newAxiosRequest";
import { useState } from "react";
import DisplayProduct from "../../components/displayProduct/DisplayProduct";

function Products() {
  // @ts-ignore
  const [page, setPage] = useState(0);
  // @ts-ignore
  const [size, setSize] = useState(10);

  const { isLoading, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return newAxiosRequest
        .get(`/products?page=${page}&size=${size}`)
        .then((res) => {
          console.log(JSON.stringify(res.data[0]));
          return res.data;
        });
    },
  });

  return (
    <div className="products">
      <div className="container">
        <h2>Products</h2>
        {isLoading ? (
          "Loading"
        ) : error ? (
          "Something went wrong"
        ) : (
          <div className="products">
            {data &&
              data.map((product, index) => (
                <div className="product">
                  <h3>{index + 1}</h3>
                  <DisplayProduct product={product} key={index} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
