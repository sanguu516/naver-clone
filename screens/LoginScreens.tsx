import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../routes';
import {useNavigation} from '@react-navigation/native';

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';

type Props = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreens() {
  const navigation = useNavigation<Props>();

  return (
    <SafeAreaView style={style.container}>
      <WebView
        source={{uri: LOGIN_URL}}
        onNavigationStateChange={navState => {
          if (navState.url === 'https://www.naver.com/') {
            navigation.goBack();
          }
        }}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
