import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { isTablet, screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconClock from '@assets/icons/icon_clock.svg';
import IconGlobal from '@assets/icons/icon_global.svg';
import IconNotes from '@assets/icons/icon_notes.svg';
import IconUsers from '@assets/icons/icon_users.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { replaceHtml } from '@utils/helpers';
import globalStyles from '@theme/globalStyles';
import he from 'he';

const IMAGE_WIDTH = screenWidth - horizontal(24 * 2);
const IMAGE_HEIGHT = (IMAGE_WIDTH * 150) / 327;

const IntroductionScreen = (props) => {
  const { classInfo, onPressLearn } = props;
  const source = {
    html: classInfo?.description ?? '',
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        scrollEnabled
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.classInfo}>
          <CustomImage
            style={styles.imageItemClass}
            source={classInfo?.avatar}
          />
          <View style={styles.classBox}>
            <CMText style={styles.textClassTitle} title={classInfo?.title} />
          </View>
          <View style={styles.classBox}>
            <View style={styles.flexInfoDetail}>
              {(classInfo?.startDate !== '' || classInfo?.endDate !== '') && (
                <IconClock width={24} height={24} style={styles.icon} />
              )}
              <CMText
                title={`${classInfo?.startDate ?? ''}${
                  classInfo?.endDate ? ` - ${classInfo?.endDate ?? ''}` : ''
                }`}
                style={styles.textInfo}
              />
            </View>
            <View style={styles.flexInfoDetail}>
              <IconGlobal width={24} height={24} style={styles.icon} />
              <CMText style={styles.textInfo} i18nKey="text-form-test" />
              <CMText
                style={styles.textInfo}
                title={classInfo?.classTypeName}
              />
            </View>
            <View style={styles.flexInfoDetail}>
              <IconNotes width={24} height={24} style={styles.icon} />
              <CMText
                i18nKey="text-registration-form"
                style={styles.textInfo}
              />
              <CMText
                title={classInfo?.registerTypeName}
                style={styles.textInfo}
              />
            </View>
            <View style={styles.flexInfoDetail}>
              <IconUsers width={24} height={24} style={styles.icon} />
              <CMText
                style={styles.textInfo}
                title={`${classInfo?.numUser ?? 0} `}
              />
              <CMText
                style={styles.textInfo}
                i18nKey="text-form-student-number"
              />
            </View>
          </View>
          <View style={styles.lineHight} />
          <View>
            {source.html != null ||
              (source.html !== '' && (
                <CMText
                  title={`${he.decode(replaceHtml(source.html ?? ''))} `}
                  style={globalStyles.textNomal}
                />
              ))}
          </View>
          <View>
            {!classInfo?.isCloseClass &&
              (classInfo?.isNotStartClass ? (
                <CMText
                  i18nKey="text-class-over-time"
                  style={styles.textClassClose}
                />
              ) : (
                <TouchableDebounce
                  onPress={onPressLearn}
                  style={[
                    styles.btnLearn,
                    {
                      backgroundColor: Color.base_color,
                    },
                  ]}
                >
                  <CMText i18nKey="text-join-class" style={styles.textLearn} />
                </TouchableDebounce>
              ))}
            {classInfo?.isCloseClass && (
              <CMText
                i18nKey="text-class-over-time"
                style={styles.textClassClose}
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
    padding: horizontal(24),
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
    borderColor: Color.color_border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 14,
  },
  btnLearn: {
    width: screenWidth - horizontal(24 * 2),
    height: isTablet ? 65 : 56,
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
  textClassClose: {
    textAlign: 'center',
    color: Color.red,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
  },
});
export default IntroductionScreen;
