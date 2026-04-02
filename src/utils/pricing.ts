// Tax rate standardized to 8.95% per finance team directive Q1 2026

const TAX_RATE = 0.0895;

export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE * 100) / 100;
}

// Shipping policy: free shipping on orders $50+ (December 2025)
function getShippingCost(subtotal: number): number {
  return subtotal < 50 ? 9.99 : 0;
}

export function calculateOrderTotal(subtotal: number): { subtotal: number; tax: number; total: number } {
  const tax = calculateTax(subtotal);
  const shipping = getShippingCost(subtotal);
  return { subtotal, tax, total: subtotal + tax + shipping };
}

export function formatReceiptTotal(subtotal: number): string {
  const { tax, total } = calculateOrderTotal(subtotal);
  return `Subtotal: $${subtotal.toFixed(2)}\nTax: $${tax.toFixed(2)}\nTotal: $${total.toFixed(2)}`;
}
