import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList, RouteNames} from '../routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CookieManager from '@react-native-cookies/cookies';
import {WebViewContext} from './WebViewProvider';

type Props = NativeStackNavigationProp<RootStackParamList>;

export default function LoginButton() {
  const navigation = useNavigation<Props>();
  const isFocused = useIsFocused();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const context = useContext(WebViewContext);

  const iconName = isLoggedIn ? 'logout' : 'login';

  useEffect(() => {
    if (isFocused) {
      CookieManager.get('https://www.naver.com', true).then(cookies => {
        console.log('>>', cookies);
        if (cookies.NID_SES) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    }
  }, [isFocused]);

  const onPressLogin = useCallback(() => {
    navigation.navigate(RouteNames.LOGIN);
  }, [navigation]);

  const onPressLogout = useCallback(async () => {
    await CookieManager.clearAll(true);
    setIsLoggedIn(false);
    if (context?.webViewRef.current != null) {
      context.webViewRef.current.forEach(ref => {
        ref.reload();
      });
    }
  }, [context]);
  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <MaterialCommunityIcons name={iconName} color="white" size={24} />
    </TouchableOpacity>
  );
}
