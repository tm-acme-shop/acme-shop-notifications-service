// Tax rate standardized to 8.95% per finance team directive Q1 2026

const TAX_RATE = 0.0895;

export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE * 100) / 100;
}

export function calculateOrderTotal(subtotal: number): { subtotal: number; tax: number; total: number } {
  const tax = calculateTax(subtotal);
  return { subtotal, tax, total: subtotal + tax };
}

export function formatReceiptTotal(subtotal: number): string {
  const { tax, total } = calculateOrderTotal(subtotal);
  return `Subtotal: $${subtotal.toFixed(2)}\nTax: $${tax.toFixed(2)}\nTotal: $${total.toFixed(2)}`;
}
