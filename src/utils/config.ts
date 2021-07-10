const configProd = {
  BACKEND_BASE_URL: '/api',
  PORTAL_ADDRESS: 'https://portal.example.com/',
};

const configUat = {
  BACKEND_BASE_URL: '/api',
  PORTAL_ADDRESS: 'https://uatportal.example.com/',
};

const configFat = {
  BACKEND_BASE_URL: '/api',
  PORTAL_ADDRESS: 'http://portal.sit.example.com/',
};

const configDev = {
  BACKEND_BASE_URL: 'http://localhost:8315/api', // spring-boot
  // BACKEND_BASE_URL: 'http://127.0.0.1:8200/spring-cloud-frontend/api', // spring-cloud
  PORTAL_ADDRESS: 'http://127.0.0.1:8200/spring-cloud-frontend/',
};

const config = () => {
  const env = process.env.VUE_APP_BUILD_ENV;
  if (env === 'production') {
    return configProd;
  }
  if (env === 'uat') {
    return configUat;
  }
  if (env === 'fat') {
    return configFat;
  }
  return configDev;
};

export default config();
