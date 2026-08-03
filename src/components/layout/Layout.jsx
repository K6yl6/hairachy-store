import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import BackToTop from "@/components/common/BackToTop";

function Layout({children}) {

  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />

      <WhatsAppButton />
      <BackToTop />
    </>
  );
}

export default Layout;