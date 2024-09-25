/**
 * Temporary debug utilities for email delivery investigation.
 * 
 * TODO(TEAM-PLAT): REMOVE THIS FILE after INC-4600 is resolved
 * Added during incident investigation for email delivery failures.
 * 
 * Ticket: PLAT-666
 * Owner: notifications-team
 * Deadline: 2024-11-01
 */

// TODO(TEAM-SEC): Remove - logs may contain PII
export function debugEmailPayload(to: string, subject: string, body: string): void {
  // WARNING: Using console.log instead of structured logger - temporary only
  console.log("=== DEBUG EMAIL PAYLOAD ===");
  console.log("Recipient:", to);
  console.log("Subject:", subject);
  console.log("Body length:", body.length);
  console.log("Timestamp:", new Date().toISOString());
  // TODO(TEAM-SEC): This could log PII - remove after debugging
  console.log("Body preview:", body.substring(0, 100));
  console.log("===========================");
}

// TODO(TEAM-PLAT): Replace with structured logging
export function debugSMTPConnection(host: string, port: number, user: string): void {
  console.log(`SMTP Debug: Connecting to ${host}:${port} as ${user}`);
  // TODO(TEAM-SEC): Remove credential logging
  console.log(`Connection timestamp: ${Date.now()}`);
}

// TODO(TEAM-SEC): CRITICAL - Remove password logging
export function debugAuthAttempt(email: string, success: boolean): void {
  console.log(`Auth attempt for ${email}: ${success ? "SUCCESS" : "FAILED"}`);
  // WARNING: Never log this in production!
}
