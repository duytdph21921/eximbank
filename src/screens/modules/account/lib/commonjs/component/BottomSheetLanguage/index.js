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
var _reactRedux = require("react-redux");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _platforms = require("@utils/platforms");
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _globalSlice = require("@store/reducers/globalSlice");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _storage = require("@utils/storage");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable global-require */

const BottomSheetLanguage = ({
  isOpenModal,
  closeModal
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const appColor = (0, _reactRedux.useSelector)(state => state.global.appColor);
  const [language, setLanguage] = (0, _react.useState)([{
    id: 1,
    title: 'English',
    value: 'en',
    icon: require('@assets/other/check.png'),
    isSelect: false
  }, {
    id: 2,
    title: 'Việt Nam',
    value: 'vn',
    icon: require('@assets/other/check.png'),
    isSelect: false
  }]);
  const translateY = (0, _reactNativeReanimated.useSharedValue)(_platforms.screenHeight);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
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
   * Inittial data language .
   */
  (0, _react.useEffect)(() => {
    const getLanguage = async () => {
      const languages = _storage.storage.getString(_constants.default.LANGUAGE_APP);
      setLanguage(prevItems => prevItems.map((item, index) => item.value === languages ? {
        ...item,
        isSelect: true
      } : {
        ...item,
        isSelect: false
      }));
    };
    getLanguage();
  }, []);
  const translationStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateY: translateY.value
    }]
  }));
  const opacityStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));

  /**
   * Select language for app.
   */
  const onSelectLanguage = (0, _react.useCallback)(async items => {
    setLanguage(prevItems => prevItems.map((item, index) => item.id !== items.id ? {
      ...item,
      isSelect: false
    } : {
      ...item,
      isSelect: true
    }));
    dispatch((0, _globalSlice.updateLanguageAction)(items.value));
    _storage.storage.set(_constants.default.LANGUAGE_APP, items.value);
    closeModal();
  }, []);
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
        style: {
          ..._reactNative.StyleSheet.absoluteFillObject
        },
        activeOpacity: 1,
        onPress: closeModal,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableWithoutFeedback, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: [styles.buttonSheet],
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              onStartShouldSetResponder: () => true,
              style: styles.sheet,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.viewDot
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                i18nKey: "languge-title-dialog",
                style: styles.textTitle
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: [styles.viewLanguage, {
                  borderColor: appColor?.base_color
                }],
                children: language.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
                  style: styles.btnLanguage,
                  onPress: () => {
                    onSelectLanguage(item);
                  },
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: [styles.textItemLanguage, {
                      color: item.isSelect ? appColor?.base_color : _colors.Color.text_color
                    }],
                    children: item.title
                  }), item.isSelect && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
                    source: item.icon,
                    resizeMode: "contain",
                    style: styles.iconCheck
                  })]
                }, item.id))
              })]
            })
          })
        })
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
  sheet: {
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  buttonSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: _colors.Color.white,
    paddingTop: 10,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22
  },
  viewDot: {
    width: (0, _scales.horizontal)(50),
    height: (0, _scales.vertical)(4),
    backgroundColor: _colors.Color.gray,
    borderRadius: 2.5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  textTitle: {
    color: _colors.Color.text_color,
    fontSize: (0, _scales.textSize)(15),
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: (0, _scales.vertical)(20)
  },
  viewLanguage: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingBottom: (0, _scales.vertical)(10),
    borderColor: _colors.Color.base_color
  },
  textLanguage: {
    color: _colors.Color.white,
    fontSize: (0, _scales.textSize)(15)
  },
  btnLanguage: {
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  textItemLanguage: {
    color: _colors.Color.text_color,
    fontSize: (0, _scales.textSize)(16)
  },
  iconCheck: {
    width: 15,
    height: 15
  },
  bntStart: {
    backgroundColor: _colors.Color.base_color,
    marginTop: 15,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  iamgeLanguage: {
    width: 30,
    height: 25
  },
  btnSelect: {
    width: '50%',
    height: 50,
    alignSelf: 'center',
    marginVertical: (0, _scales.vertical)(20)
  }
});
var _default = exports.default = /*#__PURE__*/_react.default.memo(BottomSheetLanguage);
//# sourceMappingURL=index.js.map