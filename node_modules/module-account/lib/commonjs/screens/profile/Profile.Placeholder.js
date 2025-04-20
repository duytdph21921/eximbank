"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _rnPlaceholder = require("rn-placeholder");
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProfileScreenPlaceholder = () => {
  const renderFade = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_rnPlaceholder.Fade, {
    ...props,
    style: styles.animationPlaceholder
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_rnPlaceholder.Placeholder, {
      Animation: renderFade,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.viewInfor,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_rnPlaceholder.PlaceholderLine, {
          style: styles.imageProfile
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_rnPlaceholder.PlaceholderLine, {
          style: styles.linePlaceholder,
          width: 50
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_rnPlaceholder.PlaceholderLine, {
          style: styles.linePlaceholder,
          width: 50
        })]
      })
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  viewInfor: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (0, _scales.vertical)(30)
  },
  imagePlaceholder: {
    backgroundColor: _colors.Color.gray,
    width: (0, _scales.horizontal)(100),
    height: (0, _scales.horizontal)(100),
    borderRadius: 50
  },
  animationPlaceholder: {
    backgroundColor: '#d1d1cd'
  },
  linePlaceholder: {
    backgroundColor: _colors.Color.gray
  },
  imageProfile: {
    backgroundColor: _colors.Color.gray,
    width: (0, _scales.horizontal)(100),
    height: (0, _scales.horizontal)(100),
    borderRadius: (0, _scales.horizontal)(50)
  }
});
var _default = exports.default = ProfileScreenPlaceholder;
//# sourceMappingURL=Profile.Placeholder.js.map