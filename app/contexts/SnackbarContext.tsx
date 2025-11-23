/**
 * SnackbarContext
 * Snackbar管理用Context
 */

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface SnackbarConfig {
  message: string;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface SnackbarContextType {
  showSnackbar: (config: SnackbarConfig) => void;
  hideSnackbar: () => void;
  snackbarConfig: SnackbarConfig | null;
  visible: boolean;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarConfig | null>(null);

  const showSnackbar = useCallback((config: SnackbarConfig) => {
    setSnackbarConfig(config);
    setVisible(true);
  }, []);

  const hideSnackbar = useCallback(() => {
    setVisible(false);
    setTimeout(() => setSnackbarConfig(null), 300);
  }, []);

  const value: SnackbarContextType = {
    showSnackbar,
    hideSnackbar,
    snackbarConfig,
    visible,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
