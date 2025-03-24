import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../routes';
import {useNavigation} from '@react-navigation/native';
import {WebViewContext} from '../components/WebViewProvider';

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';

type Props = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreens() {
  const navigation = useNavigation<Props>();
  const context = useContext(WebViewContext);

  useEffect(() => {
    console.log('>>', context);
  }, [context]);
  return (
    <SafeAreaView style={style.container}>
      <WebView
        source={{uri: LOGIN_URL}}
        onNavigationStateChange={navState => {
          if (navState.url === 'https://www.naver.com/') {
            if (context?.webViewRef.current != null) {
              context.webViewRef.current.forEach(ref => {
                ref.reload();
              });
            }
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
