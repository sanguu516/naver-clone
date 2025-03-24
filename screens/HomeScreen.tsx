import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {RootStackParamList, RouteNames} from '../routes';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function HomeScreen({navigation}: Props) {
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{uri: 'https://m.naver.com/'}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onShouldStartLoadWithRequest={request => {
          if (
            request.url.startsWith('https://m.naver.com') ||
            request.mainDocumentURL?.startsWith('https://m.naver.com')
          ) {
            return true;
          }
          if (request.url !== null && request.url.startsWith('https://')) {
            navigation.navigate(RouteNames.BROWSER, {initialUrl: request.url});
            return false;
          }
          return true;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {flex: 1},
});
