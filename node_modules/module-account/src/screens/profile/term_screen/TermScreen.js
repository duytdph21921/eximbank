import React, { useLayoutEffect, useRef } from 'react';
import { SafeAreaView, View } from 'react-native';
import CMText from '@components/CMText';
import BackHeader from '@components/BackHeader';
import globalStyles from '@theme/globalStyles';
import WebView from 'react-native-webview';
import { styles } from './TermScreen.styles';

const TermScreen = (props) => {
  const { navigation, route } = props;
  const { title, url } = route?.params;
  const webviewRef = useRef(null);

  const renderHeaderLeft = () => (
    <BackHeader
      handleGoBack={() => {
        navigation.goBack();
      }}
    />
  );

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText i18nKey={`${title}`} style={globalStyles.titleScreen} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{
          uri: url,
        }}
        style={styles.webView}
        ref={webviewRef}
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        startInLoadingState
        mixedContentMode="always"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default React.memo(TermScreen);
