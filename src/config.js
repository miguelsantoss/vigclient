module.exports = {
  // Node.js app
  port: process.env.PORT || 3001,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || '192.168.1.53',
  database: {
    username: 'root',
    // password: 'DRC-89-VIGILANTE',
    password: '',
    databaseDev: 'drc_app_development',
    databaseTest: 'drc_app_test',
  },

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  },
};
