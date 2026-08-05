import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirebaseFirestore } from "./firebase";

export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export async function submitContactForm(data: ContactFormData) {
  const db = getFirebaseFirestore();

  await addDoc(collection(db, "website-form"), {
    name: data.name.trim(),
    company: data.company.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    serviceType: data.service,
    message: data.message.trim(),
    createdAt: serverTimestamp(),
  });
}
