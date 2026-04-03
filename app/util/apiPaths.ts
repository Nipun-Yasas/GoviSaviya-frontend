export const API_BASE_URL = 'http://localhost:8080/govisaviya/api/v1';

export const API_PATHS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  DISEASE: {
    IDENTIFY: '/disease/identify',
    HISTORY: '/disease/history',
  },
  MONITOR: {
    POLYGON: '/monitor/polygon',
    MY_POLYGON: '/monitor/my-polygon',
    WEATHER: '/monitor/weather',
    FORECAST: '/monitor/weather/forecast',
    SOIL: '/monitor/soil',
  },
  FERTILIZER: {
    SUBMIT: '/fertilizer/submit',
    MY_REQUESTS: '/fertilizer/my-requests',
    GET_DETAILS: (id: number | string) => `/fertilizer/${id}`,
    ADMIN: {
      ALL: '/fertilizer/admin/all',
      REVIEW: (id: number | string) => `/fertilizer/admin/${id}/review`,
    }
  },
  USERS: {
    ALL: '/users',
    DISABLE: (id: number | string) => `/users/${id}/disable`,
    ENABLE: (id: number | string) => `/users/${id}/enable`,
  }
};
