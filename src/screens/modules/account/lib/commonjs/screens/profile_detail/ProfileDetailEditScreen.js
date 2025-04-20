"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _colors = require("@theme/colors");
var _globalSlice = require("@store/reducers/globalSlice");
var _hrprofileApi = require("../../services/hr/hrprofile.api.js");
var _hrprofileModel = require("../profile/model/hrprofile.model.js");
var _HeaderProfileEditDetail = _interopRequireDefault(require("./component/HeaderProfileEditDetail.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable new-cap */

// ProfileDetailEditScreen.propTypes = {};

// ProfileDetailEditScreen.defaultProps = {};
const ProfileDetailEditScreen = props => {
  const {
    navigation
  } = props;
  const [data, setData] = (0, _react.useState)(false);
  const dispatch = (0, _reactRedux.useDispatch)();
  const [modelEdit, setDataUser] = (0, _react.useState)(new _hrprofileModel.userInfo());
  const isMounteRef = (0, _react.useRef)(false);
  const onBack = () => {
    navigation.navigate(_constants.default.PROFILE_DETAIL_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7)
    });
  };
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: onBack
  });
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-profile-info",
    style: _globalStyles.default.titleScreen
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, []);
  const funcGetUserInfoDetail = async () => {
    const response = await (0, _hrprofileApi.getUserInfoDetail)();
    if (response?.status && isMounteRef.current) {
      setData(true);
      setDataUser(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetUserInfoDetail();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const onEditProfile = async () => {
    // Call api cập nhật thông tin
    const response = await (0, _hrprofileApi.updateUserInfoDetail)(modelEdit);
    if (response?.status) {
      dispatch((0, _globalSlice.updateShowDialogWarnAction)({
        isShowModalWarn: true,
        isSigout: false,
        keyHeader: 'text-notification',
        keyMessage: 'text-success-save-change-user-info',
        isShowCancel: true,
        isShowSubmit: false,
        keyCancel: 'text-close'
      }));
    }
  };
  const onChangeAvatar = avatarPath => {
    const newModel = {
      ...modelEdit,
      avatar: avatarPath
    };
    setDataUser(newModel);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    enabled: true,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
      style: styles.container,
      children: data ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        scrollEnabled: true,
        bounces: false,
        showsVerticalScrollIndicator: false,
        style: styles.contentBox,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderProfileEditDetail.default, {
          avatar: modelEdit.avatar,
          type: modelEdit.type,
          handleChooseAvatar: avatarPath => {
            onChangeAvatar(avatarPath);
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.boxInfomation,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.boxItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-displayname",
              style: styles.textLabelNotEdit
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
              value: modelEdit.displayName,
              textInputStyle: styles.textInputUserNotEdit,
              editable: false
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.boxItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-email",
              style: modelEdit.type !== 'System' ? styles.textLabel : styles.textLabelNotEdit
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
              value: modelEdit.email,
              textInputStyle: modelEdit.type !== 'System' ? styles.textInputUser : styles.textInputUserNotEdit,
              onChangeText: email => {
                if (modelEdit.type !== 'System') setDataUser(prevUser => ({
                  ...prevUser,
                  email
                }));
              }
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.boxItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-position-name",
              style: styles.textLabelNotEdit
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
              value: modelEdit.positionName,
              textInputStyle: styles.textInputUserNotEdit,
              editable: false
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.boxItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-department-name",
              style: styles.textLabelNotEdit
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
              value: modelEdit.departmentName,
              textInputStyle: styles.textInputUserNotEdit,
              editable: false
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.boxItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-mobile-phone",
              style: modelEdit.type !== 'System' ? styles.textLabel : styles.textLabelNotEdit
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
              value: modelEdit.mobile,
              textInputStyle: modelEdit.type !== 'System' ? styles.textInputUser : styles.textInputUserNotEdit,
              onChangeText: mobile => {
                if (modelEdit.type !== 'System') setDataUser(prevUser => ({
                  ...prevUser,
                  mobile
                }));
              }
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.boxAction,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
            onPress: onEditProfile,
            style: [styles.btnEdit, {
              backgroundColor: _colors.Color.base_color,
              borderColor: _colors.Color.base_color
            }],
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: [styles.whiteColor, styles.textBtn],
              i18nKey: "text-btn-save-infomation"
            })
          })
        })]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {})
      // <ProfileScreenPlaceholder />
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white,
    fontFamily: 'manrope-light'
  },
  contentBox: {
    marginHorizontal: (0, _scales.horizontal)(24)
  },
  boxInfomation: {
    marginTop: (0, _scales.horizontal)(30)
  },
  textLabel: {
    fontFamily: 'manrope-medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22.4,
    textAlign: 'left',
    marginBottom: (0, _scales.vertical)(10)
  },
  textNomal: {
    fontFamily: 'manrope-regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'left'
  },
  boxItem: {
    marginBottom: 10,
    textAlign: 'left'
  },
  boxAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginTop: (0, _scales.vertical)(20),
    marginBottom: (0, _scales.vertical)(16)
  },
  btnEdit: {
    width: _platforms.screenWidth - (0, _scales.horizontal)(24) * 2,
    height: 56,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: _colors.Color.base_color,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: _colors.Color.base_color,
    borderWidth: 1
  },
  whiteColor: {
    color: _colors.Color.white
  },
  textBtn: {
    fontFamily: 'manrope-bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4
  },
  textInputUserNotEdit: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: '400',
    color: _colors.Color.color_uncheck_answer,
    width: _platforms.screenWidth - (0, _scales.horizontal)(24) * 2,
    borderColor: _colors.Color.color_uncheck_answer
  },
  btnReturn: {
    marginLeft: (0, _scales.horizontal)(20),
    marginTop: (0, _scales.vertical)(10)
  },
  textLabelNotEdit: {
    fontFamily: _fonts.default.medium,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22.4,
    textAlign: 'left',
    color: _colors.Color.color_uncheck_answer,
    marginBottom: (0, _scales.vertical)(10)
  },
  textInputUser: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: '400',
    color: _colors.Color.text_color,
    width: _platforms.screenWidth - (0, _scales.horizontal)(24) * 2,
    borderColor: _colors.Color.color_uncheck_answer
  }
});
var _default = exports.default = /*#__PURE__*/_react.default.memo(ProfileDetailEditScreen);
//# sourceMappingURL=ProfileDetailEditScreen.js.map