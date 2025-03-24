import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList, RouteNames} from '../routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = NativeStackNavigationProp<RootStackParamList>;

export default function LoginButton() {
  const navigation = useNavigation<Props>();

  const isLoggedIn = false;
  const iconName = isLoggedIn ? 'logout' : 'login';

  const onPressLogin = useCallback(() => {
    navigation.navigate(RouteNames.LOGIN);
  }, [navigation]);

  const onPressLogout = useCallback(() => {}, []);
  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <MaterialCommunityIcons name={iconName} color="white" size={24} />
    </TouchableOpacity>
  );
}
