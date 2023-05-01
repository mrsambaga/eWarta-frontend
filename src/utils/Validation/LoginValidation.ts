import { object, string } from 'yup';

export const loginSchema = object({
    email: string().required("Email field is required").email("Invalid email format : please enter xxx@xxx.xxx format"),
    password: string().required("Password field is required").min(8)
})