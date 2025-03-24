import {TouchableOpacity, View} from 'react-native';
import {RootStackParamList, RouteNames} from '../routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function ShoppingScreen({navigation}: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(RouteNames.BROWSER, {
            initialUrl: 'https://shopping.naver.com',
          })
        }>
        <MaterialCommunityIcons name="shopping" size={30} />
      </TouchableOpacity>
    </View>
  );
}
