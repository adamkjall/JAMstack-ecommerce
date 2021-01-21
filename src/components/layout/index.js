import { useRouter } from "next/router";

import { CommerceProvider } from "@bigcommerce/storefront-data-hooks";

import Navbar from "components/navbar";
import CartSidebar from "components/cart/cartSidebar";
import Footer from "components/footer";

export default function Layout({ children }) {
  const { locale = "en-US" } = useRouter();

  return (
    <CommerceProvider locale={locale}>
      <div className="relative flex flex-col min-h-full justify-between overflow-x-hidden">
        <Navbar />

        <main
          className="w-full mx-auto mb-auto"
          style={{ marginTop: "71.42px" }}
        >
          {children}
        </main>

        <CartSidebar />
        <Footer />
      </div>
    </CommerceProvider>
  );
}
