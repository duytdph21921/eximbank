"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _scales = require("@utils/scales");
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _reactRedux = require("react-redux");
var _globalSlice = require("@store/reducers/globalSlice");
var _reactNativeTouchId = _interopRequireDefault(require("react-native-touch-id"));
var _colors = require("@theme/colors");
var _platforms = require("@utils/platforms");
var _messaging = _interopRequireDefault(require("@react-native-firebase/messaging"));
var _reactNativeSwitch = require("react-native-switch");
var _authenticationusersApi = require("../../../services/authentication/authenticationusers.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ProtectAccountScreen = props => {
  const {
    navigation
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const isMounteRef = (0, _react.useRef)(false);
  const [dataFingerPrint, setDataFingerPrint] = (0, _react.useState)();
  const onBack = () => {
    navigation.goBack();
  };
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: onBack
  });
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-security-account",
    style: _globalStyles.default.titleScreen
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, []);
  const funcGetSettingBiometric = async deviceId => {
    const fcmToken = await (0, _messaging.default)().getToken();
    const response = await (0, _authenticationusersApi.getSettingBiometric)(fcmToken);
    if (response?.status && isMounteRef.current) {
      setDataFingerPrint(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    funcGetSettingBiometric();
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const showDialog = keyMess => {
    dispatch((0, _globalSlice.updateShowDialogWarnAction)({
      isShowModalWarn: true,
      isSigout: false,
      titleHeader: '',
      keyHeader: 'text-title-dialog-warn',
      keyMessage: keyMess,
      contentMessage: '',
      isShowCancel: false,
      isShowSubmit: false
    }));
  };
  const onPressSwitch = () => {
    const textNotifi = '';
    _reactNativeTouchId.default.authenticate(textNotifi, optionalConfigObject).then(success => {
      if (success) {
        updateBiometric(!dataFingerPrint);
      }
    }).catch(error => {
      let isError = false;
      if (error?.name === 'LAErrorTouchIDNotEnrolled' || error?.details?.name === 'LAErrorTouchIDNotEnrolled' || error?.name === 'RCTTouchIDUnknownError' || error?.details?.name === 'RCTTouchIDUnknownError') {
        isError = true;
      }
      if (isError) {
        if (_platforms.isIOS) {
          showDialog('RCTTouchIDUnknownError');
        } else {
          showDialog('LAErrorTouchIDNotEnrolled');
        }
      } else {
        showDialog('text-check-faild-biometry');
      }
    });
  };
  const optionalConfigObject = {
    unifiedErrors: false,
    passcodeFallback: false
  };
  const requestUserPermission = async () => {
    const authStatus = await (0, _messaging.default)().requestPermission();
    const enabled = authStatus === _messaging.default.AuthorizationStatus.AUTHORIZED || authStatus === _messaging.default.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      return true;
    }
    return false;
  };
  const updateBiometric = async isBiometric => {
    const hasPermission = await requestUserPermission();
    if (hasPermission) {
      // Dang ky ung dung truoc khi goij
      const fcmToken = await (0, _messaging.default)().getToken();
      const response = await (0, _authenticationusersApi.updateBiometricUser)(isBiometric, fcmToken);
      if (response?.status) {
        setDataFingerPrint(isBiometric);
      } else {
        setDataFingerPrint(!isBiometric);
      }
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: styles.containerAll,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.boxInfomation,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.boxItem,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.container,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: styles.textContext,
            i18nKey: "text-authentication-biometric"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSwitch.Switch, {
            value: dataFingerPrint,
            onValueChange: onPressSwitch,
            disabled: false
            // activeText={'On'}
            // inActiveText={'Off'}
            ,
            circleSize: 28,
            barHeight: 28,
            circleBorderWidth: 1,
            backgroundActive: _colors.Color.base_color,
            backgroundInactive: _colors.Color.color_width_featured_class,
            circleActiveColor: _colors.Color.white,
            circleInActiveColor: _colors.Color.white
            // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
            // changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            ,
            innerCircleStyle: styles.circleStyle // style for inner animated circle for what you (may) be rendering inside the circle
            ,
            outerCircleStyle: styles.containerStyle // style for outer animated circle
            ,
            renderActiveText: false,
            renderInActiveText: false,
            switchLeftPx: 2 // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            ,
            switchRightPx: 2 // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            ,
            switchWidthMultiplier: 1.8 // multiplied by the `circleSize` prop to calculate total width of the Switch
            ,
            switchBorderRadius: 28 // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
          })]
        })
      })
    })
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(ProtectAccountScreen);
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: (0, _scales.vertical)(10)
  },
  containerStyle: {
    width: 44,
    height: 28,
    borderRadius: 22,
    padding: 2
  },
  circleStyle: {
    borderColor: _colors.Color.color_width_featured_class
  },
  boxHeader: {
    marginTop: (0, _scales.vertical)(24),
    marginBottom: (0, _scales.vertical)(5),
    paddingHorizontal: (0, _scales.horizontal)(24)
  },
  titleHeader: {
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 25.2,
    textTransform: 'uppercase'
  },
  boxItem: {
    paddingHorizontal: (0, _scales.horizontal)(24),
    marginTop: (0, _scales.vertical)(24)
  },
  textContext: {
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 25.2
  },
  containerAll: {
    backgroundColor: _colors.Color.white,
    height: _platforms.screenHeight
  }
});
//# sourceMappingURL=ProtectAccountScreen.js.map