import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import WebView from 'react-native-webview';
import {RootStackParamList, RouteNames} from '../routes';
import {useCallback, useRef, useState} from 'react';

type Props = NativeStackScreenProps<RootStackParamList>;

const SHOPPING_HOME_URL = 'https://shopping.naver.com/home';

export default function ShoppingScreen({navigation}: Props) {
  const [refreshing, setRefreshing] = useState(false);

  const webBiewRef = useRef<WebView>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    webBiewRef.current?.reload();
  }, []);
  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <WebView
          ref={webBiewRef}
          source={{uri: SHOPPING_HOME_URL}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onShouldStartLoadWithRequest={request => {
            console.log('>>', request);
            if (
              request.url.startsWith(SHOPPING_HOME_URL) ||
              request.mainDocumentURL?.startsWith(SHOPPING_HOME_URL)
            ) {
              return true;
            }
            if (request.url !== null && request.url.startsWith('https://')) {
              navigation.navigate(RouteNames.BROWSER, {
                initialUrl: request.url,
              });
              return false;
            }
            return true;
          }}
          onLoad={() => setRefreshing(false)}
          renderLoading={() => <></>}
          startInLoadingState={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {flex: 1},
});
