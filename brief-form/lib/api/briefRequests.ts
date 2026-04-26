import { BriefFormData } from "@/lib/types/BriefFormData";
import { db, isFirebaseConfigured } from "@/lib/firebase/client";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
} from "firebase/firestore";

export type BriefSubmissionData = Omit<BriefFormData, "id" | "createdAt">;
const BRIEFS_COLLECTION = "briefs";

function getFirestoreDb() {
	if (!isFirebaseConfigured || !db) {
		throw new Error("Firebase не налаштований. Перевірте конфігурацію Firebase.");
	}

	return db;
}

export async function submitBrief(
	brief: BriefSubmissionData,
): Promise<BriefFormData> {
	const firestoreDb = getFirestoreDb();
	const createdAt = new Date().toISOString();
	const docRef = await addDoc(collection(firestoreDb, BRIEFS_COLLECTION), {
		...brief,
		createdAt,
	});

	return {
		...brief,
		id: docRef.id,
		createdAt,
	};
}

export async function readBriefs(): Promise<BriefFormData[]> {
	const firestoreDb = getFirestoreDb();
	const snapshot = await getDocs(collection(firestoreDb, BRIEFS_COLLECTION));

	return snapshot.docs.map((item) => {
		const data = item.data() as Omit<BriefFormData, "id">;
		return {
			...data,
			id: item.id,
		};
	});
}

export async function readBriefById(
	id: string,
): Promise<BriefFormData | undefined> {
	const firestoreDb = getFirestoreDb();
	const snapshot = await getDoc(doc(firestoreDb, BRIEFS_COLLECTION, id));
	if (!snapshot.exists()) return undefined;

	const data = snapshot.data() as Omit<BriefFormData, "id">;
	return {
		...data,
		id: snapshot.id,
	};
}

export async function updateBrief(
	id: string,
	brief: BriefSubmissionData,
): Promise<BriefFormData | undefined> {
	const firestoreDb = getFirestoreDb();
	const currentBrief = await readBriefById(id);
	if (!currentBrief) return undefined;

	const updatedBrief: BriefFormData = {
		...brief,
		id,
		createdAt: currentBrief.createdAt,
	};

	await setDoc(doc(firestoreDb, BRIEFS_COLLECTION, id), updatedBrief);
	return updatedBrief;
}
