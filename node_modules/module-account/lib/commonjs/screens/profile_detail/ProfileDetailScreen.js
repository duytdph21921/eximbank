"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _colors = require("@theme/colors");
var _hrprofileApi = require("../../services/hr/hrprofile.api.js");
var _ProfileDetailScreenStyle = require("./ProfileDetailScreen.style.js");
var _HeaderProfileDetail = _interopRequireDefault(require("./component/HeaderProfileDetail.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react/jsx-no-useless-fragment */

// ProfileDetailScreen.propTypes = {};

// ProfileDetailScreen.defaultProps = {};
const ProfileDetailScreen = props => {
  const {
    navigation,
    route
  } = props;
  const [data, setData] = (0, _react.useState)(false);
  const [dataUser, setDataUser] = (0, _react.useState)();
  const onBack = () => {
    navigation.navigate(_constants.default.PROFILE_SCREEN, {
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
  const getData = async () => {
    const response = await (0, _hrprofileApi.getUserInfoDetail)();
    setData(true);
    if (response?.status) {
      setDataUser(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    getData();
  }, [route && route?.params && route?.params?.dataBack]);
  const renderViewInfor = (i18nTitle, value) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _ProfileDetailScreenStyle.styles.boxItem,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: i18nTitle,
      style: _ProfileDetailScreenStyle.styles.textLabel
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: value,
      style: _ProfileDetailScreenStyle.styles.textNomal
    })]
  });
  const onEditProfile = () => {
    navigation.navigate(_constants.default.PROFILE_DETAIL_EDIT_SCREEN);
  };
  const onChangePassword = () => {
    navigation.navigate(_constants.default.PROFILE_CHANGE_PASSWORD_SCREEN);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: _ProfileDetailScreenStyle.styles.container,
    children: data ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
      scrollEnabled: true,
      bounces: false,
      showsVerticalScrollIndicator: false,
      style: _ProfileDetailScreenStyle.styles.contentBox,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderProfileDetail.default, {
        avatar: dataUser?.avatar,
        displayName: dataUser?.displayName,
        email: dataUser?.email
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: _ProfileDetailScreenStyle.styles.boxInfomation,
        children: [renderViewInfor('text-displayname', dataUser?.displayName), renderViewInfor('text-email', dataUser?.email), renderViewInfor('text-position-name', dataUser?.positionName), renderViewInfor('text-department-name', dataUser?.departmentName), renderViewInfor('ext-mobile-phone', dataUser?.mobile)]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: _ProfileDetailScreenStyle.styles.boxAction,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          onPress: onEditProfile,
          style: [_ProfileDetailScreenStyle.styles.btnEdit, {
            backgroundColor: _colors.Color.base_color,
            borderColor: _colors.Color.base_color
          }],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: [_ProfileDetailScreenStyle.styles.whiteColor, _ProfileDetailScreenStyle.styles.textBtn],
            i18nKey: "text-btn-edit-infomation"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          onPress: onChangePassword,
          style: _ProfileDetailScreenStyle.styles.btnDefault,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: _ProfileDetailScreenStyle.styles.textBtn,
            i18nKey: "text-btn-change-password"
          })
        })]
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {})
    // <ProfileScreenPlaceholder />
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(ProfileDetailScreen);
//# sourceMappingURL=ProfileDetailScreen.js.map