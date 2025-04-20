"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _reactNativeLinearGradient = _interopRequireDefault(require("react-native-linear-gradient"));
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _arrowRight = _interopRequireDefault(require("@assets/icons/arrow-right.svg"));
var _certificate = _interopRequireDefault(require("@assets/icons/certificate.svg"));
var _class = _interopRequireDefault(require("@assets/icons/class.svg"));
var _info = _interopRequireDefault(require("@assets/icons/info.svg"));
var _language = _interopRequireDefault(require("@assets/icons/language.svg"));
var _logout = _interopRequireDefault(require("@assets/icons/logout.svg"));
var _note = _interopRequireDefault(require("@assets/icons/note.svg"));
var _notification = _interopRequireDefault(require("@assets/icons/notification.svg"));
var _security = _interopRequireDefault(require("@assets/icons/security.svg"));
var _support = _interopRequireDefault(require("@assets/icons/support.svg"));
var _terms = _interopRequireDefault(require("@assets/icons/terms.svg"));
var _test = _interopRequireDefault(require("@assets/icons/test.svg"));
var _user = _interopRequireDefault(require("@assets/icons/user.svg"));
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _globalSlice = require("@store/reducers/globalSlice");
var _platforms = require("@utils/platforms");
var _helpers = require("@utils/helpers");
var _colors = require("@theme/colors");
var _hrprofileApi = require("../../services/hr/hrprofile.api.js");
var _ProfileScreenStyles = require("./ProfileScreen.styles.js");
var _index = _interopRequireDefault(require("../../component/BottomSheetVersionAppInfo/index.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */

// ProfileScreen.propTypes = {};
// ProfileScreen.defaultProps = {};
let listMenuItem = [{
  id: 1,
  isMenu: true,
  title: 'text-profile-info',
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_user.default, {
    width: 44,
    height: 44
  }),
  navigate: _constants.default.PROFILE_DETAIL_SCREEN,
  isShowInfo: false
}, {
  id: 2,
  isMenu: true,
  title: 'text-my-note',
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_note.default, {
    width: 44,
    height: 44
  }),
  navigate: _constants.default.NOTE_SCREEN,
  isShowInfo: false
}, {
  isMenu: false,
  isShowInfo: false
}, {
  id: 3,
  isMenu: true,
  title: 'text-notification',
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_notification.default, {
    width: 44,
    height: 44
  }),
  isShowInfo: false
}, {
  id: 4,
  isMenu: true,
  title: 'text-language',
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_language.default, {
    width: 44,
    height: 44
  }),
  isShowInfo: false
}, {
  id: 5,
  isMenu: true,
  title: 'text-security-account',
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_security.default, {
    width: 44,
    height: 44
  }),
  isShowInfo: false
}, {
  isMenu: false,
  isShowInfo: false
}, {
  id: 6,
  isMenu: true,
  title: 'text-support-center',
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_support.default, {
    width: 44,
    height: 44
  }),
  isShowInfo: false
}, {
  id: 7,
  isMenu: true,
  title: 'text-terms-condition',
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_terms.default, {
    width: 44,
    height: 44
  }),
  isShowInfo: false,
  url: 'https://elearning-vna.dttt.vn/website-terms'
}, {
  id: 8,
  isMenu: true,
  title: 'text-privacy-policy',
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_security.default, {
    width: 44,
    height: 44
  }),
  isShowInfo: false,
  url: 'https://elearning-vna.dttt.vn/website-policies'
}, {
  id: 9,
  isMenu: true,
  title: 'text-application-info',
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_info.default, {
    width: 44,
    height: 44
  }),
  isShowInfo: true
}, {
  isMenu: false,
  isShowInfo: false
}, {
  id: 10,
  isMenu: true,
  title: 'log-out',
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_logout.default, {
    width: 44,
    height: 44
  }),
  isLogout: true,
  isShowInfo: false
}];
const SIZE_ITEM = _platforms.isTablet ? 30 : 24;
const ProfileScreen = props => {
  const {
    navigation,
    route
  } = props;
  const userState = (0, _reactRedux.useSelector)(state => state.auth.userState);
  const listMenu = (0, _reactRedux.useSelector)(state => state.global.lstMenuApp);
  const dispatch = (0, _reactRedux.useDispatch)();
  const [isShowViewVersion, setIsShowViewVersion] = (0, _react.useState)(false);
  const [data, setData] = (0, _react.useState)(false);
  const [userInfo, setUserInfo] = (0, _react.useState)();
  const onBack = () => {
    navigation.goBack();
  };
  const handleCloseModal = () => {
    setIsShowViewVersion(false);
  };
  const ItemMenu = ({
    item,
    key
  }) => item.isMenu ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: _ProfileScreenStyles.styles.boxMenuProfile,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [_ProfileScreenStyles.styles.boxMenuItem],
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
        style: _ProfileScreenStyles.styles.boxMenuItem,
        onPress: () => {
          if (item.isLogout) {
            dispatch((0, _globalSlice.updateShowDialogWarnAction)({
              isShowModalWarn: true,
              isSigout: true,
              titleHeader: '',
              keyHeader: 'text-notification',
              keyMessage: 'text-want-signout',
              contentMessage: '',
              keySubmit: 'log-out'
            }));
          } else if (item.isShowInfo) {
            setIsShowViewVersion(true);
          } else if (item.navigate) {
            navigation.navigate(item.navigate);
          } else if (item?.id === 6) {
            navigation.navigate(_constants.default.HELP_CENTER_SCREEN);
          } else if (item?.id === 7 || item?.id === 8) {
            navigation.navigate(_constants.default.TERM_SCREEN, {
              title: item?.title,
              url: item?.url
            });
          } else if (item.id === 5) {
            navigation.navigate(_constants.default.PROFILE_ACCOUNT_SECURITY_SCREEN);
          }
        },
        children: [item.icon, /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          style: _ProfileScreenStyles.styles.textMenu,
          i18nKey: item.title
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_arrowRight.default, {
          style: _ProfileScreenStyles.styles.arrowRight,
          width: 18,
          height: 18
        })]
      })
    })
  }, key) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: _ProfileScreenStyles.styles.boxDevider
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerLeft: () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
        handleGoBack: onBack
      }),
      headerRight: () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {}),
      headerTitle: props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-account",
        style: _globalStyles.default.titleScreen
      })
    });
  }, []);

  // Lay thong tin cau hinh menu ung dung
  (0, _react.useEffect)(() => {
    getMenuApp();
  }, []);
  const getMenuApp = async () => {
    const lstMenuApp = listMenu;
    if (lstMenuApp) {
      // Lay ra danh sach cac menu duoc hien thi theo id
      const lstHienThi = lstMenuApp.filter(x => x.isShow === true).map(x => x.id);
      listMenuItem = listMenuItem.filter(x => lstHienThi.indexOf(x.id) !== -1 || x.isMenu !== true || x.isLogout === true);
    }
  };
  const funcGetMyInfo = async () => {
    const response = await (0, _hrprofileApi.getMyInfo)();
    setData(true);
    if (response?.status) {
      setUserInfo(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    funcGetMyInfo();
  }, [route && route?.params && route?.params?.dataBack]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: _ProfileScreenStyles.styles.container,
    children: data && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        scrollEnabled: true,
        bounces: false,
        showsVerticalScrollIndicator: false,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeLinearGradient.default, {
          colors: [_colors.Color.color_bg_image_profile, _colors.Color.color_bg_item_profile],
          style: _ProfileScreenStyles.styles.boxInfo,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _ProfileScreenStyles.styles.boxUserInfo,
            children: [userInfo?.avatar ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
              source: {
                uri: (0, _helpers.loadFile)(userInfo?.avatar)
              },
              resizeMode: "contain",
              style: _ProfileScreenStyles.styles.avatarProfile
            }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
              source: require('@assets/img/avatar-default.png'),
              resizeMode: "contain",
              style: _ProfileScreenStyles.styles.avatarProfile
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _ProfileScreenStyles.styles.boxProfileInfoText,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                title: userInfo?.displayName,
                style: _ProfileScreenStyles.styles.textProfileUsername
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                title: userInfo?.departmentName,
                style: _ProfileScreenStyles.styles.textProfileDepartment
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _ProfileScreenStyles.styles.boxViewLearnInfo,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _ProfileScreenStyles.styles.boxViewLearnInfoItem,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_class.default, {
                width: SIZE_ITEM,
                height: SIZE_ITEM
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                style: _ProfileScreenStyles.styles.textInfoLearn,
                title: `${userInfo?.totalClass}`
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _ProfileScreenStyles.styles.boxViewLearnInfoItem,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_test.default, {
                width: SIZE_ITEM,
                height: SIZE_ITEM
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                style: _ProfileScreenStyles.styles.textInfoLearn,
                title: `${userInfo?.totalTest}`
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _ProfileScreenStyles.styles.boxViewLearnInfoItem,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_certificate.default, {
                width: SIZE_ITEM,
                height: SIZE_ITEM
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                style: _ProfileScreenStyles.styles.textInfoLearn,
                title: `${userInfo?.totalCertification}`
              })]
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: _ProfileScreenStyles.styles.boxMenuContent,
          children: listMenuItem.map(item => /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemMenu, {
            item: item
          }, item?.id))
        })]
      }), isShowViewVersion && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
        isOpenModal: true,
        closeModal: handleCloseModal
      })]
    })
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(ProfileScreen);
//# sourceMappingURL=ProfileScreen.js.map