import {
  initializeApp,
  App,
  cert,
  getApps,
  getApp
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceKey from "./service_key.json";
import { ServiceAccount } from "firebase-admin/app";

const serviceAccount = serviceKey as ServiceAccount;


let app: App;
if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
