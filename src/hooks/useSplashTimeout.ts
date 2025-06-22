import {useState, useEffect} from 'react';
// import NetInfo from '@react-native-community/netinfo'
const MIN_SPLASH_TIME = 2000;

const useSplashTimeout = () => {
  const [status, setStatus] = useState<
    'idle' | 'success' | 'failed' | 'no-internet'
  >('idle');

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout | undefined;
    const executeApiCall = async () => {
      try {
        // Wait for minimum splash time
        await new Promise(resolve => setTimeout(resolve, MIN_SPLASH_TIME));
        if (isMounted) {
          setStatus('success');
        }
      } catch (error) {
        if (isMounted) {
          setStatus(
            error instanceof Error && error?.message === 'API timeout'
              ? 'no-internet'
              : 'failed',
          );
        }
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }
    };

    executeApiCall();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return status;
};

export default useSplashTimeout;
