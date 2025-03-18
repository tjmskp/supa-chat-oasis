
interface Window {
  google: {
    accounts: {
      oauth2: {
        initCodeClient: (options: {
          client_id: string;
          scope: string;
          callback: (response: { code: string }) => void;
        }) => {
          requestCode: () => void;
        };
      };
    };
  };
}
