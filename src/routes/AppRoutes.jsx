import Checkout from "@/pages/Checkout";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import ProductDetails from "@/pages/ProductDetails";
import PaymentCallback from "@/pages/PaymentCallback";


function AppRoutes() {

  return (
    <Routes>

<Route path="/contact" element={<Contact />} />

      <Route 
        path="/" 
        element={<Home />} 
      />

      <Route
  path="/checkout"
  element={<Checkout />}
/>

      <Route
  path="/product/:id"
  element={<ProductDetails />}
      />
      <Route path="/" element={<Home />} />
<Route path="/shop" element={<Shop />} />
<Route path="/product/:id" element={<ProductDetails />} />
<Route path="/contact" element={<Contact />} />
<Route path="/checkout" element={<Checkout />} />

      <Route 
        path="/shop" 
        element={<Shop />} 
      />
<Route
  path="/payment/callback"
  element={<PaymentCallback />}
/>
      <Route 
        path="/contact" 
        element={<Contact />} 
      />

      <Route 
        path="*" 
        element={<NotFound />} 
        
      />

    </Routes>

    
  );
  
}


export default AppRoutes;