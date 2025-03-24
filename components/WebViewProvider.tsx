import {createContext, ReactNode, useCallback, useRef} from 'react';
import WebView from 'react-native-webview';

interface WebViewContextType {
  webViewRef: React.RefObject<WebView[]>;
  addWebView: (webView: WebView) => void;
}
const WebViewContext = createContext<WebViewContextType | undefined>(undefined);

function WebViewProvider({children}: {children?: ReactNode}) {
  const webViewRef = useRef<WebView[]>([]);

  const addWebView = useCallback((webView: WebView) => {
    webViewRef.current.push(webView);
  }, []);

  return (
    <WebViewContext.Provider value={{webViewRef, addWebView}}>
      {children}
    </WebViewContext.Provider>
  );
}

export {WebViewContext, WebViewProvider};
