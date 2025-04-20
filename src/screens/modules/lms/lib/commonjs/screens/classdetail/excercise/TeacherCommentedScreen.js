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
var _platforms = require("@utils/platforms");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TeacherCommentedScreen = props => {
  const {
    teacherComment,
    dataArrayUrlTeacherComment
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.boxList,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.boxItem,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
        activeOpacity: 1,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          style: styles.title,
          i18nKey: "text-button-exercise-comments"
        }), teacherComment?.mark && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          style: styles.score,
          i18nKey: "text_mark_score",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: styles.score,
            title: `: ${teacherComment?.mark ?? 0} `,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: styles.score,
              i18nKey: "text-button-score"
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
          scrollEnabled: true,
          bounces: false,
          showsVerticalScrollIndicator: false,
          style: styles.divided,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: {
                flexDirection: 'row'
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.container,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                  activeOpacity: 1,
                  children: dataArrayUrlTeacherComment.map(value => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
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
                title: teacherComment?.comment
              })
            })]
          })
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
    height: _platforms.screenHeight / 4
  },
  boxItem: {
    borderRadius: 16,
    padding: 16,
    color: _colors.Color.white,
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
    color: _colors.Color.text_color_hover
  },
  boxListClass: {
    flexDirection: 'row',
    columnGap: 8,
    justifyContent: 'space-between'
  },
  boxClassItem: {
    borderRadius: 16,
    padding: 16,
    color: _colors.Color.white,
    marginBottom: (0, _scales.vertical)(16),
    overflow: 'hidden'
  },
  titleFile: {
    paddingVertical: 7,
    fontSize: 16,
    color: _colors.Color.color_check_answer,
    marginLeft: 5
  },
  score: {
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 23.8,
    color: _colors.Color.color_not_pass,
    marginVertical: 15
  },
  scrollView: {
    maxHeight: 120
  },
  viewItem: {
    flexDirection: 'row',
    marginTop: (0, _scales.vertical)(5)
  }
});
var _default = exports.default = /*#__PURE__*/_react.default.memo(TeacherCommentedScreen);
//# sourceMappingURL=TeacherCommentedScreen.js.map