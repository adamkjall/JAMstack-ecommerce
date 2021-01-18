import { useRouter } from "next/router";

import { CommerceProvider } from "@bigcommerce/storefront-data-hooks";

import Navbar from "components/navbar";
import CartSidebar from "components/cart/cartSidebar";
import Footer from "components/footer";

export default function Layout({ children }) {
  const { locale = "en-US" } = useRouter();

  return (
    <CommerceProvider locale={locale}>
      <div className="relative flex flex-col w-screen min-h-full justify-between overflow-x-hidden">
        <header className="shadow-md">
          <div className="max-w-5xl mx-auto px-4">
            <Navbar />
          </div>
        </header>
        <main className="max-w-5xl w-full mx-auto px-4 mb-auto">
          {children}
        </main>

        <CartSidebar />
        <Footer />
      </div>
      {/* CSS to keep page full height */}
      {/* <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div,
        div#__next > div > div {
          height: 100%;
        }
      `}</style> */}
    </CommerceProvider>
  );
}
