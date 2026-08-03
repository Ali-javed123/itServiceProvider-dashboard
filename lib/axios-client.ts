// lib/axios-client.ts
import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// --- TYPES ---
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// --- HELPER FUNCTIONS (No Classes) ---
// Next.js mein Server aur Client dono ke liye token manage karne ka tarika
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    // Client Side: localStorage ya js-cookie se token lein
    return localStorage.getItem('token'); 
  }
  return null;
};

const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// --- AXIOS INSTANCE ---
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000, // 15 seconds timeout (Production ready)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// --- REQUEST INTERCEPTOR ---
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    
    // Agar token hai toh header mein add karein
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Request start hone ka time (Loading state ke liye)
    (config as any).__startTime = Date.now();
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// --- RESPONSE INTERCEPTOR ---
// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   async (error: AxiosError<ApiErrorResponse>) => {
//     // Global Error Handling
//     if (error.response) {
//       const { status, data } = error.response;

//       // 401 Unauthorized: Token expire ya invalid
//       if (status === 401) {
//         clearAuthToken();
//         // Yahan aap router.push('/login') ya toast notification dikha sakte hain
//         console.warn('Unauthorized! Redirecting to login...');
//         if (typeof window !== 'undefined') {
//           window.location.href = '/login';
//         }
//       }

//       // 403 Forbidden
//       if (status === 403) {
//         console.warn('Access Denied');
//       }
      
//       // 500 Server Error
//       if (status >= 500) {
//         console.warn('Server Error:', data?.message || 'Something went wrong');
//       }
//     } else if (error.request) {
//       // Network Error (Server respond hi nahi kiya)
//       console.warn('Network Error: Please check your internet connection.');
//     }

//     return Promise.reject(error);
//   }
// );

// --- RESPONSE INTERCEPTOR ---
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const { status, data } = error.response;
      const requestUrl = error.config?.url || '';

      // Auth endpoints (login/register) ka 401 khud component handle karega
      const isAuthEndpoint = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register');

      if (status === 401 && !isAuthEndpoint) {
        clearAuthToken();
        console.warn('Unauthorized! Redirecting to login...');
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      if (status === 403) {
        console.warn('Access Denied');
      }

      if (status >= 500) {
        console.warn('Server Error:', data?.message || 'Something went wrong');
      }
    } else if (error.request) {
      console.warn('Network Error: Please check your internet connection.');
    }

    return Promise.reject(error);
  }
);