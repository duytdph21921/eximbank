import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import { screenWidth } from '@utils/platforms';
import TouchableDebounce from '@components/TouchableDebounce';
import IconCheck from '@assets/icons/icon_checks.svg';
import IconCancel from '@assets/icons/icon_cancel.svg';
import IconNext from '@assets/icons/icon_next.svg';
import Constant from '@utils/constants';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import { startTestMobile } from '../../../services/testclassusertest.api';

const RenderButtonFooter = (
  onHandleEnterExam,
  isCurrentTestStatus,
  i18nKey
) => (
  <TouchableDebounce
    style={[
      styles.btnEnterExam,
      {
        backgroundColor: Color.base_color,
      },
    ]}
    onPress={onHandleEnterExam}
    disabled={
      isCurrentTestStatus === Constant.MY_TEST_STATUS.notStart ||
      isCurrentTestStatus === Constant.MY_TEST_STATUS.finished ||
      isCurrentTestStatus === Constant.MY_TEST_STATUS.overLimit
    }
  >
    <CMText i18nKey={i18nKey} style={styles.textEnterExam} />
  </TouchableDebounce>
);

const TabExamResult = (props) => {
  const {
    navigation,
    data,
    dataInformation,
    isCurrentTestStatus,
    classId,
    classContentId,
    classUserId,
    testFormId,
  } = props;
  const dispatch = useDispatch();

  const onPressGoMyTestResult = (item) => {
    if (dataInformation?.showResultAll === true) {
      navigation.navigate(Constant.MY_TEST_RESULT_IN_CLASS_SCREEN, {
        idMyTest: item?.id,
        data: dataInformation,
      });
    }
  };
  let i18nKey;
  switch (isCurrentTestStatus) {
    case Constant.MY_TEST_STATUS.notStart:
      i18nKey = 'text-button-not-start';
      break;
    case Constant.MY_TEST_STATUS.goingOn:
      i18nKey = 'text-button-going-on';
      break;
    case Constant.MY_TEST_STATUS.continuteDoing:
      i18nKey = 'text-button-continute-doing';
      break;
    case Constant.MY_TEST_STATUS.finished:
      i18nKey = 'text-button-finished';
      break;
    case Constant.MY_TEST_STATUS.overLimit:
      i18nKey = 'text-button-over-limit';
      break;
    default:
      i18nKey = 'text-button-enter-exam';
  }
  /**
   * Render item result.
   * @param {*} param0
   * @returns
   */
  const itemResult = (item) => (
    <TouchableDebounce
      style={[styles.viewItem]}
      onPress={() => onPressGoMyTestResult(item)}
    >
      <View
        style={[
          styles.viewIcon,
          {
            backgroundColor:
              item?.mark >= dataInformation?.mincore
                ? Color.color_pass
                : Color.color_not_pass,
          },
        ]}
      >
        {item?.mark >= dataInformation?.mincore ? (
          <IconCheck width={20} height={20} />
        ) : (
          <IconCancel width={20} height={20} />
        )}
      </View>
      <View style={styles.viewContent}>
        <CMText
          i18nKey={
            item?.mark >= dataInformation?.mincore
              ? 'text_status_pass'
              : 'text_status_no_pass'
          }
          style={styles.textTitle}
        />
        <CMText i18nKey="text_mark" style={styles.textResult}>
          {dataInformation?.showMark && (
            <CMText
              title={`${item?.mark ?? 0}/${item?.totalMark}`}
              style={styles.textResult}
            />
          )}
        </CMText>
        <CMText>
          <CMText
            title={`${moment(item?.startTime).format('HH:mm - DD/MM/YYYY')}`}
            style={styles.textResult}
          />
          <CMText i18nKey="text_to_time" style={styles.textResult} />
          <CMText
            title={`${moment(item?.endTime).format('HH:mm - DD/MM/YYYY')}`}
            style={styles.textResult}
          />
        </CMText>
      </View>
      {dataInformation?.showResultAll === true && (
        <IconNext width={18} height={18} />
      )}
    </TouchableDebounce>
  );

  /**
   * Đi đến màn làm bài thi.
   */
  const onHandleEnterExam = async () => {
    const params = {
      classId, /// Id lớp học
      classContentId, /// Id nội dung lớp học
      classUserId, /// Id học viên trong lớp
      testFormId, /// Id bài thi (Trường ContentOpenId trong api lấy data cây nội dung trả về)
      isExtraTest: data?.isExtraTest, /// Xác định xem có phải là lần thi ngoại lệ (Bổ sung) hay không. Lấy thông tin tại api TestClassUserTest/GetTestFormInfo
    };
    const response = await startTestMobile(params);
    if (response?.status && response?.data) {
      const id = response?.data;
      navigation.navigate(Constant.MY_TEST_IN_CLASS_QUESTION_SCREEN, {
        id,
        dataMyTest: response?.data,
        timeCountDown: Math.floor(response?.data?.totalSeconds),
        data: dataInformation,
      });
    } else {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-warning',
          keyMessage: response?.data?.code,
          contentMessage: '',
          isShowCancel: false,
        })
      );
    }
  };

  return (
    <View>
      {(dataInformation?.showResultAll === true ||
        dataInformation?.showMark === true) && (
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => itemResult(item)}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
          <RenderButtonFooter
            onHandleEnterExam={onHandleEnterExam}
            isCurrentTestStatus={isCurrentTestStatus}
            i18nKey={i18nKey}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  viewItem: {
    flex: 1,
    height: 88,
    flexDirection: 'row',
    paddingHorizontal: horizontal(15),
    justifyContent: 'space-between',
    marginTop: vertical(15),
  },
  viewIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContent: {
    flex: 1,
    paddingHorizontal: horizontal(15),
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 23.8,
  },
  textResult: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    paddingVertical: vertical(3),
  },
  btnEnterExam: {
    height: 56,
    borderRadius: 100,
    marginTop: vertical(30),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.base_color,
    width: screenWidth - horizontal(15 * 2),
    marginBottom: vertical(30),
  },
  textEnterExam: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    color: Color.white,
  },
});
export default TabExamResult;
