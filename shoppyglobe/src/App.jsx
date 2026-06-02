// App.jsx
// Root application component — wraps router in Redux Provider

import { Provider } from 'react-redux';
import store from './redux/store';
import AppRouter from './routes/AppRouter';

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
