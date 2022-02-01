export async function sendSmsLegacy(to: string, message: string): Promise<void> {
  console.log("Sending SMS via legacy provider");
  console.log("SMS recipient:", to);
  console.log("SMS message length:", message.length);

  // Simulated SMS sending - in production this would call Twilio or similar
  try {
    // Direct SMS provider call
    await simulateSmsProvider(to, message);
    console.log("SMS sent successfully to", to);
  } catch (error) {
    console.error("Failed to send SMS:", error);
    throw error;
  }
}

async function simulateSmsProvider(to: string, message: string): Promise<void> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 100));
  console.log("SMS provider responded for", to);
}
