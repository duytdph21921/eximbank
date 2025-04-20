"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _icon_next = _interopRequireDefault(require("@assets/icons/icon_next.svg"));
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _context = require("@store/context");
var _reactRedux = require("react-redux");
var _globalSlice = require("@store/reducers/globalSlice");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ItemProfile = props => {
  const {
    item,
    navigation
  } = props;
  const {
    signOut
  } = (0, _react.useContext)(_context.AuthContext);
  const dispatch = (0, _reactRedux.useDispatch)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
    style: styles.option,
    onPress: () => {
      if (item.name === _constants.default.LOGOUT) {
        dispatch((0, _globalSlice.updateShowDialogWarnAction)({
          isShowModalWarn: true,
          isSigout: true,
          titleHeader: '',
          keyHeader: 'text-warning',
          keyMessage: 'text-want-signout',
          contentMessage: ''
        }));
      } else {
        navigation.navigate(item.name);
      }
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.icon,
      children: item.icon
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      style: styles.textOption,
      i18nKey: item.keyName
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_next.default, {
      style: {
        marginLeft: 'auto'
      }
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  option: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    height: (0, _scales.vertical)(50),
    width: '100%',
    marginTop: 15,
    borderRadius: 12,
    backgroundColor: _colors.Color.white,
    alignItems: 'center',
    ..._reactNative.Platform.select({
      ios: {
        shadowColor: 'rgba(58, 72, 101, 0.14)',
        shadowOpacity: 1,
        elevation: 1,
        shadowRadius: 30,
        shadowOffset: {
          width: 0,
          height: 20
        },
        backgroundColor: _colors.Color.transparents
      },
      android: {
        elevation: 1,
        backgroundColor: _colors.Color.transparents
      }
    })
  },
  textOption: {
    fontSize: 14,
    color: _colors.Color.cl_text_app,
    marginStart: 10
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: _colors.Color.base_color
  }
});
var _default = exports.default = ItemProfile;
//# sourceMappingURL=ItemProfile.js.map