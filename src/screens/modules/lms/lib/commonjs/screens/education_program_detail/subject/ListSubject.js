"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _icon_field = _interopRequireDefault(require("@assets/icons/icon_field.svg"));
var _icon_watch = _interopRequireDefault(require("@assets/icons/icon_watch.svg"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CustomImage = _interopRequireDefault(require("@components/CustomImage"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _globalSlice = require("@store/reducers/globalSlice");
var _lmssubjectApi = require("../../../services/lmssubject.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const WIDTH_ITEM = (_platforms.screenWidth - (0, _scales.horizontal)(20 * 2) - (0, _scales.horizontal)(20)) / 2;
const IMAGE_HEIGHT = WIDTH_ITEM * 154 / 216;
const ListSubject = props => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    navigation,
    params
  } = props;
  const isMounteRef = (0, _react.useRef)(false);
  const isRefreshing = false;
  const [listSubject, setListSubject] = (0, _react.useState)([]);
  const [totalSubject, setTotalSubject] = (0, _react.useState)([]);
  const paramsListSubject = {
    offset: 0,
    limit: 20,
    keyword: '',
    trainingId: params?.id
  };
  const funcGetByTrainingId = async () => {
    const response = await (0, _lmssubjectApi.getByTrainingId)(paramsListSubject);
    if (response?.status && isMounteRef.current) {
      setListSubject(response?.data);
      setTotalSubject(response?.metaData?.totalRecord);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetByTrainingId();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const onRefresh = () => {};

  /**
   * Reder view item subject.
   * @param {*} param0
   */
  const renderItemSubject = item => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
    style: [styles.viewItemClass],
    onPress: () => {
      navigation.navigate(_constants.default.EDU_CLASS_DETAIL_SCREEN, item);
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomImage.default, {
      style: styles.imageItemClass,
      source: item?.avatar
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: item?.title,
      style: styles.textTitleMyClass,
      numberOfLines: 2
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewDateItem,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_field.default, {
        width: 18,
        height: 18
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: item?.fieldName,
        style: styles.textDateMyClass
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewDateItem,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_watch.default, {
        width: 18,
        height: 18
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${item?.duration?.toString()} giờ`,
        style: styles.textDateMyClass
      })]
    })]
  });
  const renderHeader = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.viewClassFilter,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewTextClass,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-list-subject",
        style: styles.textClass
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: ` (${totalSubject})`,
        style: [styles.textClass, {
          color: _colors.Color.color_text_progress_bar
        }]
      })]
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
      refreshControl: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.RefreshControl, {
        refreshing: isRefreshing,
        onRefresh: onRefresh
      }),
      data: listSubject,
      ListHeaderComponent: renderHeader,
      renderItem: ({
        item,
        index
      }) => renderItemSubject(item, index),
      keyExtractor: (item, index) => index.toString(),
      numColumns: 2,
      contentContainerStyle: styles.contentContainerStyle
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainerStyle: {
    backgroundColor: _colors.Color.white
  },
  viewItemClass: {
    width: WIDTH_ITEM,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: (0, _scales.vertical)(15),
    marginRight: (0, _scales.horizontal)(20),
    paddingHorizontal: (0, _scales.horizontal)(20)
  },
  imageItemClass: {
    height: IMAGE_HEIGHT,
    width: WIDTH_ITEM,
    alignSelf: 'flex-start',
    borderRadius: 8
  },
  textTitleMyClass: {
    fontSize: 12,
    fontWeight: '700',
    color: _colors.Color.text_color,
    marginTop: (0, _scales.vertical)(10),
    height: (0, _scales.vertical)(20),
    fontFamily: _fonts.default.bold,
    lineHeight: 20.4
  },
  viewDateItem: {
    flexDirection: 'row',
    marginTop: (0, _scales.vertical)(5)
  },
  textDateMyClass: {
    fontSize: 10,
    fontWeight: '400',
    color: _colors.Color.text_color,
    lineHeight: 16,
    paddingHorizontal: (0, _scales.horizontal)(5),
    fontFamily: _fonts.default.regular
  },
  viewProgress: {
    marginTop: (0, _scales.vertical)(10),
    backgroundColor: _colors.Color.color_bg_progress_bar
  },
  textProgress: {
    fontSize: 10,
    fontWeight: '600',
    color: _colors.Color.color_text_progress_bar,
    marginTop: (0, _scales.vertical)(5)
  },
  viewClassFilter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: (0, _scales.vertical)(20),
    marginHorizontal: (0, _scales.horizontal)(20)
  },
  viewTextClass: {
    flexDirection: 'row'
  },
  textClass: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25.2
  }
});
var _default = exports.default = ListSubject;
//# sourceMappingURL=ListSubject.js.map