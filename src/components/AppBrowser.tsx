import { AppRoot } from '@telegram-apps/telegram-ui';
import { useIntegration } from '@tma.js/react-router-integration';
import {
  initNavigator
} from '@tma.js/sdk-react';
import { useMemo, type FC } from 'react';
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';

import { routes } from '@/navigation/routes.tsx';

export const AppBrowser: FC = () => {
  // const lp = useLaunchParams();
  // const miniApp = useMiniApp();
  // const themeParams = useThemeParams();
  // const viewport = useViewport();

  // useEffect(() => {
  //   return bindMiniAppCSSVars(miniApp, themeParams);
  // }, [miniApp, themeParams]);

  // useEffect(() => {
  //   return bindThemeParamsCSSVars(themeParams);
  // }, [themeParams]);

  // useEffect(() => {
  //   return viewport && bindViewportCSSVars(viewport);
  // }, [viewport]);

  // Create new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  // useEffect(() => {
  //   navigator?.attach();
  //   return () => navigator?.detach();
  // }, [navigator]);

  return (
    <AppRoot
      
    >
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </AppRoot>
  );
};
