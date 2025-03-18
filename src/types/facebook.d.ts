
interface Window {
  FB: {
    init: (options: {
      appId: string;
      cookie: boolean;
      xfbml: boolean;
      version: string;
    }) => void;
    login: (
      callback: (response: fb.AuthResponse) => void,
      options?: { scope: string }
    ) => void;
    api: (
      path: string,
      method: string,
      params: any,
      callback: (response: any) => void
    ) => void;
  };
  fbAsyncInit: () => void;
}

declare namespace fb {
  interface AuthResponse {
    accessToken: string;
    expiresIn: string;
    signedRequest: string;
    userID: string;
    authResponse?: {
      accessToken: string;
      expiresIn: string;
      signedRequest: string;
      userID: string;
    };
  }
}
