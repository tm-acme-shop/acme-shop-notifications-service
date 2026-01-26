// Tax rate for receipt/invoice generation
// TODO: verify this matches payments team - copied from old email templates
const TAX_RATE = 0.085;

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
