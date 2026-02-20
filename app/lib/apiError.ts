import { toast } from 'react-hot-toast';

type ApiResponse = {
  error?: string;
  message?: string;
};

export const handleApiResponse = (response: ApiResponse) => {
  if (!response) {
    toast.error('Something went wrong. Please try again.');
    return;
  }

  if (response.error) {
    toast.error(response.error);
    return;
  }

  if (response.message) {
    toast.success(response.message);
    return;
  }

  toast.error('Unexpected response from server.');
};

export const handleApiError = (error: any) => {
  if (!error) {
    toast.error('Something went wrong. Please try again.');
    return;
  }

  if (typeof error === 'string') {
    toast.error(error);
    return;
  }

  if (error?.error) {
    toast.error(error.error);
    return;
  }

  toast.error('Something went wrong. Please try again.');
};

export const showSuccess = (message: string) => toast.success(message);
export const showError = (message: string) => toast.error(message);