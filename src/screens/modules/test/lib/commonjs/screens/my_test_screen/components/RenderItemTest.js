"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _icon_document = _interopRequireDefault(require("@assets/icons/icon_document"));
var _scales = require("@utils/scales");
var _icon_mark = _interopRequireDefault(require("@assets/icons/icon_mark.svg"));
var _icon_package = _interopRequireDefault(require("@assets/icons/icon_package.svg"));
var _icon_clock = _interopRequireDefault(require("@assets/icons/icon_clock.svg"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _helpers = require("@utils/helpers");
var _platforms = require("@utils/platforms");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable import/no-extraneous-dependencies */

const RenderItemTest = props => {
  const {
    item,
    index,
    navigation
  } = props;

  /**
   * Click item my test.
   */
  const onHandleItem = () => {
    navigation.navigate(_constants.default.MY_TEST_INFORMATION_SCREEN, item);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
    style: styles.container,
    onPress: onHandleItem,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.viewIcon, {
        backgroundColor: (0, _helpers.changeColor)(_colors.Color.base_color)
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_document.default, {
        width: 32,
        height: 32
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewContent,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: item?.title,
        numberOfLines: 2,
        style: styles.textTitleItem
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.viewItem,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_mark.default, {
          width: 16,
          height: 16
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          style: styles.textContentItem,
          i18nKey: "text-title-marks"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: `${item?.minMark}`,
          numberOfLines: 1,
          style: [styles.textContentItem, {
            width: _platforms.screenWidth - (0, _scales.horizontal)(15 * 5) - 16 - (0, _scales.horizontal)(100)
          }]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.viewItem,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_package.default, {
          width: 16,
          height: 16
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          style: styles.textContentItem,
          i18nKey: "text-title-exam"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: item?.registorName,
          numberOfLines: 1,
          style: [styles.textContentItem, {
            width: _platforms.screenWidth - (0, _scales.horizontal)(15 * 5) - 16 - (0, _scales.horizontal)(100)
          }]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.viewItem,
        children: [(item?.startDate !== '' || item?.endDate !== '') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_clock.default, {
          width: 16,
          height: 16
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: ` ${item?.startDate ?? ''}${item?.endDate ? ` - ${item?.endDate}` : ''}`,
          numberOfLines: 1,
          style: styles.textContentItem
        })]
      })]
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white,
    borderRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: (0, _scales.horizontal)(15),
    paddingVertical: (0, _scales.vertical)(20),
    marginTop: (0, _scales.vertical)(15),
    shadowColor: '#0000000D',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 1
  },
  viewIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: _colors.Color.color_bg_item_my_test,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewContent: {
    flex: 1,
    paddingLeft: (0, _scales.horizontal)(15)
  },
  viewItem: {
    flexDirection: 'row',
    marginTop: (0, _scales.vertical)(10)
  },
  textTitleItem: {
    fontSize: (0, _scales.textSize)(12),
    fontWeight: '700',
    lineHeight: (0, _scales.textSize)(20.4)
  },
  textContentItem: {
    fontSize: (0, _scales.textSize)(10),
    fontWeight: '400',
    lineHeight: 16
  }
});
var _default = exports.default = RenderItemTest;
//# sourceMappingURL=RenderItemTest.js.map