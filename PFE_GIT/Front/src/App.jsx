import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";

import NewProduct from "./pages/NewProduct";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import FavoritePage from "./pages/FavoritePage";
import Contact from "./components/Contact";
import ClientsAdminPage from "./components/ClientsAdminPage";
import DashboardProducts from "./components/DashboardProducts";
import EditProductPage from "./pages/EditProductPage";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <ScrollToTop />

        <Routes>
          <Route index element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}

          {user && <Route path="/cart" element={<CartPage />} />}
          {user && <Route path="/favorite" element={<FavoritePage />} />}
          {user && user.isAdmin && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/product/:id/edit" element={<EditProductPage />} />
            </>
          )}

          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/new-product" element={<NewProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
