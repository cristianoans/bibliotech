import { getDocs } from "firebase/firestore";
import { usersCollection } from "./collections";

export async function getUsers() {
    const snapshot = await getDocs(usersCollection);
    let users = [];
    snapshot.forEach(doc => {
        users.push({...doc.data(), id: doc.id});
    })
    return users;
}
