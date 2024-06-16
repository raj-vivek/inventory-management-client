import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "./Home.scss";

function Home() {
  // const navigate = useNavigate();

  return (
    <div className="home">
      <div className="container">
        <h1>Inventory Management</h1>
        <div className="box">
          <div className="left">
            <h2>Hi! How can I help you taday?</h2>
            <div className="options">
              Products
              <Link to="/addproduct" className="link optionTile">
                <span>Create a new product entry</span>
              </Link>
              <Link to="/product" className="link optionTile">
                <span>View a product</span>
              </Link>
              <Link to="/products" className="link optionTile">
                <span>View all product entries</span>
              </Link>
              Transactions
              <Link to="/transactions" className="link optionTile">
                <span>Transaction report for today</span>
              </Link>
            </div>
          </div>
          <div className="right">
            <h2>Report</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
