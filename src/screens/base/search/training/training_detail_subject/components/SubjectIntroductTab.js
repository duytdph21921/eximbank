import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { replaceHtml } from '@utils/helpers';
import IconClock from '@assets/icons/icon_clock.svg';
import IconCalenda from '@assets/other/icon_calendar.svg';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import { horizontal, textSize, vertical } from '@utils/scales';
import { screenWidth } from '@utils/platforms';
import CustomImage from '@components/CustomImage';
import globalStyles from '@theme/globalStyles';
import he from 'he';

const SubjectIntroductTab = (props) => {
  const { subjectData } = props;
  const [source, setSource] = useState({
    html: subjectData?.description ?? '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.classInfo}>
          <CustomImage style={styles.imageItemClass} source={subjectData?.avatar} />
          <View style={styles.classBox}>
            <CMText style={styles.textClassTitle} title={subjectData?.title} />
          </View>
          <View style={styles.classBox}>
            <View style={styles.flexInfoDetail}>
              <IconCalenda width={24} height={24} style={styles.icon} />
              <CMText style={styles.textInfo} i18nKey="text-title-type-subject">
                <CMText title={` ${subjectData?.fieldName ?? ''}`} style={styles.textInfo} />
              </CMText>
            </View>
            <View style={styles.flexInfoDetail}>
              <IconClock width={24} height={24} style={styles.icon} />
              <CMText style={styles.textInfo} i18nKey="text-time-subject-detail">
                <CMText title={` ${subjectData?.duration} `} style={styles.textInfo} />
                <CMText i18nKey="text-time-subject" style={styles.textInfo} />
              </CMText>
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
    height: 150,
    width: screenWidth - horizontal(24 * 2),
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
export default SubjectIntroductTab;
