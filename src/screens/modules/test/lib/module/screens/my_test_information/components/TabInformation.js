"use strict";

/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import DialogWarnCustom from '@components/DialogWarnCustom';
import { startTest } from "../../../services/testregistorusertest.api.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const TabInformation = props => {
  const {
    navigation,
    type,
    data,
    isCurrentTestStatus,
    idBack,
    params
  } = props;
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const listData = [{
    keyI18n: 'text-number-of-questions',
    value: data?.questionNum ?? ''
  }, {
    keyI18n: 'text-time-to-do-homework',
    value: `${data?.timeTest ?? ''}`,
    time: true
  }, {
    keyI18n: 'text-start-time',
    value: data?.startTime ? moment(data?.startTime).format('HH:mm - DD/MM/YYYY') : ''
  }, {
    keyI18n: 'text-end-time',
    value: data?.endTime ? moment(data?.endTime).format('HH:mm - DD/MM/YYYY') : ''
  }, {
    keyI18n: 'text-how-to-get-points',
    value: data?.resultType === 1 ? 'text-nearest' : 'text-tallest',
    i18n: true
  }, {
    keyI18n: 'text-maximum-number-of-attempts',
    value: data?.testCount ?? ''
  }, {
    keyI18n: 'text-number-of-times-you-have-done-the-test',
    value: data?.testedCount ?? ''
  }];
  const [listInfo, setListInfo] = useState(listData);
  // Danh sach item thi ngoai le
  const listDataExtra = [{
    keyI18n: 'text-number-test-extra',
    value: data?.extraTestCount ?? ''
  }, {
    keyI18n: 'text-number-tested-extra',
    value: data?.extraTestedCount ?? ''
  }, {
    keyI18n: 'text-start-time-extra',
    value: data?.extraTestStartTime ? moment(data?.extraTestStartTime).format('HH:mm - DD/MM/YYYY') : ''
  }, {
    keyI18n: 'text-end-time-extra',
    value: data?.extraTestEndTime ? moment(data?.extraTestEndTime).format('HH:mm - DD/MM/YYYY') : ''
  }];
  useEffect(() => {
    if (data?.extraTestCount > 0) {
      const newListInfo = listData.concat(listDataExtra);
      setListInfo(newListInfo);
    }
  }, []);
  const itemInfor = (item, index) => /*#__PURE__*/_jsxs(View, {
    style: styles.viewItem,
    children: [/*#__PURE__*/_jsx(CMText, {
      i18nKey: item?.keyI18n,
      style: styles.textTitle
    }), item?.i18n ? /*#__PURE__*/_jsx(CMText, {
      i18nKey: `${item?.value}`,
      style: styles.textResult
    }) : item?.time ? /*#__PURE__*/_jsx(CMText, {
      title: `${item?.value} `,
      style: styles.textResult,
      children: /*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-time-minute",
        style: styles.textResult
      })
    }) : /*#__PURE__*/_jsx(CMText, {
      title: `${item?.value}`,
      style: styles.textResult
    })]
  }, `item${index}`);

  /**
   * Đi đến màn làm bài thi.
   */
  const onHandleEnterExam = async () => {
    if (isCurrentTestStatus === Constant.MY_TEST_STATUS.goingOn) {
      if (data?.password) {
        setIsShow(true);
      } else {
        const params = {
          registorId: data?.registorId,
          registorUserId: data?.testRegistorUser?.id,
          testFormId: data?.testFormId,
          securityCode: null,
          isExtraTest: data?.extraTestCount != null && data?.extraTestCount !== 0
        };
        /**
         * Call api startTest
         */
        const response = await startTest(params);
        if (response?.status && response?.data) {
          const id = response?.data;
          navigation.navigate(Constant.MY_TEST_QUESTION_SCREEN, {
            id,
            data
          });
        }
      }
    } else if (isCurrentTestStatus === Constant.MY_TEST_STATUS.continuteDoing) {
      navigation.navigate(Constant.MY_TEST_QUESTION_SCREEN, {
        id: data?.doingTestId,
        data
      });
    }
  };
  const onHandleStartWithPassword = async password => {
    /**
     * Call api startTest
     */
    const params = {
      registorId: data?.registorId,
      registorUserId: data?.testRegistorUser?.id,
      testFormId: data?.testFormId,
      securityCode: password,
      isExtraTest: data?.extraTestCount != null && data?.extraTestCount !== 0
    };
    if (isCurrentTestStatus === Constant.MY_TEST_STATUS.goingOn) {
      const response = await startTest(params);
      setIsShow(false);
      if (response?.status && response?.data) {
        const id = response?.data;
        navigation.navigate(Constant.MY_TEST_QUESTION_SCREEN, {
          id,
          data
        });
      } else {
        dispatch(updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-title-dialog-warn',
          keyMessage: 'ERR_INVALID_PASSWORD',
          contentMessage: '',
          isShowCancel: true,
          isShowSubmit: false,
          keyCancel: 'text-button-submit'
        }));
      }
    } else if (isCurrentTestStatus === Constant.MY_TEST_STATUS.continuteDoing) {
      navigation.navigate(Constant.MY_TEST_QUESTION_SCREEN, {
        id: data?.doingTestId,
        data
      });
    }
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ScrollView, {
      contentContainerStyle: styles.container,
      showsVerticalScrollIndicator: false,
      children: listInfo.map((item, index) => itemInfor(item, index))
    }), /*#__PURE__*/_jsx(TouchableDebounce, {
      style: [styles.btnEnterExam, {
        backgroundColor: Color.base_color
      }],
      onPress: onHandleEnterExam,
      children: /*#__PURE__*/_jsx(CMText, {
        i18nKey: isCurrentTestStatus === Constant.MY_TEST_STATUS.notStart ? 'text-button-not-start' : isCurrentTestStatus === Constant.MY_TEST_STATUS.goingOn ? 'text-button-going-on' : isCurrentTestStatus === Constant.MY_TEST_STATUS.continuteDoing ? 'text-button-continute-doing' : isCurrentTestStatus === Constant.MY_TEST_STATUS.finished ? 'text-button-finished' : isCurrentTestStatus === Constant.MY_TEST_STATUS.overLimit ? 'text-button-over-limit' : '',
        style: styles.textEnterExam
      })
    }), /*#__PURE__*/_jsx(DialogWarnCustom, {
      isShowModal: isShow,
      keyHeader: "text-notification",
      cancelOnPress: () => {
        setIsShow(false);
      },
      submitOnPress: event => {
        onHandleStartWithPassword(event);
      },
      keyMessage: "text-please-enter-password-registor"
    })]
  });
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
    alignItems: 'center'
  },
  textTitle: {
    fontSize: textSize(14),
    fontWeight: '400',
    lineHeight: textSize(23.8)
  },
  textResult: {
    fontSize: textSize(12),
    fontWeight: '700',
    lineHeight: textSize(20.4)
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
    marginBottom: vertical(30)
  },
  textEnterExam: {
    fontSize: textSize(16),
    fontWeight: '700',
    lineHeight: textSize(26.4),
    color: Color.white
  }
});
export default TabInformation;
//# sourceMappingURL=TabInformation.js.map