"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _colors = require("@theme/colors");
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _scales = require("@utils/scales");
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _reactNativeDocumentPicker = _interopRequireDefault(require("react-native-document-picker"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _reactRedux = require("react-redux");
var _globalSlice = require("@store/reducers/globalSlice");
var _upload = require("@services/lms/upload.api");
var _helpers = require("@utils/helpers");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable global-require */

const HeaderDetailProfileEdit = props => {
  const {
    avatar,
    type,
    handleChooseAvatar
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const getFile = async () => {
    try {
      const response = await _reactNativeDocumentPicker.default.pick({
        presentationStyle: _constants.default.presentationStyle
      });
      const formData = new FormData();
      formData.append('files', {
        uri: response[0].uri,
        type: response[0].type,
        name: response[0].name
      });
      // call api uploadFile
      const responseUPload = await (0, _upload.uploadFile)(formData, 'avatar', 'profile');
      if (responseUPload?.success) {
        if (responseUPload?.data && responseUPload?.data.length > 0) {
          handleChooseAvatar(responseUPload?.data[0].fileName);
        }
      } else if (responseUPload?.message) {
        // hien thi thong bao
      }
    } catch (err) {
      dispatch((0, _globalSlice.updateLoadingAction)(false));
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.boxInfo,
      children: [avatar ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
        source: {
          uri: (0, _helpers.loadFile)(avatar)
        },
        resizeMode: "contain",
        style: styles.avatarProfile
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
        source: require('@assets/img/avatar.jpeg'),
        resizeMode: "contain",
        style: styles.avatarProfile
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
        onPress: () => {
          getFile();
        },
        style: styles.cameraBtn,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
          source: require('@assets/img/camera.png'),
          resizeMode: "contain",
          style: styles.camera
        })
      })]
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white,
    marginTop: (0, _scales.horizontal)(10),
    alignItems: 'center'
  },
  boxInfo: {
    marginTop: (0, _scales.horizontal)(20),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarProfile: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  camera: {
    width: 50,
    height: 50
  },
  textDisplayNameInfo: {
    textAlign: 'center',
    fontFamily: 'manrope-bold',
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700'
  },
  textUserNameInfo: {
    textAlign: 'center',
    fontFamily: 'manrope-regular',
    fontSize: 14,
    lineHeight: 23.8,
    fontWeight: '400'
  },
  cameraBtn: {
    position: 'absolute',
    bottom: -20,
    right: 0
  }
});
var _default = exports.default = HeaderDetailProfileEdit;
//# sourceMappingURL=HeaderProfileEditDetail.js.map