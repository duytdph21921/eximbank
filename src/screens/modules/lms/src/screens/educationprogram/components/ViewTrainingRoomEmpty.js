import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconEmpty from '@assets/icons/icon_empty_class_room.svg';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';

const ViewTrainingRoomEmpty = ({ onPressExplore }) => {
  /**
   * Click button Khám phá khoá học.
   */
  const onHandleExplore = () => {
    onPressExplore();
  };

  return (
    <View style={styles.viewRmpty}>
      <IconEmpty width={120} height={100} />
      <CMText
        i18nKey="text-empty-training-room"
        style={styles.textEmptyClass}
      />
      <CMText
        i18nKey="text-empty-content-training-room"
        style={styles.textEmptyContent}
        numberOfLines={2}
      />
      <TouchableDebounce
        style={[
          styles.btnExplore,
          {
            backgroundColor: Color.base_color,
          },
        ]}
        onPress={onHandleExplore}
      >
        <CMText
          i18nKey="text-button-explore-training"
          style={styles.textBtnExplore}
        />
      </TouchableDebounce>
    </View>
  );
};
const styles = StyleSheet.create({
  viewRmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vertical(20),
    // width: screenWidth - horizontal(30),
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
    marginBottom: vertical(30),
  },
  btnExplore: {
    backgroundColor: Color.base_color,
    height: 56,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vertical(20),
    paddingHorizontal: horizontal(20),
    marginBottom: vertical(30),
  },
  textBtnExplore: {
    color: Color.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
export default ViewTrainingRoomEmpty;
