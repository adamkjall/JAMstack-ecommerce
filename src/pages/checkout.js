import EmbeddedCheckout from "components/embeddedCheckout";

const Checkout = (props) => {
  return (
    <div>
      <h1 className="text-6xl text-red-600">I'm the checkout page</h1>
      <EmbeddedCheckout />
    </div>
  );
};

export default Checkout;
