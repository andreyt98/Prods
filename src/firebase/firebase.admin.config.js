import admin from "firebase-admin";

const firebaseConfig = {
  credential: admin.credential.cert({
    type: process.env.NEXT_TYPE,
    project_id: process.env.NEXT_PROJECT_ID,
    private_key_id: process.env.NEXT_PRIVATE_KEY_ID,
    private_key: process.env.NEXT_PRIVATE_KEY,
    client_email: process.env.NEXT_CLIENT_EMAIL,
    client_id: process.env.NEXT_CLIENT_ID,
    auth_uri: process.env.NEXT_AUTH_URI,
    token_uri: process.env.NEXT_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.NEXT_AUTH_PROVIDER_x509_CERT_URL,
    client_x509_cert_url: process.env.NEXT_CLIENT_x509_CERT_URL,
    universe_domain: process.env.NEXT_UNIVERSE_DOMAIN,
  }),
};
if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
}

export const verifyToken = async (token) => {
  const validToken = await admin.auth().verifyIdToken(token.token);
  return validToken;
};
export const verifyEmailExists = async (email) => {
  const userRecord = await admin.auth().getUserByEmail(email);
  return userRecord;
};
