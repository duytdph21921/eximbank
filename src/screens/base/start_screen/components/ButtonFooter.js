import React from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import { screenWidth } from '@utils/platforms';
import { Color } from '@theme/colors';

const ButtonFooter = (props) => {
  const { style, onPressNext } = props;

  return (
    <View style={[styles.container, style]}>
      <TouchableDebounce
        style={[
          styles.btnFooter,
          {
            backgroundColor: Color.base_color,
          },
        ]}
        onPress={onPressNext}
      >
        <CMText i18nKey="get-start" style={styles.textFooter} />
      </TouchableDebounce>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnFooter: {
    height: 56,
    width: screenWidth * 0.9,
    borderRadius: 28,
    paddingHorizontal: 15,
    backgroundColor: Color.base_color,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 1,
  },
  textFooter: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    color: Color.white,
  },
});

export default ButtonFooter;
