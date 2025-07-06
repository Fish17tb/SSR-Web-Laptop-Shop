import { prisma } from "config/prismaClient";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "services/admin/userService";
import {
  getUserSumCart,
  getUserWithRoleById,
} from "services/client/authService";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async function verify(req, username, password, callback) {
        // console.log("check username/password", username, password);

        // Lưu lại lỗi login khi F5
        // const { session } = req as any;
        // if (session?.messages?.length) {
        //   session.messages = [];
        // }

        // Check user exist in database
        const user = await prisma.user.findUnique({
          where: { email: username }, // email ở đây là tên trường trong prisma
        });

        if (!user && !password) {
          return callback(null, false, {
            message: `Vui lòng điều đầy đủ thông tin!`,
          });
        }

        if (!user) {
          // throw new Error(`Tài khoản ${username} không tồn tại trong hệ thống!`);
          return callback(null, false, {
            message: `Tài khoản ${username} không tồn tại trong hệ thống!`,
          });
        }

        // Compare password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          // throw new Error(`Mật khẩu không chính xác!`);
          return callback(null, false, {
            message: `Mật khẩu không chính xác!`,
          });
        }
        return callback(null, user as any);
      }
    )
  );

  // Lưu trữ thông tin người dùng vào database (chỉ lên lưu lại id)
  passport.serializeUser(function (user: any, callback) {
    callback(null, { id: user.id, email: user.email });
  });

  // F5 lại website luôn biết người dùng là ai (ĐK: người dùng đã đăng nhập)
  // Giải mã thông tin người dùng sau đó ném vào biến req.user
  passport.deserializeUser(async function (user: any, callback) {
    const { id, email } = user;

    // Query to database
    const userInDB: any = await getUserWithRoleById(id);
    const sumCart: any = await getUserSumCart(id);
    // console.log("check-sumCart", sumCart);
    return callback(null, { ...userInDB, sumCart: sumCart });
  });
};

export default configPassportLocal;
