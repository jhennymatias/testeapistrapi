module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'a0e0585173ad3dc2a66e4e4ac452965f'),
  },
});
