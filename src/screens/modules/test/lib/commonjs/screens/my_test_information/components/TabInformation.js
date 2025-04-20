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
/* eslint-disable react-hooks/exhaustive-deps */

const TabInformation = props => {
  const {
    navigation,
    type,
    data,
    isCurrentTestStatus,
    idBack,
    params
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const [isShow, setIsShow] = (0, _react.useState)(false);
  const listData = [{
    keyI18n: 'text-number-of-questions',
    value: data?.questionNum ?? ''
  }, {
    keyI18n: 'text-time-to-do-homework',
    value: `${data?.timeTest ?? ''}`,
    time: true
  }, {
    keyI18n: 'text-start-time',
    value: data?.startTime ? (0, _moment.default)(data?.startTime).format('HH:mm - DD/MM/YYYY') : ''
  }, {
    keyI18n: 'text-end-time',
    value: data?.endTime ? (0, _moment.default)(data?.endTime).format('HH:mm - DD/MM/YYYY') : ''
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
  const [listInfo, setListInfo] = (0, _react.useState)(listData);
  // Danh sach item thi ngoai le
  const listDataExtra = [{
    keyI18n: 'text-number-test-extra',
    value: data?.extraTestCount ?? ''
  }, {
    keyI18n: 'text-number-tested-extra',
    value: data?.extraTestedCount ?? ''
  }, {
    keyI18n: 'text-start-time-extra',
    value: data?.extraTestStartTime ? (0, _moment.default)(data?.extraTestStartTime).format('HH:mm - DD/MM/YYYY') : ''
  }, {
    keyI18n: 'text-end-time-extra',
    value: data?.extraTestEndTime ? (0, _moment.default)(data?.extraTestEndTime).format('HH:mm - DD/MM/YYYY') : ''
  }];
  (0, _react.useEffect)(() => {
    if (data?.extraTestCount > 0) {
      const newListInfo = listData.concat(listDataExtra);
      setListInfo(newListInfo);
    }
  }, []);
  const itemInfor = (item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.viewItem,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: item?.keyI18n,
      style: styles.textTitle
    }), item?.i18n ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: `${item?.value}`,
      style: styles.textResult
    }) : item?.time ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: `${item?.value} `,
      style: styles.textResult,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-time-minute",
        style: styles.textResult
      })
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: `${item?.value}`,
      style: styles.textResult
    })]
  }, `item${index}`);

  /**
   * Đi đến màn làm bài thi.
   */
  const onHandleEnterExam = async () => {
    if (isCurrentTestStatus === _constants.default.MY_TEST_STATUS.goingOn) {
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
        const response = await (0, _testregistorusertestApi.startTest)(params);
        if (response?.status && response?.data) {
          const id = response?.data;
          navigation.navigate(_constants.default.MY_TEST_QUESTION_SCREEN, {
            id,
            data
          });
        }
      }
    } else if (isCurrentTestStatus === _constants.default.MY_TEST_STATUS.continuteDoing) {
      navigation.navigate(_constants.default.MY_TEST_QUESTION_SCREEN, {
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
    if (isCurrentTestStatus === _constants.default.MY_TEST_STATUS.goingOn) {
      const response = await (0, _testregistorusertestApi.startTest)(params);
      setIsShow(false);
      if (response?.status && response?.data) {
        const id = response?.data;
        navigation.navigate(_constants.default.MY_TEST_QUESTION_SCREEN, {
          id,
          data
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
    } else if (isCurrentTestStatus === _constants.default.MY_TEST_STATUS.continuteDoing) {
      navigation.navigate(_constants.default.MY_TEST_QUESTION_SCREEN, {
        id: data?.doingTestId,
        data
      });
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
      contentContainerStyle: styles.container,
      showsVerticalScrollIndicator: false,
      children: listInfo.map((item, index) => itemInfor(item, index))
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
    flexDirection: 'row',
    height: 56,
    borderRadius: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: _colors.Color.color_border,
    marginHorizontal: (0, _scales.horizontal)(15),
    marginTop: (0, _scales.vertical)(15),
    paddingHorizontal: (0, _scales.horizontal)(15),
    alignItems: 'center'
  },
  textTitle: {
    fontSize: (0, _scales.textSize)(14),
    fontWeight: '400',
    lineHeight: (0, _scales.textSize)(23.8)
  },
  textResult: {
    fontSize: (0, _scales.textSize)(12),
    fontWeight: '700',
    lineHeight: (0, _scales.textSize)(20.4)
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
    fontSize: (0, _scales.textSize)(16),
    fontWeight: '700',
    lineHeight: (0, _scales.textSize)(26.4),
    color: _colors.Color.white
  }
});
var _default = exports.default = TabInformation;
//# sourceMappingURL=TabInformation.js.map