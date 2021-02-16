import { useSize, useDocumentVisibility, useNetwork } from 'ahooks';

export const useDocument = () => {
  return {
    window: { ...useSize(document.documentElement) },
    network: { ...useNetwork() },
    visibility: useDocumentVisibility(),
  };
};
