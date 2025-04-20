import { View, SafeAreaView, StyleSheet, Linking, ScrollView, NativeModules } from 'react-native';
import React from 'react';
import CMText from '@components/CMText';
import IconClock from '@assets/icons/icon_clock.svg';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import { isIOS, screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import moment from 'moment/moment';
import { GetTypeContent, checkListEmpty, replaceHtml, downloadFile } from '@utils/helpers';
import IconGlobal from '@assets/icons/icon_global.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import { useDispatch } from 'react-redux';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import IconExerciseClass from '@assets/icons/icon_exercise_class.svg';
import globalStyles from '@theme/globalStyles';
import he from 'he';

const ViewContent = (props) => {
  const { classContent } = props;
  const dispatch = useDispatch();

  const source = {
    html: classContent?.description ?? '',
  };
  const getDateString = (dateString) => {
    let re = '';
    let date;
    if (dateString) {
      date = moment(dateString).add(7, 'h').toDate();
      re =
        `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}/` +
        `${date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}/${date.getFullYear()}`;
    }
    return re;
  };
  const handleOpenLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else if (!isIOS) {
      Linking.openURL(url).catch(() => {
        NativeModules.IntentLauncher.startActivity({
          action: 'android.intent.action.VIEW',
          data: url,
        });
      });
    } else {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-title-dialog-warn',
          keyMessage: 'text-not-open-url',
          contentMessage: '',
          isShowCancel: false,
          isShowSubmit: false,
        }),
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled bounces={false} showsVerticalScrollIndicator={false}>
        <View>
          <CMText title={classContent.title} style={styles.headerTitle} />
        </View>
        <View style={styles.flexInfoDetail}>
          {(classContent?.startDate || classContent?.endDate) && (
            <>
              <IconClock width={20} height={20} style={styles.icon} />
              <CMText
                title={`${classContent?.startDate ? getDateString(classContent?.startDate) : ''}${
                  classContent?.endDate ? ` - ${getDateString(classContent?.endDate)}` : ''
                }`}
                style={styles.textInfo}
              />
            </>
          )}
        </View>
        <View>
          {source.html != null || source.html !== '' ? (
            <CMText
              title={`${he.decode(replaceHtml(source?.html ?? ''))} `}
              style={globalStyles.textDetail}
            />
          ) : (
            <View />
          )}
        </View>
        {/* Link đính kèm */}
        <View>
          <CMText i18nKey="text-link-attached" style={styles.attachedLink} />
          {classContent && classContent.typeId === GetTypeContent.link && (
            <TouchableDebounce onPress={() => handleOpenLink(classContent?.contentDetail)}>
              <View style={styles.flexInfoDetail}>
                <IconGlobal width={16} height={16} style={styles.icon} />
                <CMText style={styles.textInfo} title={classContent?.contentDetail} />
              </View>
            </TouchableDebounce>
          )}
          {classContent?.fileId && (
            <TouchableDebounce onPress={() => downloadFile(classContent?.fileId, dispatch)}>
              <View style={styles.fileItem}>
                <IconExerciseClass width={16} height={16} style={styles.icon} />
                <CMText style={styles.textItem} title={classContent?.fileId} />
              </View>
            </TouchableDebounce>
          )}
          {checkListEmpty(classContent?.contentFile) && (
            <View>
              {classContent?.contentFile.map((item, index) => (
                <View key={`${index + 1}`}>
                  <TouchableDebounce onPress={() => downloadFile(item?.fileId, dispatch)}>
                    <View style={styles.fileItem}>
                      <IconExerciseClass width={16} height={16} style={styles.icon} />
                      <CMText style={styles.textItem} title={item?.title} />
                    </View>
                  </TouchableDebounce>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontal(24),
    marginTop: 10,
  },
  flexInfoDetail: {
    flexDirection: 'row',
    paddingVertical: vertical(8),
  },
  icon: {
    marginRight: horizontal(10),
    paddingVertical: vertical(8),
  },
  textInfo: {
    textAlignVertical: 'center',
    alignItems: 'center',
    lineHeight: 20.4,
    fontFamily: fonts.regular,
    fontSize: 12,
    fontWeight: '400',
    color: Color.text_color,
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 38.4,
  },
  attachedLink: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 23.8,
    color: Color.text_color_hover,
  },
  fileItem: {
    flexDirection: 'row',
  },
  textItem: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 23.8,
    fontStyle: 'italic',
    width: screenWidth * 0.8,
  },
});
export default ViewContent;
