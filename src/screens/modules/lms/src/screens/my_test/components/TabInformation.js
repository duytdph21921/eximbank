/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import TouchableDebounce from '@components/TouchableDebounce';
import { screenWidth } from '@utils/platforms';
import Constant from '@utils/constants';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import DialogWarnCustom from '@components/DialogWarnCustom';
import { startTestMobile } from '../../../services/testclassusertest.api';
import { checkPassWordTest } from '../../../services/lmsclasscontent.api';

const TabInformation = (props) => {
  const {
    navigation,
    data,
    isCurrentTestStatus,
    classId,
    classContentId,
    classUserId,
    testFormId,
    learningId,
    content,
    isPassWord,
  } = props;
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const listData = [
    {
      keyI18n: 'text-number-of-questions',
      value: data?.questionNum ?? '',
    },
    {
      keyI18n: 'text-time-to-do-homework',
      value: `${data?.timeTest ?? ''} `,
      time: true,
    },
    {
      keyI18n: 'text-start-time',
      value: data?.startTime
        ? moment(data?.startTime).format('HH:mm - DD/MM/YYYY')
        : '',
    },
    {
      keyI18n: 'text-end-time',
      value: data?.endTime
        ? moment(data?.endTime).format('HH:mm - DD/MM/YYYY')
        : '',
    },
    {
      keyI18n: 'text-how-to-get-points',
      value: data?.resultType === 1 ? 'text-nearest' : 'text-tallest',
      i18n: true,
    },
    {
      keyI18n: 'text-maximum-number-of-attempts',
      value: data?.testCount ?? '',
    },
    {
      keyI18n: 'text-number-of-times-you-have-done-the-test',
      value: data?.testedCount ?? '',
    },
  ];
  const [listInfo, setListInfo] = useState(listData);
  // Danh sach item thi ngoai le
  const listDataExtra = [
    {
      keyI18n: 'text-number-test-extra',
      value: data?.extraTestCount ?? '',
    },
    {
      keyI18n: 'text-number-tested-extra',
      value: data?.extraTestedCount ?? '',
    },
    {
      keyI18n: 'text-start-time-extra',
      value: data?.extraTestStartTime
        ? moment(data?.extraTestStartTime).format('HH:mm - DD/MM/YYYY')
        : '',
    },
    {
      keyI18n: 'text-end-time-extra',
      value: data?.extraTestEndTime
        ? moment(data?.extraTestEndTime).format('HH:mm - DD/MM/YYYY')
        : '',
    },
  ];

  useEffect(() => {
    if (data?.extraTestCount > 0) {
      const newListInfo = listData.concat(listDataExtra);
      setListInfo(newListInfo);
    }
  }, []);
  const itemInfor = ({ item }) => (
    <View style={styles.viewItem}>
      <CMText i18nKey={item?.keyI18n} style={styles.textTitle} />
      {item?.i18n ? (
        <CMText i18nKey={`${item?.value}`} style={styles.textResult} />
      ) : item?.time ? (
        <CMText title={`${item?.value} `} style={styles.textResult}>
          <CMText i18nKey="text-time-minute" style={styles.textResult} />
        </CMText>
      ) : (
        <CMText title={`${item?.value}`} style={styles.textResult} />
      )}
    </View>
  );

  /**
   * Đi đến màn làm bài thi.
   */
  const onHandleEnterExam = async () => {
    if (isPassWord) {
      setIsShow(true);
    } else {
      const params = {
        classId, /// Id lớp học
        classContentId, /// Id nội dung lớp học
        classUserId, /// Id học viên trong lớp
        testFormId, /// Id bài thi (Trường ContentOpenId trong api lấy data cây nội dung trả về)
        isExtraTest: data?.isExtraTest, /// Xác định xem có phải là lần thi ngoại lệ (Bổ sung) hay không. Lấy thông tin tại api TestClassUserTest/GetTestFormInfo
      };

      /**
       * Call api startTest
       */
      const response = await startTestMobile(params);
      if (response?.status && response?.data) {
        navigation.navigate(Constant.MY_TEST_IN_CLASS_QUESTION_SCREEN, {
          id: response?.data?.id,
          dataMyTest: response?.data,
          timeCountDown: Math.floor(response?.data?.totalSeconds),
          classId,
          classContentId,
          classUserId,
          data,
          learningId,
          content,
        });
      }
    }
  };
  const onHandleStartWithPassword = async (password) => {
    const model = {
      id: content?.id,
      passWordTest: password,
    };
    const response = await checkPassWordTest(model);
    if (response?.status) {
      const params = {
        classId, /// Id lớp học
        classContentId, /// Id nội dung lớp học
        classUserId, /// Id học viên trong lớp
        testFormId, /// Id bài thi (Trường ContentOpenId trong api lấy data cây nội dung trả về)
        isExtraTest: data?.isExtraTest, /// Xác định xem có phải là lần thi ngoại lệ (Bổ sung) hay không. Lấy thông tin tại api TestClassUserTest/GetTestFormInfo
      };
      const response1 = await startTestMobile(params);
      if (response1?.status && response1?.data) {
        navigation.navigate(Constant.MY_TEST_IN_CLASS_QUESTION_SCREEN, {
          id: response1?.data?.id,
          dataMyTest: response1?.data,
          timeCountDown: Math.floor(response1?.data?.totalSeconds),
          classId,
          classContentId,
          classUserId,
          data,
          learningId,
          content,
        });
      }
    } else {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-title-dialog-warn',
          keyMessage: 'ERR_INVALID_PASSWORD',
          contentMessage: '',
          isShowCancel: true,
          isShowSubmit: false,
          keyCancel: 'text-button-submit',
        })
      );
    }
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {listInfo.map((item) => itemInfor(item))}
      </ScrollView>
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
        <CMText
          i18nKey={
            isCurrentTestStatus === Constant.MY_TEST_STATUS.notStart
              ? 'text-button-not-start'
              : isCurrentTestStatus === Constant.MY_TEST_STATUS.goingOn
                ? 'text-button-going-on'
                : isCurrentTestStatus === Constant.MY_TEST_STATUS.continuteDoing
                  ? 'text-button-continute-doing'
                  : isCurrentTestStatus === Constant.MY_TEST_STATUS.finished
                    ? 'text-button-finished'
                    : isCurrentTestStatus === Constant.MY_TEST_STATUS.overLimit
                      ? 'text-button-over-limit'
                      : 'text-button-enter-exam'
          }
          style={styles.textEnterExam}
        />
      </TouchableDebounce>
      <DialogWarnCustom
        isShowModal={isShow}
        keyHeader="text-notification"
        cancelOnPress={() => {
          setIsShow(false);
        }}
        submitOnPress={(event) => {
          onHandleStartWithPassword(event);
        }}
        keyMessage="text-please-enter-password-registor"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  viewItem: {
    flex: 1,
    flexDirection: 'row',
    height: 56,
    borderRadius: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Color.color_border,
    marginHorizontal: horizontal(15),
    marginTop: vertical(15),
    paddingHorizontal: horizontal(15),
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
  },
  textResult: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20.4,
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

export default TabInformation;
