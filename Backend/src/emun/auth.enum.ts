export enum RegisterError {
   UsernameExists = "USERNAME_EXISTS",
   EmailExists = "EMAIL_EXISTS",
   PasswordMismatch = "PASSWORD_MISMATCH",
   Success = "SUCCESS"
}
export enum LoginError {
   InvalidCredentials = "INVALID_CREDENTIALS",  // Sai thông tin đăng nhập
   AccountLocked = "ACCOUNT_LOCKED",            // Tài khoản bị khóa
   MissingFields = "MISSING_FIELDS",            // Thiếu trường bắt buộc
   ServerError = "SERVER_ERROR",
   Success = "SUCCESS"
}
