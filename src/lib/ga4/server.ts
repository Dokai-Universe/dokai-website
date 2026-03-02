import "server-only";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

function getServiceAccountCredentials() {
  const b64 = process.env.GA4_SERVICE_ACCOUNT_JSON_BASE64;
  if (!b64) throw new Error("Missing GA4_SERVICE_ACCOUNT_JSON_BASE64");

  const json = Buffer.from(b64, "base64").toString("utf-8");
  const creds = JSON.parse(json);

  // service account JSON 구조: client_email, private_key 등
  return creds as {
    client_email: string;
    private_key: string;
  };
}

export function getGaClient() {
  const creds = getServiceAccountCredentials();
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: creds.client_email,
      private_key: creds.private_key,
    },
  });
}

export function getGaPropertyName() {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) throw new Error("Missing GA4_PROPERTY_ID");
  return `properties/${id}`;
}
