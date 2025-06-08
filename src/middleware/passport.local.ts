import { prisma } from "config/prismaClient";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "services/admin/userService";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy({
        usernameField: "email"
    },async function verify(username, password, callback) {
      console.log("check username/password", username, password);
      // Check user exist in database
      const user = await prisma.user.findUnique({
        where: { email: username }, // email ở đây là tên trường trong prisma
      });

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

      return user;
    })
  );
};

export default configPassportLocal;
