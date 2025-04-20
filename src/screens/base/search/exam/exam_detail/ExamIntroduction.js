import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import CMText from '@components/CMText';
import IconClock from '@assets/icons/icon_clock.svg';
import IconVideo from '@assets/icons/icon_video.svg';
import { horizontal, textSize, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import { Color } from '@theme/colors';
import { screenWidth } from '@utils/platforms';
import CustomImage from '@components/CustomImage';

const IMAGE_WIDTH = screenWidth - horizontal(24 * 2);
const IMAGE_HEIGHT = (IMAGE_WIDTH * 150) / 327;

const RenderExamInfo = ({ icon, textInfo, i18nKey }) => (
  <View style={styles.boxInfo}>
    {icon === 'time' && <IconClock style={styles.iconInfo} width={24} height={24} />}
    {icon === 'type' && <IconVideo style={styles.iconInfo} width={24} height={24} />}
    <CMText style={styles.textInfo} i18nKey={i18nKey} />
    <CMText style={styles.textInfo} title={textInfo} />
  </View>
);
const ExamIntroduction = (props) => {
  const { contentInfo } = props;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxContent}>
        <View style={styles.boxImage}>
          <CustomImage
            style={styles.imageContent}
            source={contentInfo?.avatar}
            resizeMode="stretch"
          />
        </View>

        <View style={{ marginVertical: vertical(15) }}>
          <CMText style={styles.textTitle} title={contentInfo?.title} />
        </View>
        <View>
          <RenderExamInfo
            icon="time"
            i18nKey="text-start"
            textInfo={`: ${contentInfo?.startDate}`}
          />
          <RenderExamInfo icon="time" i18nKey="text-end" textInfo={`: ${contentInfo?.endDate}`} />
        </View>
        <View style={styles.viewLine} />
        <View style={{ marginVertical: vertical(15) }}>
          <CMText style={styles.textInfo} title={contentInfo?.description} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContent: {
    marginHorizontal: horizontal(24),
  },
  imageAvatar: {
    width: 24,
    height: 24,
    marginRight: horizontal(8),
    borderRadius: 24,
  },
  imageContent: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    borderRadius: 16,
  },
  boxImage: {
    marginBottom: vertical(16),
  },
  boxData: {
    flexDirection: 'row',
    paddingHorizontal: horizontal(12),
    paddingVertical: vertical(4),
  },
  boxDataView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBoxData: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  fillView: {
    height: 16,
    width: 1,
    backgroundColor: Color.color_width_featured_class,
    alignSelf: 'center',
  },
  textTitle: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: textSize(20),
    lineHeight: textSize(35),
  },
  boxInfo: {
    flexDirection: 'row',
    marginBottom: vertical(16),
  },
  iconInfo: {
    marginRight: horizontal(8),
  },
  textInfo: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
  },
  btnView: {
    width: screenWidth - 48,
    height: 56,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(10),
    borderRadius: 100,
    backgroundColor: Color.base_color,
    marginTop: 8,
  },
  textView: {
    textAlign: 'center',
    color: Color.white,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
    letterSpacing: 0.4,
  },
  viewLine: {
    marginVertical: vertical(15),
    height: 10,
    backgroundColor: Color.color_bg_tab_view,
  },
});
const mixedStyle = {
  p: {
    color: Color.text_color,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.medium,
    letterSpacing: 0.3,
    lineHeight: 23.8,
  },
};
export default ExamIntroduction;
