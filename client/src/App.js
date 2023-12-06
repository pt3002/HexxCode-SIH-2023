import { useRoutes } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import router from './router';

import ThemeProvider from './theme/ThemeProvider';

function App() {
  const content = useRoutes(router);

  return (
    <HelmetProvider>
        <ThemeProvider>
            {content}
        </ThemeProvider>
    </HelmetProvider>
  );
}
export default App;
