import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { loadFile } from '@utils/helpers';
import Pdf from 'react-native-pdf';
import { isIOS, screenHeight, screenWidth } from '@utils/platforms';
import WebView from 'react-native-webview';
import { enviroment } from '@assets/enviroment/enviroment.default';

const ViewDocument = (props) => {
  const { fileId, onPageChanged } = props;
  const pdfRef = useRef(null);
  const urlWebViewDocument = `${enviroment.apiDomain.doMainApp}/mobile/view-document?file=${fileId}`;
  const getExtentFile = (fileId) => {
    let re = '';
    if (fileId) {
      re = fileId.split('.').pop();
    }
    return re;
  };
  const isPdfFile = getExtentFile(fileId) === 'pdf';
  const source = { uri: loadFile(fileId) };

  return (
    <View style={styles.container}>
      {isPdfFile ? (
        <Pdf
          ref={pdfRef}
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {}}
          onPageChanged={(page, numberOfPages) => {}}
          onPressLink={(uri) => {}}
          onError={(error) => {}}
          style={styles.pdf}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={styles.pdf}>
          <WebView
            source={{ uri: urlWebViewDocument }}
            style={styles.webView}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
          />
        </View>
      )}
    </View>
  );
};

export default ViewDocument;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  webView: {
    flex: 1,
  },
});
