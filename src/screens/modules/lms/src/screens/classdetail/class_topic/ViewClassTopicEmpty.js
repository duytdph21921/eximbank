import React from 'react';
import { StyleSheet, View } from 'react-native';
import { vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import IconEmpty from '@assets/icons/icon_empty_class_room.svg';
import { screenWidth } from '@utils/platforms';
import CMText from '@components/CMText';

const ViewClassTopicEmpty = () => (
  <View style={styles.viewRmpty}>
    <IconEmpty width={120} height={100} />
    <CMText i18nKey="text-empty-class-topic" style={styles.textEmptyClass} />
  </View>
);
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
});
export default ViewClassTopicEmpty;
