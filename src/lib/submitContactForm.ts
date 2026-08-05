export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export async function submitContactForm(_data: ContactFormData) {
  throw new Error("Contact form backend is not configured.");
}
