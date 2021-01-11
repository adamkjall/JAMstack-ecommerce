import EmbeddedCheckout from "components/embeddedCheckout";

const Checkout = (props) => {
  return (
    <div>
      <h1 className="text-4xl">I'm the checkout page</h1>
      <EmbeddedCheckout />
    </div>
  );
};

export default Checkout;
