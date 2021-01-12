import { useRouter } from "next/router";

import { CommerceProvider } from "@bigcommerce/storefront-data-hooks";

import Navbar from "components/navbar";
import CartSidebar from "components/cart/cartSidebar";
import Footer from "components/footer";

export default function Layout({ children }) {
  const { locale = "en-US" } = useRouter();

  return (
    <CommerceProvider locale={locale}>
      <div className="relative flex flex-col h-screen w-screen justify-between overflow-x-hidden">
        <header className="shadow-md">
          <div className="max-w-5xl mx-auto px-4">
            <Navbar />
          </div>
        </header>
        <main className="max-w-5xl w-full h-full mx-auto px-4 mb-auto">
          {children}
        </main>

        <CartSidebar />
        <Footer />
      </div>
    </CommerceProvider>
  );
}
