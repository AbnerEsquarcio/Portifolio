import { useState, useEffect } from 'react';
import '../styles/Toast.css';

export default function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      const { message, success } = e.detail;
      setToast({ message, success });
      setTimeout(() => setToast(null), 4000);
    };

    window.addEventListener('show-toast', handler);
    return () => window.removeEventListener('show-toast', handler);
  }, []);

  return (
    <div id="toast" className={`${toast ? 'show' : ''} ${toast?.success ? 'success' : 'error'}`}>
      {toast?.message}
    </div>
  );
}
