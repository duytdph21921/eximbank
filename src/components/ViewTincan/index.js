import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Animated } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import WebView from 'react-native-webview';
import { enviroment } from '@assets/enviroment/enviroment.default';
import { Color } from '@theme/colors';
import { loadFile } from '@utils/helpers';
import IconZoomIn from '@assets/other/icon_zoom_in.svg';
import { store } from '@store';
import TouchableDebounce from '../TouchableDebounce';

const ViewTincan = (props) => {
  const { learningId, username, fileId, title, contentId, handleRouteScreen } = props;
  const webviewRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isZoom, setZoom] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const baseURL = store.getState().auth?.baseURL || '';
  const urlScorm =
    baseURL + enviroment.apiDomain.fileEndpoint.replace('api/v1', 'tincan/player.html');
  const linkFile = loadFile(fileId);
  const urlScormPlay = `${urlScorm}?learning_id=${learningId}&username=${username}&type=tincan&file=${linkFile}&content_id=${contentId}&title=${title}&endpoint=${baseURL}${enviroment.apiDomain.lmsEndpoint}`;
  useEffect(() => {
    Orientation.unlockAllOrientations();
    Orientation.lockToPortrait();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);
  const onHandleZoom = () => {
    if (fullScreen) {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
      handleRoute(false);
    } else {
      Orientation.unlockAllOrientations();
      Orientation.lockToLandscapeLeft();
      handleRoute(true);
    }
    setFullScreen(!fullScreen);
  };
  const handleRoute = (isLandscape) => {
    if (isLandscape) {
      handleRouteScreen(true);
    } else {
      handleRouteScreen(false);
    }
  };
  // useEffect(() => {
  //   Dimensions.addEventListener('change', ({ window: { width, height } }) => {
  //   });
  // }, []);
  const handlePress = () => {
    setIsVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setIsVisible(false);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, 3000);
    });
  };
  /**
   * Back to previous screen
   */
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container} onTouchStart={handlePress}>
        <WebView
          originWhitelist={['*']}
          source={{
            uri: urlScormPlay,
          }}
          style={styles.webView}
          ref={webviewRef}
          javaScriptEnabled
          domStorageEnabled
          scalesPageToFit
          decelerationRate="normal"
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback
          startInLoadingState
          mixedContentMode="always"
        />
        {isVisible && (
          <Animated.View style={styles.viewHide}>
            <TouchableDebounce style={styles.btnMuteVolum} onPress={onHandleZoom}>
              {isZoom ? (
                <IconZoomIn width={20} height={20} />
              ) : (
                <IconZoomIn width={20} height={20} />
              )}
            </TouchableDebounce>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewBackground: {
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: Color.black,
    ...StyleSheet.absoluteFill,
  },
  viewHide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    top: 10,
    right: 10,
    position: 'absolute',
  },
});
export default ViewTincan;
