import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyDJuLbzJblIrRaTYDDKhtlgbkUqZh3RHm0",
	authDomain: "brc-20-53178.firebaseapp.com",
	projectId: "brc-20-53178",
	storageBucket: "brc-20-53178.appspot.com",
	messagingSenderId: "671385624227",
	appId: "1:671385624227:web:bdc6c93fc9137ce8256916",
	measurementId: "G-T7DLBS5X64"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default firebaseConfig;
