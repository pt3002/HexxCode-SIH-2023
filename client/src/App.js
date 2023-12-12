import { useRoutes } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import router from './router';

import ThemeProvider from './theme/ThemeProvider';

import UserTokenState from './contexts/UserTokenState';

function App() {
  const content = useRoutes(router);

  return (
    <HelmetProvider>
        <ThemeProvider>
          <UserTokenState>
            {content}
          </UserTokenState>
        </ThemeProvider>
    </HelmetProvider>
  );
}
export default App;
