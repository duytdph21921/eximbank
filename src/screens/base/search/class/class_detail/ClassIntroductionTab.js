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
import he from 'he';
import globalStyles from '@theme/globalStyles';

const IMAGE_WIDTH = screenWidth - horizontal(24 * 2);
const IMAGE_HEIGHT = (IMAGE_WIDTH * 150) / 327;

const ClassIntroductionTab = (props) => {
  const { classInfo, handelJoinClass, handelUnRegisterClass } = props;
  const source = {
    html: classInfo?.description ?? '',
  };

  const getNotificationKey = (status) => {
    switch (status) {
      case 3:
        return 'text-class-has-limit-user';
      case 4:
        return 'text-class-has-limit-register';
      case 5:
        return 'text-class-not-time-to-register-yet';
      case 6:
        return 'text-class-registration-not-allowed';
      case 8:
        return 'text-classes-are-pending-approval';
      default:
        return '';
    }
  };

  const getStatusClassKey = (status) => {
    switch (status) {
      case 1:
        return 'text-class-has-not-started-yet';
      case 2:
        return 'text-class-has-limit-ended';
      default:
        return '';
    }
  };

  const renderTextNotificationClass = () => (
    <CMText style={styles.textWarning} i18nKey={getNotificationKey(classInfo?.statusRegister)} />
  );

  const renderTextStatusClass = () => (
    <CMText style={styles.textWarning} i18nKey={getStatusClassKey(classInfo?.statusClass)} />
  );

  const onJoinClass = (status) => {
    handelJoinClass(status);
  };
  const onUnRegisterClass = (status) => {
    handelUnRegisterClass(status);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.classInfo}>
          <CustomImage style={styles.imageItemClass} source={classInfo?.avatar} />
          <View style={styles.classBox}>
            <CMText style={styles.textClassTitle} title={classInfo?.title} />
          </View>
          <View style={styles.classBox}>
            <View style={styles.flexInfoDetail}>
              {(classInfo?.startDate != null || classInfo?.endDate !== '') && (
                <IconClock width={24} height={24} style={styles.icon} />
              )}
              <CMText
                title={`${classInfo?.startDate ?? ''}${
                  classInfo?.endDate ? ` - ${classInfo?.endDate}` : ''
                }`}
                style={styles.textInfo}
              />
            </View>
            <View style={styles.flexInfoDetail}>
              <IconGlobal width={24} height={24} style={styles.icon} />
              <CMText i18nKey="text-form-test" style={styles.textInfo} />
              <CMText style={styles.textInfo} title={classInfo?.classTypeName} />
            </View>
            <View style={styles.flexInfoDetail}>
              <IconNotes width={24} height={24} style={styles.icon} />
              <CMText i18nKey="text-registration-form" style={styles.textInfo} />
              <CMText title={classInfo?.registerTypeName} style={styles.textInfo} />
            </View>
            <View style={styles.flexInfoDetail}>
              <IconUsers width={24} height={24} style={styles.icon} />
              <CMText style={styles.textInfo} title={`${classInfo?.numUser} `} />
              <CMText style={styles.textInfo} i18nKey="text-form-student-number" />
            </View>
          </View>
          <View style={styles.lineHight} />
          <View>
            {(source.html != null || source.html !== '') && (
              <CMText
                title={`${he.decode(replaceHtml(source.html ?? ''))} `}
                style={globalStyles.classDescription}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.viewButtonClass}>
        {(classInfo?.statusRegister === 2 || classInfo?.statusRegister === 1) && (
          <TouchableDebounce
            onPress={() => {
              onJoinClass(classInfo?.statusRegister);
            }}
            style={[
              styles.btnLearn,
              {
                backgroundColor: Color.base_color,
              },
            ]}
          >
            <CMText style={styles.textLearn} i18nKey="text-register-class" />
          </TouchableDebounce>
        )}
        {classInfo?.statusRegister === 7 && classInfo?.statusClass === 3 && (
          <TouchableDebounce
            onPress={() => {
              onJoinClass(classInfo?.statusRegister);
            }}
            style={[
              styles.btnLearn,
              {
                backgroundColor: Color.base_color,
              },
            ]}
          >
            <CMText style={styles.textLearn} i18nKey="text-join-class" />
          </TouchableDebounce>
        )}
        {classInfo?.statusRegister !== 1 &&
          classInfo?.statusRegister !== 2 &&
          classInfo?.statusRegister !== 7 &&
          renderTextNotificationClass()}
        {classInfo?.statusRegister !== 1 &&
          classInfo?.statusRegister !== 2 &&
          classInfo?.statusClass !== 3 &&
          renderTextStatusClass()}
        {classInfo?.statusRegister === 8 && (
          <TouchableDebounce
            onPress={() => {
              onUnRegisterClass(classInfo?.statusRegister);
            }}
            style={[
              styles.btnLearn,
              {
                backgroundColor: Color.base_color,
              },
            ]}
          >
            <CMText style={styles.textLearn} i18nKey="text-classes-cancel-registration" />
          </TouchableDebounce>
        )}
      </View>
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
  textWarning: {
    textAlign: 'center',
    color: Color.red,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
  },
  viewButtonClass: {
    height: 56,
    borderRadius: 100,
    marginTop: vertical(30),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vertical(30),
  },
});

export default ClassIntroductionTab;
