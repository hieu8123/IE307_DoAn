import { Provider } from 'react-redux';
import store from './store';
import { View } from 'react-native';
export default function App() {
  return (
    <Provider store={store}>
      <NetworkStatusAlert>
        <View>app</View>
      </NetworkStatusAlert>
    </Provider>
  );
}
