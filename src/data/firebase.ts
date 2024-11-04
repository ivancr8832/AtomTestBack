import { initializeApp } from "firebase/app";
import { addDoc, getFirestore, collection, getDoc, doc, deleteDoc, updateDoc, getDocs, query, limit, orderBy, DocumentData, startAfter, QueryDocumentSnapshot, Firestore  } from 'firebase/firestore';
import { envs } from "../config";

const firebaseConfig = {
    apiKey: envs.API_KEY,
    authDomain: envs.AUTH_DOMAIN,
    projectId: envs.PROJECT_ID,
    storageBucket: envs.STORAGE_BUCKET,
    messagingSenderId: envs.MESSAGING_SENDER_ID,
    appId: envs.APP_ID
}

export class FirebaseDb {

    private static lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null = null;

    public static get db(): Firestore {
        return getFirestore();
    }

    public static initDb() {
        try{
            initializeApp(firebaseConfig);
            console.log("Firebase Initialized");
        } catch(e) {
            console.log(e)
        }
    }

    public static async getAll(collectionName: string, page: number, limitNumber: number) {
        const collectionRef = collection(this.db, collectionName);

        const totalSnapshot = await getDocs(query(collectionRef));
        const totalRecords = totalSnapshot.size;

        const totalPages = Math.ceil(totalRecords / limitNumber);

        let queryRef = query(collectionRef, orderBy("title"), limit(limitNumber));
        if (page > 1 && this.lastVisibleDoc) {
            queryRef = query(collectionRef, orderBy("title"), startAfter(this.lastVisibleDoc), limit(limitNumber));
        }
        const snapshot = await getDocs(queryRef);

        if (!snapshot.empty) {
            this.lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
        }

        const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return {
            documents,
            totalRecords,
            totalPages,
            currentPage: page
        };
    }

    public static insert(collectionName: string, data: any) {
        return addDoc(collection(this.db, collectionName), data)
    }

    public static findById(collectionName: string, id: string) {
        return getDoc(doc(this.db, collectionName, id))
    }

    public static update(collectionName: string, id: string, data: any) {
        return updateDoc(doc(this.db, collectionName, id), data);
    }

    public static delete(collectionName: string, id: string) {
        return deleteDoc(doc(this.db, collectionName, id));
    }
}
