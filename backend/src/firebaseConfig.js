"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyAZWzRt6h3Za7ZG5_kDr-AXBdQbh4Mg9yg",
    authDomain: "finup-saas-2025.firebaseapp.com",
    projectId: "finup-saas-2025",
    storageBucket: "finup-saas-2025.appspot.com",
    messagingSenderId: "656351422904",
    appId: "SEU_APP_ID",
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
