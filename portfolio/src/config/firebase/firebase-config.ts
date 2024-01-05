import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { Tick } from "../../types/firestore-docs.type";
const firebaseConfig = {
  apiKey: "AIzaSyDJuLbzJblIrRaTYDDKhtlgbkUqZh3RHm0",
  authDomain: "brc-20-53178.firebaseapp.com",
  projectId: "brc-20-53178",
  storageBucket: "brc-20-53178.appspot.com",
  messagingSenderId: "671385624227",
  appId: "1:671385624227:web:bdc6c93fc9137ce8256916",
  measurementId: "G-T7DLBS5X64",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const addOrUpdateTick = async (tick: Tick) => {
  const userRef = doc(db, "user", tick.userId);

  const tickQuerySnapshot = await getDocs(
    query(
      collection(db, "tick"),
      where("userId", "==", userRef),
      where("tick", "==", tick.tick)
    )
  );
  if (tickQuerySnapshot.empty) {
    await addDoc(collection(db, "tick"), {
      userId: userRef,
      tick: tick.tick,
      amount: tick.amount,
      buyingPrice: tick.buyingPrice,
    });
  } else {
    const tickDoc = tickQuerySnapshot.docs[0];
    await updateDoc(tickDoc.ref, {
      amount: (tickDoc.data().amount || 0) + tick.amount,
      buyingPrice: (tickDoc.data().amount + tick.buyingPrice) / 2,
    });
  }
};

export const getTicksByUserId = async (userId: string) => {
  try {
    const userRef = doc(db, "user", userId);
    const userDoc = await getDoc(userRef);
    console.log(userDoc.data());

    if (userDoc.exists()) {
      const tickQuery = query(
        collection(db, "tick"),
        where("userId", "==", userRef)
      );
      const tickSnapshot = await getDocs(tickQuery);
      console.log(tickSnapshot);

      if (!tickSnapshot.empty) {
        const tickArray = tickSnapshot.docs.map((tickDoc) => tickDoc.data());
        console.log(tickArray);
        return tickArray;
      }
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default firebaseConfig;
