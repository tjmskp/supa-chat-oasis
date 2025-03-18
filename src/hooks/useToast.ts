import { useCallback } from 'react';

interface ToastOptions {
  title: string;
  description: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export const useToast = () => {
  const toast = useCallback(({ title, description, type, duration = 5000 }: ToastOptions) => {
    // Create a toast element
    const toastElement = document.createElement('div');
    toastElement.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-md z-50 ${
      type === 'error'
        ? 'bg-red-50 border border-red-200'
        : type === 'success'
        ? 'bg-green-50 border border-green-200'
        : type === 'warning'
        ? 'bg-yellow-50 border border-yellow-200'
        : 'bg-blue-50 border border-blue-200'
    }`;

    // Create toast content
    const content = `
      <h4 class="font-semibold mb-1 ${
        type === 'error'
          ? 'text-red-800'
          : type === 'success'
          ? 'text-green-800'
          : type === 'warning'
          ? 'text-yellow-800'
          : 'text-blue-800'
      }">${title}</h4>
      <p class="${
        type === 'error'
          ? 'text-red-600'
          : type === 'success'
          ? 'text-green-600'
          : type === 'warning'
          ? 'text-yellow-600'
          : 'text-blue-600'
      }">${description}</p>
    `;

    toastElement.innerHTML = content;

    // Add to document
    document.body.appendChild(toastElement);

    // Remove after duration
    setTimeout(() => {
      toastElement.classList.add('opacity-0', 'transition-opacity');
      setTimeout(() => {
        document.body.removeChild(toastElement);
      }, 300);
    }, duration);
  }, []);

  return { toast };
}; 