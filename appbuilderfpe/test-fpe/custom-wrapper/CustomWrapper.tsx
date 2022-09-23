/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
import {createHook} from 'customization-implementation';
import React, {useEffect, useState} from 'react';

export interface CustomWrapperInterface {
  customKey1?: string;
  customKey2?: string;
}

const CustomWrapperContext = React.createContext<CustomWrapperInterface>({
  customKey1: 'hi',
  customKey2: 'hello',
});

interface CustomWrapperProviderProps {
  children: React.ReactNode;
}

const CustomWrapperProvider = (props: CustomWrapperProviderProps) => {
  const [customState, setCustomState] = useState<CustomWrapperInterface>({});
  useEffect(() => {
    setCustomState({
      customKey1: 'hi from State',
      customKey2: 'hello from state',
    });
  }, []);
  return (
    <CustomWrapperContext.Provider value={{...customState}}>
      {props.children}
    </CustomWrapperContext.Provider>
  );
};

const useCustomWrapper = createHook(CustomWrapperContext);

export {CustomWrapperProvider, useCustomWrapper};
