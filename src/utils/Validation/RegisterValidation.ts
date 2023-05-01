import { object, string, ref } from 'yup';

export const registerSchema = object({
    name: string().required("Name field is required"),
    email: string().required("Email field is required").email("Invalid email format : please enter xxx@xxx.xxx format"),
    password: string().required("Password field is required").min(8),
    password_confirm: string().required("Password Confirm field is required").min(8).oneOf([ref('password')], "Password & Password confirm must be equal"),
    phone: string().required("Phone field is required"),
    address: string().required("Address field is required"),
})