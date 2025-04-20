"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _icon_result_class_detail = _interopRequireDefault(require("@assets/icons/icon_result_class_detail.svg"));
var _icon_mark_a = _interopRequireDefault(require("@assets/icons/icon_mark_a.svg"));
var _icon_next_detail = _interopRequireDefault(require("@assets/icons/icon_next_detail.svg"));
var _colors = require("@theme/colors");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _reactNativeSvgCharts = require("react-native-svg-charts");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RATE_IMAGE = 153 / 327;
const WIDTH_IMAGE = _platforms.screenWidth - (0, _scales.horizontal)(20 * 2);
const HEIGHT_IMAGE = WIDTH_IMAGE * RATE_IMAGE;
const HEIGHT_CHART = HEIGHT_IMAGE * 0.7;
const HeaderResult = props => {
  const {
    onHandleAggregate,
    dataChart
  } = props;
  const data = dataChart?.percentLearning ?? 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_result_class_detail.default, {
      width: WIDTH_IMAGE,
      height: HEIGHT_IMAGE
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewContent,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.viewMark,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-header-mark",
          style: styles.textTitleMark
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.viewMarkDetail,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_mark_a.default, {
            width: 24,
            height: 24
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: `${dataChart?.totalMark ?? 0}`,
            style: styles.textMark
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
            style: styles.btnMarkDetail,
            onPress: onHandleAggregate,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-header-mark-detail",
              style: styles.textDetail
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_next_detail.default, {
              width: 24,
              height: 24
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          style: styles.btnStateStudy,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: dataChart?.statusLearning ?? 'Không có trạng thái',
            style: styles.textStateStudy
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.viewChart,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvgCharts.ProgressCircle, {
          style: styles.progressCircle,
          progress: data / 100,
          progressColor: _colors.Color.color_uncheck_answer,
          backgroundColor: _colors.Color.white,
          startAngle: -Math.PI,
          endAngle: Math.PI,
          strokeWidth: 20
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: `${data}%`,
          style: styles.percentage
        })]
      })]
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    // ...Platform.select({
    //   ios: {
    //     shadowColor: Color.cl_text_app,
    //     shadowOpacity: 0.5,
    //     shadowRadius: 10,
    //     shadowOffset: { width: 0, height: 10 },
    //     backgroundColor: Color.white,
    //   },
    //   android: {
    //     elevation: 1,
    //     backgroundColor: Color.white,
    //   },
    // }),
    marginVertical: (0, _scales.vertical)(20),
    alignSelf: 'center'
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: (0, _scales.horizontal)(20),
    position: 'absolute',
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE
  },
  viewMarkDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnMarkDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewMark: {
    justifyContent: 'space-evenly',
    paddingVertical: (0, _scales.vertical)(10)
  },
  textTitleMark: {
    color: _colors.Color.white,
    fontFamily: _fonts.default.bold,
    fontSize: 16,
    fontWeight: '700'
  },
  textMark: {
    color: _colors.Color.white,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: _fonts.default.bold,
    lineHeight: 36,
    paddingHorizontal: 5
  },
  textDetail: {
    color: _colors.Color.white,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 5
  },
  btnStateStudy: {
    backgroundColor: _colors.Color.white,
    borderRadius: 100,
    paddingVertical: (0, _scales.vertical)(5),
    alignItems: 'center'
  },
  textStateStudy: {
    color: _colors.Color.color_pass,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: _fonts.default.semi,
    paddingHorizontal: (0, _scales.horizontal)(10)
  },
  viewChart: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelValueStyle: {
    color: _colors.Color.white,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25.2
  },
  progressCircle: {
    height: HEIGHT_CHART - 1,
    width: HEIGHT_CHART
  },
  percentage: {
    position: 'absolute',
    color: _colors.Color.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: _fonts.default.medium
  }
});
var _default = exports.default = HeaderResult;
//# sourceMappingURL=HeaderResult.js.map