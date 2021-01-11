import EmbeddedCheckout from "components/embeddedCheckout";

const Checkout = (props) => {
  return (
    <div>
      <h1 className="text-4xl">I'm the checkout page</h1>
      <EmbeddedCheckout />
      <iframe src="https://e-commerce1.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=e6575f88-18b0-4f13-b366-47dd52c216bd&token=4873a5a306acc131bbd9c4e2bab6f9986c2a2c84465f1dba0e2066d9db385601"></iframe>
    </div>
  );
};

export default Checkout;
