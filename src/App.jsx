import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "@/context/CartContext";
import ScrollToTop from "@/components/common/ScrollToTop";
import Layout from "@/components/layout/Layout";
import AppRoutes from "@/routes/AppRoutes";


function App() {

  return (

    <BrowserRouter>

      <ScrollToTop />

      <CartProvider>

        <Layout>

          <AppRoutes />

        </Layout>

      </CartProvider>

    </BrowserRouter>

  );

}


export default App;