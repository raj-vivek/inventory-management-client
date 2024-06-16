import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AddTransaction from "./pages/product/Product";
import AddProduct from "./pages/addProduct/AddProduct";
import Products from "./pages/products/Products";
import Transactions from "./pages/transactions/Transactions";
import initialAuthChecks from "./utils/initialAuthChecks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProductSuccess from "./pages/addProductSuccess/AddProductSuccess";
import AddTransactionSuccess from "./pages/addTransactionSuccess/AddTransactionSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/addproductsuccess",
        element: <AddProductSuccess />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product",
        element: <AddTransaction />,
      },
      {
        path: "/addtransactionsuccess",
        element: <AddTransactionSuccess />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
]);

function Layout() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

const queryClient = new QueryClient();

function App() {
  initialAuthChecks();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
