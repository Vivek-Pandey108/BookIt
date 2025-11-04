export default function PricePanel({
  price,
  qty,
  onQty,
  taxes = 59,
  onConfirm,
}: {
  price: number;
  qty: number;
  taxes?: number;
  onQty: (n: number) => void;
  onConfirm?: () => void;
}) {
  const subtotal = price * qty;
  const total = subtotal + taxes;

  return (
    <aside className="card sticky top-24 h-fit w-full max-w-sm p-5">
      <div className="space-y-3 text-sm">
        <Row label="Starts at" value={`₹${price}`} />
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Quantity</span>
          <div className="flex items-center gap-2">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-base font-bold text-gray-700 hover:bg-gray-200"
              onClick={() => onQty(Math.max(1, qty - 1))}
            >
              −
            </button>
            <span className="w-6 text-center font-medium text-gray-800">{qty}</span>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-base font-bold text-gray-700 hover:bg-gray-200"
              onClick={() => onQty(qty + 1)}
            >
              +
            </button>
          </div>
        </div>
        <Row label="Subtotal" value={`₹${subtotal}`} />
        <Row label="Taxes" value={`₹${taxes}`} />
        <div className="mt-2 flex items-center justify-between text-base font-semibold text-gray-900">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        {onConfirm && (
          <button
            className="mt-4 w-full rounded-lg bg-brand-yellow py-2.5 text-base font-semibold text-black transition hover:opacity-90"
            onClick={onConfirm}
          >
            Confirm
          </button>
        )}
      </div>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );
}
