import { useSelector } from 'react-redux';

function useNetworkStatus() {
  return useSelector((states) => states?.appReduces?.isConnected);
}

export default useNetworkStatus;
