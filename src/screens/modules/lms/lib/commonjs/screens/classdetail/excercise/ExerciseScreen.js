"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _icon_exercise_class = _interopRequireDefault(require("@assets/icons/icon_exercise_class.svg"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _globalSlice = require("@store/reducers/globalSlice");
var _scales = require("@utils/scales");
var _reactNativeFontawesome = require("@fortawesome/react-native-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _helpers = require("@utils/helpers");
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _he = _interopRequireDefault(require("he"));
var _lmsclassexerciseApi = require("../../../services/lmsclassexercise.api.js");
var _index = _interopRequireDefault(require("../../../component/BottomSheetSeeComments/index.js"));
var _index2 = _interopRequireDefault(require("../../../component/BottomSheetExercise/index.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const ExerciseScreen = props => {
  const {
    classInfo,
    index
  } = props;
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const [isOpenModalComment, setIsOpenModalComment] = (0, _react.useState)(false);
  const [dataExercise, setDataExercise] = (0, _react.useState)([]);
  const [idExercise, setIdExercise] = (0, _react.useState)(0);
  const [isRefreshing, setRefreshing] = (0, _react.useState)(false);
  const dispatch = (0, _reactRedux.useDispatch)();
  const isMounteRef = (0, _react.useRef)(false);
  const params = {
    submitStatus: -1,
    timeLineStatus: -1,
    classId: classInfo?.id
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    if (isMounteRef.current) {
      dispatch((0, _globalSlice.updateLoadingAction)(true));
      getData();
      dispatch((0, _globalSlice.updateLoadingAction)(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, [index]);
  const getData = async () => {
    const response = await (0, _lmsclassexerciseApi.frGetByClassId)(params);
    if (response?.status && isMounteRef.current) {
      setDataExercise(response?.data);
    }
  };
  const RenderBottomSheetSeeComments = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
    isOpenModalComment: isOpenModalComment,
    idExercise: idExercise,
    closeModal: () => {
      setIsOpenModalComment(false);
    }
  }), [isOpenModalComment]);
  const RenderBottomSheetExercise = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
    isOpenModal: isOpenModal,
    idExercise: idExercise,
    handleApplyOnPress: () => {
      getData();
    },
    closeModal: () => {
      setIsOpenModal(false);
    }
  }), [isOpenModal]);
  const onRefresh = (0, _react.useCallback)(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  });
  const onUpdateExtend = itemExtend => {
    setDataExercise(prevData => prevData.map(item => {
      if (item?.id === itemExtend?.id) {
        return {
          ...item,
          isExtend: !item.isExtend
        };
      }
      return item;
    }));
  };
  const renderKey18n = item => {
    if (item?.isExerciseEnd === false && item?.isExerciseNotStart === false && item?.submitStatus === 0) {
      return 'text-button-submit-exam';
    }
    if (item?.isExerciseEnd === false && item?.isExerciseNotStart === false && item?.submitStatus === 1) {
      return 'text-button-resubmit';
    }
    if (item?.isExerciseNotStart === true && item?.submitStatus !== 2) {
      return 'text-class-not-time-to-submit-exam';
    }
    if (item?.isExerciseEnd === true && item?.submitStatus !== 2) {
      return 'text-button-finished';
    }
    if (item?.submitStatus === 2) {
      return 'text-button-viewComment';
    }
    return '';
  };
  const renderItemExercise = (item, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.classInfo,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.block,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          flex: 0.1
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.boxNumber,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: styles.textNumber,
            title: `${index + 1}`
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          flex: 1
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.boxContent,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.header,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: {
                flex: 0.7
              },
              children: [item?.submitStatus === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                style: styles.headerNotSubmitText,
                i18nKey: "text-button-not-yet-submitted"
              }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                style: styles.headerSubmitText,
                i18nKey: "text-button-submitted"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                style: styles.description,
                title: item?.title
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: {
                flex: 0.2
              },
              children: [item?.mark ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                style: styles.scoreText,
                title: `${item?.mark ?? 0} `,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                  style: styles.scoreText,
                  i18nKey: "text_mark_score"
                })
              }) : null, item?.isExerciseEnd === false && item?.isExerciseNotStart === false && item?.submitStatus === 1 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                style: styles.waitingText,
                i18nKey: "text-class-waiting-for-scoring"
              }) : null, item?.fileId && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
                onPress: () => (0, _helpers.downloadFile)(item?.fileId, dispatch),
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_exercise_class.default, {
                  style: styles.iconAttach,
                  width: 18,
                  height: 18
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                  style: styles.buttonText,
                  i18nKey: "text-button-download"
                })]
              })]
            })]
          }), item?.isExtend === true &&
          /*#__PURE__*/
          // <RenderHTML
          //   contentWidth={screenWidth - horizontal(2 * 20)}
          //   source={{
          //     html: item?.desciption ?? "",
          //   }}
          //   //tagsStyles={mixedStyle}
          // />
          (0, _jsxRuntime.jsx)(_CMText.default, {
            title: `${_he.default.decode((0, _helpers.replaceHtml)(item?.description ?? ''))} `,
            style: _globalStyles.default.textNomal
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
            onPress: () => {
              onUpdateExtend(item);
            },
            children: item?.isExtend === true ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.expandView,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                style: styles.extend,
                i18nKey: "text-tabar-label-collapse"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
                style: styles.extend,
                icon: _freeSolidSvgIcons.faChevronUp
              })]
            }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.expandView,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                style: styles.extend,
                i18nKey: "text-button-expand"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
                style: styles.extend,
                icon: _freeSolidSvgIcons.faChevronDown
              })]
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.divided
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: styles.deadline,
            i18nKey: "text-button-expiry-date",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: styles.deadline,
              title: `: ${item?.endDate} `
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
            onPress: () => {
              setIdExercise(item?.id);
              if (item?.isExerciseEnd === false && item?.isExerciseNotStart === false && (item?.submitStatus === 0 || item?.submitStatus === 1)) {
                setIsOpenModal(true);
              }
              // if (item?.isExerciseNotStart === true) {
              // }
              // if (item?.isExerciseEnd === true) {
              // }
              if (item?.submitStatus === 2) {
                setIsOpenModalComment(true);
              }
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: styles.btnViewComment,
              i18nKey: renderKey18n(item)
            })
          })]
        })
      })]
    })
  }, index);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
      refreshControl: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.RefreshControl, {
        refreshing: isRefreshing,
        onRefresh: onRefresh
      }),
      keyExtractor: (item, index) => index.toString(),
      data: dataExercise,
      showsVerticalScrollIndicator: false,
      renderItem: ({
        item,
        index
      }) => renderItemExercise(item, index),
      numColumns: 1,
      contentContainerStyle: styles.contentContainerStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderBottomSheetSeeComments, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderBottomSheetExercise, {})]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white
  },
  classInfo: {
    padding: 20,
    backgroundColor: _colors.Color.white
  },
  block: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: _colors.Color.white,
    borderColor: _colors.Color.color_width_featured_class,
    borderWidth: 1,
    borderRadius: 18,
    padding: 10,
    shadowColor: _colors.Color.black,
    elevation: 1
  },
  boxContent: {
    paddingHorizontal: 10
  },
  boxNumber: {
    width: 25,
    height: 25,
    backgroundColor: _colors.Color.color_width_featured_class,
    borderRadius: 8,
    marginHorizontal: 5
  },
  headerAndContent: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  headerSubmitText: {
    color: _colors.Color.color_pass,
    fontSize: 12,
    fontFamily: _fonts.default.bold,
    fontWeight: '600',
    lineHeight: 20.4
  },
  headerNotSubmitText: {
    color: _colors.Color.color_yellow_NotSubmit_exercise,
    fontSize: 12,
    fontFamily: _fonts.default.bold,
    fontWeight: '600',
    lineHeight: 20.4
  },
  headerPointPaidText: {
    color: _colors.Color.base_color,
    fontSize: 12,
    fontFamily: _fonts.default.bold,
    fontWeight: '600',
    lineHeight: 20.4
  },
  textNumber: {
    fontFamily: _fonts.default.semi,
    fontWeight: '600',
    fontSize: 12,
    color: _colors.Color.text_color,
    paddingVertical: 3,
    textAlign: 'center'
  },
  pointsContainer: {
    borderRadius: 10
  },
  scoreText: {
    fontSize: 12,
    lineHeight: 20.4,
    fontWeight: '700',
    color: _colors.Color.red,
    fontFamily: _fonts.default.bold,
    marginLeft: 15
  },
  waitingText: {
    fontSize: 12,
    lineHeight: 20.4,
    fontWeight: '700',
    fontFamily: _fonts.default.bold,
    color: _colors.Color.base_color
  },
  description: {
    fontSize: 14,
    fontFamily: _fonts.default.bold,
    fontWeight: '600',
    lineHeight: 23.8,
    marginBottom: 8,
    marginVertical: 10
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginTop: 30
  },
  buttonText: {
    color: _colors.Color.color_border_answer,
    fontFamily: _fonts.default.medium,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 15
  },
  iconAttach: {
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 25
  },
  iconDown: {
    marginLeft: 10
  },
  btnViewComment: {
    backgroundColor: _colors.Color.white,
    width: 170,
    borderColor: _colors.Color.color_text_progress_bar,
    borderWidth: 1,
    borderRadius: 25,
    textAlign: 'center',
    padding: 12,
    fontSize: 14,
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    lineHeight: 20.4,
    marginVertical: 10
  },
  extend: {
    fontSize: 12,
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    lineHeight: 20.4,
    color: _colors.Color.text_color_hover,
    marginVertical: 5,
    marginRight: (0, _scales.horizontal)(5)
  },
  deadline: {
    fontSize: 12,
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    lineHeight: 20.4,
    color: _colors.Color.text_color_hover,
    marginVertical: 10
  },
  divided: {
    borderTopColor: _colors.Color.cl_background_guest,
    borderTopWidth: 0.5,
    marginVertical: 5
  },
  expandView: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
var _default = exports.default = ExerciseScreen;
//# sourceMappingURL=ExerciseScreen.js.map