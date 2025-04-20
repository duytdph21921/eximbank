"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _platforms = require("@utils/platforms");
var _close = _interopRequireDefault(require("@assets/icons/close.svg"));
var _alertCircle = _interopRequireDefault(require("@assets/icons/alert-circle.svg"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _reactNativeDeviceInfo = _interopRequireDefault(require("react-native-device-info"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const BottomSheetVersionAppInfo = ({
  isOpenModal,
  closeModal
}) => {
  const translateY = (0, _reactNativeReanimated.useSharedValue)(_platforms.screenHeight);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const [currentVersion, setCurrentVersion] = (0, _react.useState)('');
  const [viewHeight, setViewHeight] = (0, _react.useState)(0);

  /**
   * Get height view bottomsheet.
   * @param {} event
   */
  const onViewLayout = event => {
    const {
      height
    } = event.nativeEvent.layout;
    setViewHeight(height);
  };
  (0, _react.useEffect)(() => {
    if (isOpenModal) {
      translateY.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 500
      }, () => {
        opacity.value = (0, _reactNativeReanimated.withTiming)(1, {
          duration: 300
        });
      });
    } else {
      opacity.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 300
      }, () => {
        translateY.value = (0, _reactNativeReanimated.withTiming)(_platforms.screenHeight, {
          duration: 500
        });
      });
    }
  }, [isOpenModal]);

  /**
   * Inittial data version app .
   */
  (0, _react.useEffect)(() => {
    const currentVersion = _reactNativeDeviceInfo.default.getVersion(); // Lấy phiên bản hiện tại
    setCurrentVersion(currentVersion);
  }, []);
  const translationStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateY: translateY.value
    }]
  }));
  const opacityStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
    supportedOrientations: ['portrait', 'landscape'],
    animationType: "fade",
    transparent: true,
    visible: isOpenModal,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeReanimated.default.View, {
      style: [styles.viewButtonSheet, translationStyles],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
        style: [{
          ..._reactNative.StyleSheet.absoluteFillObject,
          backgroundColor: _colors.Color.bg_cl_order_history
        }, opacityStyles]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
        style: {
          ..._reactNative.StyleSheet.absoluteFillObject
        },
        activeOpacity: 1,
        onPress: closeModal,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [styles.btnCancel, {
            bottom: viewHeight + (0, _scales.vertical)(10)
          }],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
            onPress: closeModal,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_close.default, {
              width: 48,
              height: 48
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.content,
          onLayout: onViewLayout,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: styles.textLabel,
            title: "Tr\xED Nam E-Learning"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.flexDirectionRow,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_alertCircle.default, {
              width: 20,
              height: 20,
              style: {
                marginRight: 8
              }
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: styles.textInfomation,
              i18nKey: "text-current-version"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: styles.textInfomation,
              title: currentVersion
            })]
          })]
        })]
      })]
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  viewButtonSheet: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnCancel: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  content: {
    position: 'absolute',
    width: _platforms.screenWidth,
    backgroundColor: _colors.Color.white,
    bottom: 0,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: 24
  },
  textLabel: {
    fontFamily: _fonts.default.regular,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    marginBottom: (0, _scales.vertical)(10)
  },
  textInfomation: {
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
    color: _colors.Color.text_color_hover
  },
  iconInfo: {
    width: 20,
    height: 20
  },
  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
var _default = exports.default = /*#__PURE__*/_react.default.memo(BottomSheetVersionAppInfo);
//# sourceMappingURL=index.js.map