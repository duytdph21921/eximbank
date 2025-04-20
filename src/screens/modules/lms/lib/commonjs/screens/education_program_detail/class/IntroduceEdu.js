"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _he = _interopRequireDefault(require("he"));
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _icon_subject = _interopRequireDefault(require("@assets/icons/icon_subject.svg"));
var _icon_watch = _interopRequireDefault(require("@assets/icons/icon_watch.svg"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CustomImage = _interopRequireDefault(require("@components/CustomImage"));
var _colors = require("@theme/colors");
var _helpers = require("@utils/helpers");
var _globalSlice = require("@store/reducers/globalSlice");
var _lmssubjectApi = require("../../../services/lmssubject.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable react-hooks/exhaustive-deps */

const IMAGE_WIDTH = _platforms.screenWidth - (0, _scales.horizontal)(24 * 2);
const IMAGE_HEIGHT = IMAGE_WIDTH * 150 / 327;
const IntroduceEdu = props => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    params
  } = props;
  const isMounteRef = (0, _react.useRef)(false);
  const [dataInfoEduProgram, setDataInfoEduProgram] = (0, _react.useState)({
    description: ''
  });
  const id = params?.id;
  const funcGetById = async () => {
    const response = await (0, _lmssubjectApi.getById)(id);
    if (response?.status && isMounteRef.current) {
      setDataInfoEduProgram(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetById();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomImage.default, {
      style: styles.viewImage,
      source: dataInfoEduProgram?.avatar
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: dataInfoEduProgram?.title,
      style: styles.textTitle,
      numberOfLines: 3
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewDate,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_subject.default, {
        width: 18,
        height: 18
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-title-type-subject",
        style: styles.textTime,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: ` ${dataInfoEduProgram?.fieldName ?? ''}`,
          style: styles.textTime
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewDate,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_watch.default, {
        width: 18,
        height: 18
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_CMText.default, {
        i18nKey: "text-time-subject-detail",
        style: styles.textTime,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: ` ${dataInfoEduProgram?.duration} `,
          style: styles.textTime
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-time-subject",
          style: styles.textTime
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.viewLine
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: `${_he.default.decode((0, _helpers.replaceHtml)(dataInfoEduProgram?.description ?? ''))}`,
      style: styles.textContent
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: (0, _scales.horizontal)(20)
  },
  viewImage: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    borderRadius: 16
  },
  textTitle: {
    fontWeight: '700',
    marginTop: (0, _scales.vertical)(20),
    fontFamily: _fonts.default.regular,
    fontSize: (0, _scales.textSize)(20),
    lineHeight: (0, _scales.textSize)(35)
  },
  viewDate: {
    flexDirection: 'row',
    marginTop: (0, _scales.vertical)(20)
  },
  textTime: {
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: (0, _scales.horizontal)(10),
    fontFamily: _fonts.default.regular,
    lineHeight: 20.4
  },
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26.4
  },
  viewLine: {
    height: (0, _scales.vertical)(10),
    backgroundColor: _colors.Color.color_bg_tab_view,
    marginVertical: (0, _scales.vertical)(20)
  }
});
var _default = exports.default = IntroduceEdu;
//# sourceMappingURL=IntroduceEdu.js.map