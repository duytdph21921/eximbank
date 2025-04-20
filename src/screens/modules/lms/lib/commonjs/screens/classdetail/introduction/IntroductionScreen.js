"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _icon_clock = _interopRequireDefault(require("@assets/icons/icon_clock.svg"));
var _icon_global = _interopRequireDefault(require("@assets/icons/icon_global.svg"));
var _icon_notes = _interopRequireDefault(require("@assets/icons/icon_notes.svg"));
var _icon_users = _interopRequireDefault(require("@assets/icons/icon_users.svg"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CustomImage = _interopRequireDefault(require("@components/CustomImage"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _helpers = require("@utils/helpers");
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _he = _interopRequireDefault(require("he"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const IMAGE_WIDTH = _platforms.screenWidth - (0, _scales.horizontal)(24 * 2);
const IMAGE_HEIGHT = IMAGE_WIDTH * 150 / 327;
const IntroductionScreen = props => {
  const {
    classInfo,
    onPressLearn
  } = props;
  const source = {
    html: classInfo?.description ?? ''
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
      scrollEnabled: true,
      bounces: false,
      showsVerticalScrollIndicator: false,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.classInfo,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomImage.default, {
          style: styles.imageItemClass,
          source: classInfo?.avatar
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.classBox,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: styles.textClassTitle,
            title: classInfo?.title
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.classBox,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.flexInfoDetail,
            children: [(classInfo?.startDate !== '' || classInfo?.endDate !== '') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_clock.default, {
              width: 24,
              height: 24,
              style: styles.icon
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              title: `${classInfo?.startDate ?? ''}${classInfo?.endDate ? ` - ${classInfo?.endDate ?? ''}` : ''}`,
              style: styles.textInfo
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.flexInfoDetail,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_global.default, {
              width: 24,
              height: 24,
              style: styles.icon
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: styles.textInfo,
              i18nKey: "text-form-test"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: styles.textInfo,
              title: classInfo?.classTypeName
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.flexInfoDetail,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_notes.default, {
              width: 24,
              height: 24,
              style: styles.icon
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-registration-form",
              style: styles.textInfo
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              title: classInfo?.registerTypeName,
              style: styles.textInfo
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.flexInfoDetail,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_users.default, {
              width: 24,
              height: 24,
              style: styles.icon
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: styles.textInfo,
              title: `${classInfo?.numUser ?? 0} `
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: styles.textInfo,
              i18nKey: "text-form-student-number"
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.lineHight
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          children: source.html != null || source.html !== '' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: `${_he.default.decode((0, _helpers.replaceHtml)(source.html ?? ''))} `,
            style: _globalStyles.default.textNomal
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          children: [!classInfo?.isCloseClass && (classInfo?.isNotStartClass ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            i18nKey: "text-class-over-time",
            style: styles.textClassClose
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
            onPress: onPressLearn,
            style: [styles.btnLearn, {
              backgroundColor: _colors.Color.base_color
            }],
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-join-class",
              style: styles.textLearn
            })
          })), classInfo?.isCloseClass && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            i18nKey: "text-class-over-time",
            style: styles.textClassClose
          })]
        })]
      })
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  classInfo: {
    padding: (0, _scales.horizontal)(24),
    backgroundColor: _colors.Color.white
  },
  imageItemClass: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    alignSelf: 'flex-start',
    borderRadius: 16
  },
  classBox: {
    marginTop: 24
  },
  textClassTitle: {
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: (0, _scales.textSize)(20),
    lineHeight: (0, _scales.textSize)(35)
  },
  flexInfoDetail: {
    flexDirection: 'row',
    marginBottom: (0, _scales.vertical)(16)
  },
  lineHight: {
    width: _platforms.screenWidth - 48,
    height: 10,
    backgroundColor: _colors.Color.color_bg_tab_view,
    borderColor: _colors.Color.color_border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 14
  },
  btnLearn: {
    width: _platforms.screenWidth - (0, _scales.horizontal)(24 * 2),
    height: _platforms.isTablet ? 65 : 56,
    paddingHorizontal: (0, _scales.horizontal)(16),
    paddingVertical: (0, _scales.vertical)(10),
    borderRadius: 100,
    backgroundColor: _colors.Color.base_color,
    marginTop: 8
  },
  textLearn: {
    textAlign: 'center',
    color: _colors.Color.white,
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4
  },
  icon: {
    marginRight: (0, _scales.horizontal)(10)
  },
  textInfo: {
    textAlignVertical: 'center',
    alignItems: 'center',
    lineHeight: 24
  },
  textClassClose: {
    textAlign: 'center',
    color: _colors.Color.red,
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4
  }
});
var _default = exports.default = IntroductionScreen;
//# sourceMappingURL=IntroductionScreen.js.map