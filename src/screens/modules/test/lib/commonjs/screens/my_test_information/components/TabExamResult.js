"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _icon_cancel = _interopRequireDefault(require("@assets/icons/icon_cancel.svg"));
var _icon_checks = _interopRequireDefault(require("@assets/icons/icon_checks.svg"));
var _icon_next = _interopRequireDefault(require("@assets/icons/icon_next.svg"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _globalSlice = require("@store/reducers/globalSlice");
var _DialogWarnCustom = _interopRequireDefault(require("@components/DialogWarnCustom"));
var _testregistorusertestApi = require("../../../services/testregistorusertest.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TabExamResult = props => {
  const {
    navigation,
    type,
    data,
    dataInformation,
    isCurrentTestStatus,
    idBack,
    params
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const [isShow, setIsShow] = (0, _react.useState)(false);
  const onPressGoMyTestResult = item => {
    if (dataInformation?.showResultQuestion === true || dataInformation?.showResultAll === true) {
      navigation.navigate(_constants.default.MY_TEST_RESULT_SCREEN, {
        idMyTest: item?.id,
        showMark: dataInformation?.showMark,
        showResultAll: dataInformation?.showResultAll,
        showResultQuestion: dataInformation?.showResultQuestion,
        showQuestionAnswer: dataInformation?.showQuestionAnswer
      });
    }
  };

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
        backgroundColor: item?.isPass ? _colors.Color.color_pass : _colors.Color.color_not_pass
      }],
      children: item?.isPass ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_checks.default, {
        width: 20,
        height: 20
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_cancel.default, {
        width: 20,
        height: 20
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewContent,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: item?.isPass ? 'text_status_pass' : 'text_status_no_pass',
        style: styles.textTitle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text_mark",
        style: styles.textResult,
        children: dataInformation?.showMark === true && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
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
    }), (dataInformation?.showResultQuestion === true || dataInformation?.showResultAll === true) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_next.default, {
      width: 18,
      height: 18
    })]
  });

  /**
   * Đi đến màn làm bài thi.
   */
  const onHandleEnterExam = async () => {
    if (isCurrentTestStatus === _constants.default.MY_TEST_STATUS.goingOn) {
      if (dataInformation?.password) {
        setIsShow(true);
      } else {
        const params = {
          registorId: dataInformation?.registorId,
          registorUserId: dataInformation?.testRegistorUser?.id,
          testFormId: dataInformation?.testFormId,
          securityCode: null,
          isExtraTest: dataInformation?.extraTestCount != null && dataInformation?.extraTestCount !== 0
        };
        /**
         * Call api startTest
         */
        const response = await (0, _testregistorusertestApi.startTest)(params);
        if (response?.status && response?.data) {
          const id = response?.data;
          navigation.navigate(_constants.default.MY_TEST_QUESTION_SCREEN, {
            id,
            data: dataInformation
          });
        }
      }
    } else if (isCurrentTestStatus === _constants.default.MY_TEST_STATUS.continuteDoing) {
      navigation.navigate(_constants.default.MY_TEST_QUESTION_SCREEN, {
        id: dataInformation?.doingTestId,
        data: dataInformation
      });
    }
  };
  const onHandleStartWithPassword = async password => {
    /**
     * Call api startTest
     */
    const params = {
      registorId: dataInformation?.registorId,
      registorUserId: dataInformation?.testRegistorUser?.id,
      testFormId: dataInformation?.testFormId,
      securityCode: password,
      isExtraTest: dataInformation?.extraTestCount != null && dataInformation?.extraTestCount !== 0
    };
    if (isCurrentTestStatus === _constants.default.MY_TEST_STATUS.goingOn) {
      const response = await (0, _testregistorusertestApi.startTest)(params);
      setIsShow(false);
      if (response?.status && response?.data) {
        const id = response?.data;
        navigation.navigate(_constants.default.MY_TEST_QUESTION_SCREEN, {
          id,
          data: dataInformation
        });
      } else {
        dispatch((0, _globalSlice.updateShowDialogWarnAction)({
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
    } else {
      navigation.navigate(_constants.default.MY_TEST_QUESTION_SCREEN, {
        id: dataInformation?.doingTestId,
        data: dataInformation
      });
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
      data: data,
      renderItem: ({
        item
      }) => itemResult(item),
      keyExtractor: (item, index) => index.toString(),
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      style: [styles.btnEnterExam, {
        backgroundColor: _colors.Color.base_color
      }],
      onPress: onHandleEnterExam,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: isCurrentTestStatus === _constants.default.MY_TEST_STATUS.notStart ? 'text-button-not-start' : isCurrentTestStatus === _constants.default.MY_TEST_STATUS.goingOn ? 'text-button-going-on' : isCurrentTestStatus === _constants.default.MY_TEST_STATUS.continuteDoing ? 'text-button-continute-doing' : isCurrentTestStatus === _constants.default.MY_TEST_STATUS.finished ? 'text-button-finished' : isCurrentTestStatus === _constants.default.MY_TEST_STATUS.overLimit ? 'text-button-over-limit' : '',
        style: styles.textEnterExam
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogWarnCustom.default, {
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