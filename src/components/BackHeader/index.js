import { StackActions } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import IconBack from '@assets/icons/icon-back.svg';
import { horizontal, textSize } from '@utils/scales';
import TouchableDebounce from '../TouchableDebounce';
import CMText from '../CMText';

const BackHeader = ({ dispatch, handleGoBack, title }) => {
  const handlePress = () => {
    if (!handleGoBack) {
      dispatch(StackActions.pop(1));
    } else {
      handleGoBack();
    }
  };

  return (
    <TouchableDebounce style={styles.btnBack} onPress={handlePress}>
      <IconBack width={44} height={44} />
      <CMText i18nKey={title || 'back_header'} style={styles.textBack} />
    </TouchableDebounce>
  );
};

const styles = StyleSheet.create({
  btnBack: {
    paddingLeft: horizontal(20),
    paddingRight: horizontal(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  textBack: {
    color: 'red',
    fontSize: textSize(12),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  iconBack: {
    width: 20,
    height: 20,
  },
});

export default BackHeader;
