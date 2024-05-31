import { App } from '@/components/App.tsx';
// import { AppBrowser } from '@/components/AppBrowser.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { SDKProvider } from '@tma.js/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useEffect, useMemo, type FC } from 'react';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const Inner: FC = () => {
  const debug = import.meta.env.VITE_WEB_APP_URL === 'https://tma.internal'
  console.log("🚀 ~ debug:", debug)
  const manifestUrl = useMemo(() => {
    let manifestFile = import.meta.env.VITE_WEB_APP_URL === 'https://tma.internal' ? 'tonconnect-dev-manifest.json': 'tonconnect-manifest.json';
    let baseUrl = import.meta.env.VITE_WEB_APP_URL;
    baseUrl = baseUrl + `/${manifestFile}`;
   
    console.log("🚀 ~ manifestUrl ~ baseUrl:", baseUrl)
    return baseUrl;
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);
  const  twaReturnUrl = import.meta.env.VITE_TWA_RETURN_URL || 'https://t.me/tru_dev_bot/demo_app_dev' //'https://t.me/tru_dev_bot/demo_app_dev'
  console.log("🚀 ~ twaReturnUrl:", twaReturnUrl)
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl} actionsConfiguration={{
      twaReturnUrl:twaReturnUrl,
    }}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <App />
        {/* <AppBrowser></AppBrowser> */}
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
