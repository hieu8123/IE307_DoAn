import React, { useEffect, useRef, useState } from 'react';
import DropdownAlert, { DropdownAlertType } from 'react-native-dropdownalert';
import { useNetInfo } from "@react-native-community/netinfo";

const NetworkStatusAlert = ({ children }) => {
  const netInfo = useNetInfo();
  const alert = useRef((_data) => new Promise<DropdownAlertType>((res) => res));
  const [prevIsConnected, setPrevIsConnected] = useState(netInfo.isConnected ?? true);

  useEffect(() => {
    if (netInfo.isConnected !== prevIsConnected && netInfo.isConnected !== null) {
      setTimeout(async () => {
        await alert.current({
          type: netInfo.isConnected ? DropdownAlertType.Success : DropdownAlertType.Error,
          title: netInfo.isConnected ? 'Connected' : 'Disconnected',
          message: netInfo.isConnected
            ? 'The operation was successful!'
            : 'No internet connection. Please check your network settings.',
        });
      }, 10);
      setPrevIsConnected(netInfo.isConnected);
    }
  }, [netInfo, prevIsConnected]);

  return (
    <>
      <DropdownAlert
        alert={(func) => (alert.current = func)}
      />
      {children}
    </>
  );
};

export default NetworkStatusAlert;
