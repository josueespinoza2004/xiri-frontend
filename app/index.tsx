import { View, Text } from 'react-native';
import './global.css';

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-4xl font-bold text-blue-600 mt-10">
        Bienvenidos a Xiri!
      </Text>
    </View>
  );
};

export default App;