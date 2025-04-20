import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import IconCancel from '@assets/icons/icon_cancel.svg';
import IconCheck from '@assets/icons/icon_checks.svg';
import IconNext from '@assets/icons/icon_next.svg';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import DialogWarnCustom from '@components/DialogWarnCustom';
import { startTest } from '../../../services/testregistorusertest.api';

const TabExamResult = (props) => {
  const {
    navigation,
    type,
    data,
    dataInformation,
    isCurrentTestStatus,
    idBack,
    params,
  } = props;
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);

  const onPressGoMyTestResult = (item) => {
    if (
      dataInformation?.showResultQuestion === true ||
      dataInformation?.showResultAll === true
    ) {
      navigation.navigate(Constant.MY_TEST_RESULT_SCREEN, {
        idMyTest: item?.id,
        showMark: dataInformation?.showMark,
        showResultAll: dataInformation?.showResultAll,
        showResultQuestion: dataInformation?.showResultQuestion,
        showQuestionAnswer: dataInformation?.showQuestionAnswer,
      });
    }
  };

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
            backgroundColor: item?.isPass
              ? Color.color_pass
              : Color.color_not_pass,
          },
        ]}
      >
        {item?.isPass ? (
          <IconCheck width={20} height={20} />
        ) : (
          <IconCancel width={20} height={20} />
        )}
      </View>
      <View style={styles.viewContent}>
        <CMText
          i18nKey={item?.isPass ? 'text_status_pass' : 'text_status_no_pass'}
          style={styles.textTitle}
        />
        <CMText i18nKey="text_mark" style={styles.textResult}>
          {dataInformation?.showMark === true && (
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

      {(dataInformation?.showResultQuestion === true ||
        dataInformation?.showResultAll === true) && (
        <IconNext width={18} height={18} />
      )}
    </TouchableDebounce>
  );

  /**
   * Đi đến màn làm bài thi.
   */
  const onHandleEnterExam = async () => {
    if (isCurrentTestStatus === Constant.MY_TEST_STATUS.goingOn) {
      if (dataInformation?.password) {
        setIsShow(true);
      } else {
        const params = {
          registorId: dataInformation?.registorId,
          registorUserId: dataInformation?.testRegistorUser?.id,
          testFormId: dataInformation?.testFormId,
          securityCode: null,
          isExtraTest:
            dataInformation?.extraTestCount != null &&
            dataInformation?.extraTestCount !== 0,
        };
        /**
         * Call api startTest
         */
        const response = await startTest(params);
        if (response?.status && response?.data) {
          const id = response?.data;
          navigation.navigate(Constant.MY_TEST_QUESTION_SCREEN, {
            id,
            data: dataInformation,
          });
        }
      }
    } else if (isCurrentTestStatus === Constant.MY_TEST_STATUS.continuteDoing) {
      navigation.navigate(Constant.MY_TEST_QUESTION_SCREEN, {
        id: dataInformation?.doingTestId,
        data: dataInformation,
      });
    }
  };
  const onHandleStartWithPassword = async (password) => {
    /**
     * Call api startTest
     */
    const params = {
      registorId: dataInformation?.registorId,
      registorUserId: dataInformation?.testRegistorUser?.id,
      testFormId: dataInformation?.testFormId,
      securityCode: password,
      isExtraTest:
        dataInformation?.extraTestCount != null &&
        dataInformation?.extraTestCount !== 0,
    };
    if (isCurrentTestStatus === Constant.MY_TEST_STATUS.goingOn) {
      const response = await startTest(params);
      setIsShow(false);
      if (response?.status && response?.data) {
        const id = response?.data;
        navigation.navigate(Constant.MY_TEST_QUESTION_SCREEN, {
          id,
          data: dataInformation,
        });
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
    } else {
      navigation.navigate(Constant.MY_TEST_QUESTION_SCREEN, {
        id: dataInformation?.doingTestId,
        data: dataInformation,
      });
    }
  };
  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => itemResult(item)}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <TouchableDebounce
        style={[
          styles.btnEnterExam,
          {
            backgroundColor: Color.base_color,
          },
        ]}
        onPress={onHandleEnterExam}
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
                      : ''
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
