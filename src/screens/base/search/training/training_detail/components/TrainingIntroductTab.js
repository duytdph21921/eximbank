import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconClock from '@assets/icons/icon_clock.svg';
import IconSubject from '@assets/other/icon_subject.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import { Color } from '@theme/colors';
import globalStyles from '@theme/globalStyles';
import { replaceHtml } from '@utils/helpers';
import he from 'he';

const IMAGE_WIDTH = screenWidth - horizontal(24 * 2);
const IMAGE_HEIGHT = (IMAGE_WIDTH * 150) / 327;

const TrainingIntroductTab = (props) => {
  const { trainingInfo } = props;
  const source = {
    html: trainingInfo?.description ?? '',
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.classInfo}>
          <CustomImage style={styles.imageItemClass} source={trainingInfo?.avatar} />
          <View style={styles.classBox}>
            <CMText style={styles.textClassTitle} title={trainingInfo?.title} />
          </View>
          <View style={styles.classBox}>
            <View style={styles.flexInfoDetail}>
              {(trainingInfo?.startDate !== '' || trainingInfo?.endDate !== '') && (
                <IconClock width={24} height={24} style={styles.icon} />
              )}
              <CMText
                title={`${trainingInfo?.startDate ?? ''}${
                  trainingInfo?.endDate ? ` - ${trainingInfo?.endDate}` : ''
                }`}
                style={styles.textInfo}
              />
            </View>
            <View style={styles.flexInfoDetail}>
              <IconSubject width={24} height={24} style={styles.icon} />
              <CMText style={styles.textInfo} title={`${trainingInfo?.numSubject} `} />
              <CMText style={styles.textInfo} i18nKey="text-subject" />
            </View>
            {source.html != null && source.html !== '' && (
              // <RenderHTML
              //   contentWidth={screenWidth - 48}
              //   source={source}
              //   tagsStyles={mixedStyle}
              // />
              <CMText
                title={`${he.decode(replaceHtml(source.html ?? ''))} `}
                style={globalStyles.textNomal}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  classInfo: {
    paddingHorizontal: horizontal(24),
    backgroundColor: Color.white,
  },
  imageItemClass: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    alignSelf: 'flex-start',
    borderRadius: 16,
  },
  classBox: {
    marginTop: 24,
  },
  textClassTitle: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: textSize(20),
    lineHeight: textSize(35),
  },
  flexInfoDetail: {
    flexDirection: 'row',
    marginBottom: vertical(16),
  },
  lineHight: {
    width: screenWidth - 48,
    height: 10,
    backgroundColor: Color.color_bg_tab_view,
    borderColor: Color.color_bg_featured_class,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 14,
  },
  btnLearn: {
    width: screenWidth - 48,
    height: 56,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(10),
    borderRadius: 100,
    backgroundColor: Color.base_color,
    marginTop: 8,
  },
  textLearn: {
    textAlign: 'center',
    color: Color.white,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
  },
  icon: {
    marginRight: horizontal(10),
  },
  textInfo: {
    textAlignVertical: 'center',
    alignItems: 'center',
    lineHeight: 24,
  },
  textWarning: {
    textAlign: 'center',
    color: Color.red,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
  },
});
export default TrainingIntroductTab;
