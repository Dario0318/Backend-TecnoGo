export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env("https://backend-tecnogo.onrender.com"),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
