import React, { useEffect, useState } from 'react';
import { db } from '../../../config/firebase/firebase-config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
const CryptoTable = () => {
    const [ticksData, setTicksData] = useState([]);
    const userRef = doc(db, 'user', "f0gc5oHPjgT0vJJSq03P");
    useEffect(() => {
        const getTicks = async () => {
            try {
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log(userData.ticks)
                    if (userData.ticks) {
                        const tickPromises = userData.ticks.map(async (tick: any) => {
                            const tickDoc = await getDoc(tick);
                            console.log(tickDoc.data())
                        })
                    }
                }
            } catch (err) {

            }
        }
        getTicks()
    }, [])

    return (
        <div>

        </div>
    );
};

export default CryptoTable;