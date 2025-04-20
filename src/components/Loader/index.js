/* eslint-disable global-require */
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import CMText from '@components/CMText';

const Loader = (props) => {
  const { isLoading, isNotConnect } = props;
  return (
    <Modal supportedOrientations={['portrait', 'landscape']} visible={isLoading} transparent>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <FastImage style={styles.imageGif} source={require('@assets/other/image_loading.gif')} />
          {isNotConnect && <CMText style={styles.textReconnect} i18nKey="text-re-connecting" />}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Color.background_dialog_loading,
  },
  activityIndicatorWrapper: {
    // height: vertical(40),
    // width: vertical(40),
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
  },
  imageGif: {
    height: vertical(25),
    width: vertical(25),
  },
  textReconnect: {
    color: Color.white,
    marginTop: vertical(10),
  },
});
export default Loader;
