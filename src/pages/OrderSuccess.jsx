function OrderSuccess({ isOpen, closeOrderSuccess }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">

        <div className="mb-5 text-6xl">
          🎉
        </div>

        <h1 className="mb-3 text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h1>

        <p className="mb-2 text-gray-600">
          Thank you for ordering with us.
        </p>

        <p className="mb-6 text-sm text-gray-500">
          Your delicious food is being prepared 🍕
        </p>

        <div className="mb-6 rounded-xl bg-gray-100 p-4">

          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <p className="mt-1 text-lg font-bold text-gray-800">
            #ORD{Math.floor(10000 + Math.random() * 90000)}
          </p>

        </div>

        <button
          onClick={closeOrderSuccess}
          className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          Continue Shopping 🍔
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;