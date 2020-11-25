import { useRouter } from "next/router";

import { CommerceProvider } from "@bigcommerce/storefront-data-hooks";

import Navbar from "components/navbar";
import Footer from "components/footer";

export default function Layout({ children, pageProps }) {
  const { locale = "en-US" } = useRouter();

  return (
    <CommerceProvider locale={locale}>
      <header>{/* <Navbar pages={pages} /> */}</header>
      <main>{children}</main>
      <Footer />
    </CommerceProvider>
  );
}
