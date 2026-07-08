import React, { createContext, useState } from 'react';

export const VaultContext = createContext();

export const VaultProvider = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // In a full production build, you would fetch this hash securely from the device Keychain/Keystore.
  // For the MVP, we establish a clean, hardcoded 4-digit code.
  const MASTER_PIN = '1234';

  // Core verification state engine
  const verifyPinAttempt = (inputPin) => {
    if (inputPin === MASTER_PIN) {
      setIsUnlocked(true);
      return true;
    }
    setIsUnlocked(false);
    return false;
  };

  const lockVault = () => {
    setIsUnlocked(false);
  };

  return (
    <VaultContext.Provider value={{ isUnlocked, verifyPinAttempt, lockVault }}>
      {children}
    </VaultContext.Provider>
  );
};