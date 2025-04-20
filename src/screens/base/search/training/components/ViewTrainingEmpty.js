import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconEmpty from '@assets/icons/icon_empty_class_room.svg';
import CMText from '@components/CMText';
import { horizontal, vertical } from '@utils/scales';
import { screenWidth } from '@utils/platforms';
import fonts from '@assets/value/fonts';
import { Color } from '@theme/colors';
import { useSelector } from 'react-redux';

const ViewTrainingEmpty = (props) => {
  const appColor = useSelector((state) => state.global.appColor);
  const onHandleExplore = () => {};

  return (
    <View style={styles.viewRmpty}>
      <IconEmpty width={120} height={100} />
      <CMText i18nKey="text-empty-training-edu" style={styles.textEmptyClass} />
      <CMText
        i18nKey="text-empty-content-class-room"
        style={styles.textEmptyContent}
        numberOfLines={2}
      />
      {/* <TouchableDebounce
        style={[
          styles.btnExplore,
          {
            backgroundColor: appColor?.base_color,
          },
        ]}
        onPress={onHandleExplore}
      >
        <CMText i18nKey={"text-button-explore"} style={styles.textBtnExplore} />
      </TouchableDebounce> */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewRmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vertical(20),
    width: screenWidth - horizontal(30),
    alignSelf: 'center',
    marginVertical: vertical(30),
  },
  textEmptyClass: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginTop: vertical(15),
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  textEmptyContent: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: vertical(15),
    width: screenWidth * 0.75,
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
  btnExplore: {
    backgroundColor: Color.base_color,
    height: 56,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vertical(20),
    paddingHorizontal: horizontal(20),
  },
  textBtnExplore: {
    color: Color.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
export default ViewTrainingEmpty;
