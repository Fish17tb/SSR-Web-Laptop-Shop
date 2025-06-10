import { isEmailExist } from "services/client/authService";
import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email("Email không đúng định dạng")
  .refine(
    async (email) => {
      const existingUser = await isEmailExist(email);
      return !existingUser;
    },
    {
      message: "Email đã tồn tại trong hệ thống",
      path: ["email"],
    }
  );

const passwordSchema = z
  .string()
  .min(8, { message: "Mật khẩu phải tối thiểu 8 ký tự" })
  .max(20, { message: "Mật khẩu tối đa 20 ký tự" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Mật khẩu bao gồm ít nhất 1 ký tự viết hoa",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Mật khẩu bao gồm ít nhất 1 ký tự viết thường",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Mật khẩu bao gồm ít nhất 1 chữ số",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Mật khẩu bao gồm ít nhất một ký tự đặc biệt",
  });

export const RegisterSchema = z
  .object({
    fullName: z.string().trim().min(8, { message: "Tên không được để trống!" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không trùng nhau",
    path: ["confirmPassword"],
  });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
