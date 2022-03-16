module.exports = ({ env }) => ({
  host: env('HOST', process.env.APP_HOST ),
  port: env.int('PORT', process.env.PORT || 3333),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
