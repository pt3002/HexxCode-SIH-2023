import { useRoutes } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import ThemeProvider from './theme/ThemeProvider';

import UserTokenState from './contexts/UserTokenState';

import DynamicRoutes from './router';

function App() {
  return (
    <HelmetProvider>
        <ThemeProvider>
          <UserTokenState>
            <DynamicRoutes />
          </UserTokenState>
        </ThemeProvider>
    </HelmetProvider>
  );
}
export default App;
