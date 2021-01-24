import env from 'react-dotenv';

const config = {
  apiKey: env.firebase_apiKey,
  projectId: env.firebase_projectId,
  databaseURL: env.firebase_databaseURL,
  authDomain: env.firebase_authDomain
}

export default config