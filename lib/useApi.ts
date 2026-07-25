// hooks/useApi.ts
import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/lib/axios-client';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiErrorResponse | null;
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (apiCall: Promise<any>) => {
    setState((prev:any) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await apiCall;
      setState({ data: response.data, loading: false, error: null });
      return response;
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      const errorData = axiosError.response?.data || { 
        success: false, 
        message: 'An unexpected error occurred' 
      };
      
      setState({ data: null, loading: false, error: errorData });
      throw errorData; // Taaki component mein bhi catch kar sakein
    }
  }, []);

  return { ...state, execute };
}