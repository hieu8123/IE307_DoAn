import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes/Routes';
import NetworkStatusAlert from './components/NetworkStatusAlert';
export default function App() {
  return (
    <Provider store={store}>
      <NetworkStatusAlert>
        <Routes />
      </NetworkStatusAlert>
    </Provider>
  );
}
