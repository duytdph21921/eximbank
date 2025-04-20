"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _icon_file = _interopRequireDefault(require("@assets/icons/icon_file.svg"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _colors = require("@theme/colors");
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ExercisceContentScreen = props => {
  const {
    dataContent,
    dataArrayUrlExercise
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.boxList,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.boxItem,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          style: styles.title,
          i18nKey: "text-tab-content-of-assignment"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
          scrollEnabled: true,
          bounces: false,
          showsVerticalScrollIndicator: true,
          style: styles.divided,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: {
              flexDirection: 'row'
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.container,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                activeOpacity: 1,
                children: dataArrayUrlExercise.map(value => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.viewItem,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_file.default, {
                    style: styles.iconFile,
                    width: 20,
                    height: 20
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                    title: value.split('/').pop(),
                    style: styles.titleFile
                  })]
                }, value))
              })
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
            activeOpacity: 1,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: styles.content,
              title: dataContent?.content
            })
          })]
        })]
      })
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (0, _scales.vertical)(20)
  },
  contentBox: {
    paddingHorizontal: (0, _scales.horizontal)(20)
  },
  boxList: {
    flexDirection: 'column',
    columnGap: 16,
    justifyContent: 'space-between'
  },
  divided: {
    borderTopColor: _colors.Color.color_width_featured_class,
    borderTopWidth: 1,
    marginVertical: (0, _scales.vertical)(20)
  },
  boxItem: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: _colors.Color.white,
    marginBottom: (0, _scales.vertical)(16)
  },
  dateTime: {
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
    marginBottom: (0, _scales.vertical)(4)
  },
  title: {
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 23.8,
    marginBottom: (0, _scales.vertical)(4)
  },
  content: {
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
    color: _colors.Color.text_color_hover,
    marginVertical: 10
  },
  boxListClass: {
    flexDirection: 'row',
    columnGap: 8,
    justifyContent: 'space-between'
  },
  boxClassItem: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: _colors.Color.white,
    marginBottom: (0, _scales.vertical)(16),
    overflow: 'hidden'
  },
  titleFile: {
    fontSize: 16,
    marginLeft: 5,
    borderRadius: 8,
    marginBottom: 12,
    // shadowColor: Color.black,
    color: _colors.Color.color_check_answer
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 1,
    // backgroundColor: Color.transparents,
  },
  scrollView: {
    maxHeight: 120
  },
  viewItem: {
    flexDirection: 'row',
    marginTop: (0, _scales.vertical)(5),
    flexWrap: 'wrap'
  }
});
var _default = exports.default = /*#__PURE__*/_react.default.memo(ExercisceContentScreen);
//# sourceMappingURL=ExercisceContentScreen.js.map