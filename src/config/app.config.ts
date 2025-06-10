export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  environment: process.env.NODE_ENV || 'development',

  // JWT Config
  jwt: {
    secret: process.env.JWT_SECRET || 'dandytranstudentadmissionsystem',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // Email Config
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || 'noreply@studentadmission.com',
  },

  // Frontend Config
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:8000',
  },

  // Security Config
  security: {
    maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS, 10) || 5,
    lockTime: parseInt(process.env.LOCK_TIME, 10) || 15 * 60 * 1000,
    resetTokenExpiry:
      parseInt(process.env.RESET_TOKEN_EXPIRY, 10) || 60 * 60 * 1000,
  },
});
