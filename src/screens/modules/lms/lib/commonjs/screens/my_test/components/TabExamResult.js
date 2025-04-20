"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _platforms = require("@utils/platforms");
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _icon_checks = _interopRequireDefault(require("@assets/icons/icon_checks.svg"));
var _icon_cancel = _interopRequireDefault(require("@assets/icons/icon_cancel.svg"));
var _icon_next = _interopRequireDefault(require("@assets/icons/icon_next.svg"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _moment = _interopRequireDefault(require("moment"));
var _reactRedux = require("react-redux");
var _globalSlice = require("@store/reducers/globalSlice");
var _testclassusertestApi = require("../../../services/testclassusertest.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RenderButtonFooter = (onHandleEnterExam, isCurrentTestStatus, i18nKey) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
  style: [styles.btnEnterExam, {
    backgroundColor: _colors.Color.base_color
  }],
  onPress: onHandleEnterExam,
  disabled: isCurrentTestStatus === _constants.default.MY_TEST_STATUS.notStart || isCurrentTestStatus === _constants.default.MY_TEST_STATUS.finished || isCurrentTestStatus === _constants.default.MY_TEST_STATUS.overLimit,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: i18nKey,
    style: styles.textEnterExam
  })
});
const TabExamResult = props => {
  const {
    navigation,
    data,
    dataInformation,
    isCurrentTestStatus,
    classId,
    classContentId,
    classUserId,
    testFormId
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const onPressGoMyTestResult = item => {
    if (dataInformation?.showResultAll === true) {
      navigation.navigate(_constants.default.MY_TEST_RESULT_IN_CLASS_SCREEN, {
        idMyTest: item?.id,
        data: dataInformation
      });
    }
  };
  let i18nKey;
  switch (isCurrentTestStatus) {
    case _constants.default.MY_TEST_STATUS.notStart:
      i18nKey = 'text-button-not-start';
      break;
    case _constants.default.MY_TEST_STATUS.goingOn:
      i18nKey = 'text-button-going-on';
      break;
    case _constants.default.MY_TEST_STATUS.continuteDoing:
      i18nKey = 'text-button-continute-doing';
      break;
    case _constants.default.MY_TEST_STATUS.finished:
      i18nKey = 'text-button-finished';
      break;
    case _constants.default.MY_TEST_STATUS.overLimit:
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
  const itemResult = item => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
    style: [styles.viewItem],
    onPress: () => onPressGoMyTestResult(item),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.viewIcon, {
        backgroundColor: item?.mark >= dataInformation?.mincore ? _colors.Color.color_pass : _colors.Color.color_not_pass
      }],
      children: item?.mark >= dataInformation?.mincore ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_checks.default, {
        width: 20,
        height: 20
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_cancel.default, {
        width: 20,
        height: 20
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewContent,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: item?.mark >= dataInformation?.mincore ? 'text_status_pass' : 'text_status_no_pass',
        style: styles.textTitle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text_mark",
        style: styles.textResult,
        children: dataInformation?.showMark && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: `${item?.mark ?? 0}/${item?.totalMark}`,
          style: styles.textResult
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_CMText.default, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: `${(0, _moment.default)(item?.startTime).format('HH:mm - DD/MM/YYYY')}`,
          style: styles.textResult
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text_to_time",
          style: styles.textResult
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: `${(0, _moment.default)(item?.endTime).format('HH:mm - DD/MM/YYYY')}`,
          style: styles.textResult
        })]
      })]
    }), dataInformation?.showResultAll === true && /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_next.default, {
      width: 18,
      height: 18
    })]
  });

  /**
   * Đi đến màn làm bài thi.
   */
  const onHandleEnterExam = async () => {
    const params = {
      classId,
      /// Id lớp học
      classContentId,
      /// Id nội dung lớp học
      classUserId,
      /// Id học viên trong lớp
      testFormId,
      /// Id bài thi (Trường ContentOpenId trong api lấy data cây nội dung trả về)
      isExtraTest: data?.isExtraTest /// Xác định xem có phải là lần thi ngoại lệ (Bổ sung) hay không. Lấy thông tin tại api TestClassUserTest/GetTestFormInfo
    };
    const response = await (0, _testclassusertestApi.startTestMobile)(params);
    if (response?.status && response?.data) {
      const id = response?.data;
      navigation.navigate(_constants.default.MY_TEST_IN_CLASS_QUESTION_SCREEN, {
        id,
        dataMyTest: response?.data,
        timeCountDown: Math.floor(response?.data?.totalSeconds),
        data: dataInformation
      });
    } else {
      dispatch((0, _globalSlice.updateShowDialogWarnAction)({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-warning',
        keyMessage: response?.data?.code,
        contentMessage: '',
        isShowCancel: false
      }));
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    children: (dataInformation?.showResultAll === true || dataInformation?.showMark === true) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
        data: data,
        renderItem: ({
          item
        }) => itemResult(item),
        keyExtractor: (item, index) => index.toString(),
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderButtonFooter, {
        onHandleEnterExam: onHandleEnterExam,
        isCurrentTestStatus: isCurrentTestStatus,
        i18nKey: i18nKey
      })]
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {},
  viewItem: {
    flex: 1,
    height: 88,
    flexDirection: 'row',
    paddingHorizontal: (0, _scales.horizontal)(15),
    justifyContent: 'space-between',
    marginTop: (0, _scales.vertical)(15)
  },
  viewIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewContent: {
    flex: 1,
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 23.8
  },
  textResult: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    paddingVertical: (0, _scales.vertical)(3)
  },
  btnEnterExam: {
    height: 56,
    borderRadius: 100,
    marginTop: (0, _scales.vertical)(30),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _colors.Color.base_color,
    width: _platforms.screenWidth - (0, _scales.horizontal)(15 * 2),
    marginBottom: (0, _scales.vertical)(30)
  },
  textEnterExam: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    color: _colors.Color.white
  }
});
var _default = exports.default = TabExamResult;
//# sourceMappingURL=TabExamResult.js.map