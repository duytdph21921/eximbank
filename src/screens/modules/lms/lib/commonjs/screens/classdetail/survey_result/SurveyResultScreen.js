"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _reactNative = require("react-native");
var _icon_complete_survey = _interopRequireDefault(require("@assets/icons/icon_complete_survey.svg"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _useGoBackHandler = _interopRequireDefault(require("@hooks/useGoBackHandler"));
var _reactNativeRenderHtml = _interopRequireDefault(require("react-native-render-html"));
var _colors = require("@theme/colors");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _SurveyResultScreenStyles = require("./SurveyResultScreen.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */

const SurveyResultScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    surveyId,
    surveyUserId,
    sourceThank
  } = route?.params || {};
  const {
    bottom
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const sourceThankHtml = sourceThank?.html;
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: onBack
  });
  const renderHearderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-title-survey-result-screen",
    style: _globalStyles.default.titleScreen
  }); // Title screen
  /**
   * Custom header.
   */
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHearderTitle
    });
  }, [navigation]);

  /**
   * Back to previous screen
   */
  const onBack = () => {
    navigation.navigate(_constants.default.SURVEY_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7)
    });
    return true;
  };
  (0, _useGoBackHandler.default)(() => {
    navigation.navigate(_constants.default.SURVEY_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7)
    });
    return true;
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
    style: _SurveyResultScreenStyles.styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_complete_survey.default, {
      width: 150,
      height: 150
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-complete-survey",
      style: _SurveyResultScreenStyles.styles.textComplete
    }), sourceThankHtml && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeRenderHtml.default, {
      contentWidth: _platforms.screenWidth - (0, _scales.horizontal)(2 * 20),
      source: sourceThank,
      tagsStyles: mixedStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      style: [_SurveyResultScreenStyles.styles.btnFooter, {
        bottom: bottom + 20,
        backgroundColor: _colors.Color.base_color
      }],
      onPress: () => {
        navigation.navigate(_constants.default.SURVEY_RESULT_DETAIL_SCREEN, {
          surveyUserId,
          surveyId
        });
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-buton-re-view-exam",
        style: _SurveyResultScreenStyles.styles.textFooter
      })
    })]
  });
};
const mixedStyle = {
  p: {
    color: _colors.Color.text_color,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: _fonts.default.medium
  }
};
var _default = exports.default = SurveyResultScreen;
//# sourceMappingURL=SurveyResultScreen.js.map