import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (
      type: string,
      action: string,
      params?: {
        page_path?: string;
        page_title?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    window.gtag?.('config', 'G-XXXXXXXXXX', {
      page_path: location.pathname,
      page_title: document.title
    });
  }, [location]);

  return null;
}