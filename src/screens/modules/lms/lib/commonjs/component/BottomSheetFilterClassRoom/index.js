"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _platforms = require("@utils/platforms");
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _ItemSwitchDots = _interopRequireDefault(require("@components/ItemSwitchDots"));
var _icon_cancel = _interopRequireDefault(require("@assets/icons/icon_cancel.svg"));
var _reactRedux = require("react-redux");
var _RenderViewTitle = _interopRequireDefault(require("@components/RenderViewTitle"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const BottomSheetFilterClassRoom = props => {
  const {
    isOpenModal,
    closeModal,
    handleApplyOnPress,
    model
  } = props;
  const appColor = (0, _reactRedux.useSelector)(state => state.global.appColor);
  const translateY = (0, _reactNativeReanimated.useSharedValue)(_platforms.screenHeight);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const [viewHeight, setViewHeight] = (0, _react.useState)(0);
  const [lmsClassFilter, setLmsClassFilter] = (0, _react.useState)({
    offset: 0,
    limit: 20,
    keyword: '',
    orderBy: 1,
    // Ko dùng
    statusLearn: [{
      A: model?.statusLearn[0] === 1,
      B: model?.statusLearn[1] === 2,
      C: model?.statusLearn[2] === 3
    }],
    statusRelation: [{
      A: model?.statusRelation[0] === 1,
      B: model?.statusRelation[1] === 2
    }],
    statusClass: [{
      A: model?.statusClass[0] === 1,
      B: model?.statusClass[1] === 2,
      C: model?.statusClass[2] === 3
    }],
    classOrganizationType: [{
      A: model?.classOrganizationType[0] === 1,
      B: model?.classOrganizationType[1] === 2
    }],
    dataRange: [],
    // ko dùng
    classCategoryId: model?.classCategoryId
  });
  (0, _react.useEffect)(() => {
    if (isOpenModal) {
      translateY.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 500
      }, () => {
        opacity.value = (0, _reactNativeReanimated.withTiming)(1, {
          duration: 300
        });
      });
    } else {
      opacity.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 300
      }, () => {
        translateY.value = (0, _reactNativeReanimated.withTiming)(_platforms.screenHeight, {
          duration: 500
        });
      });
    }
  }, [isOpenModal]);
  const translationStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateY: translateY.value
    }]
  }));
  const opacityStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));

  /**
   * Trạng thái học tập.
   */
  const RederStatusLearn = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RenderViewTitle.default, {
      i18keyContext: "text-study-state",
      i18KeyDelete: "delete_button_sheet",
      type: 2,
      onDeleteAction: keyDelete => {
        onDeleteAction(keyDelete);
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-studying-state",
      type: 2,
      status: lmsClassFilter.statusLearn[0].A,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusLearn: prevState.statusLearn.map((item, i) => i === 0 ? {
            ...item,
            A: !item.A
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-studyed-state",
      type: 2,
      status: lmsClassFilter.statusLearn[0].B,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusLearn: prevState.statusLearn.map((item, i) => i === 0 ? {
            ...item,
            B: !item.B
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-study-no-state",
      type: 2,
      status: lmsClassFilter.statusLearn[0].C,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusLearn: prevState.statusLearn.map((item, i) => i === 0 ? {
            ...item,
            C: !item.C
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.viewLine
    })]
  }), [lmsClassFilter]);

  /**
   * Trạng thái bắt buộc.
   */
  const RenderStatusRelation = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RenderViewTitle.default, {
      i18keyContext: "text-study-state-required",
      i18KeyDelete: "delete_button_sheet",
      type: 2,
      onDeleteAction: keyDelete => {
        onDeleteAction(keyDelete);
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-study-required",
      type: 2,
      status: lmsClassFilter.statusRelation[0].A,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusRelation: prevState.statusRelation.map((item, i) => i === 0 ? {
            ...item,
            A: !item.A
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-study-state-elective",
      type: 2,
      status: lmsClassFilter.statusRelation[0].B,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusRelation: prevState.statusRelation.map((item, i) => i === 0 ? {
            ...item,
            B: !item.B
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.viewLine
    })]
  }), [lmsClassFilter]);

  /**
   * Tiến trình thời gian.
   */
  const RenderStatusClass = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RenderViewTitle.default, {
      i18keyContext: "text-time-process",
      i18KeyDelete: "delete_button_sheet",
      type: 2,
      onDeleteAction: keyDelete => {
        onDeleteAction(keyDelete);
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-time-processing",
      type: 2,
      status: lmsClassFilter.statusClass[0].A,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusClass: prevState.statusClass.map((item, i) => i === 0 ? {
            ...item,
            A: !item.A
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-time-will-processing",
      type: 2,
      status: lmsClassFilter.statusClass[0].B,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusClass: prevState.statusClass.map((item, i) => i === 0 ? {
            ...item,
            B: !item.B
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-time-processed",
      type: 2,
      status: lmsClassFilter.statusClass[0].C,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusClass: prevState.statusClass.map((item, i) => i === 0 ? {
            ...item,
            C: !item.C
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.viewLine
    })]
  }), [lmsClassFilter]);

  /**
   * Loại tổ chức.
   */
  const RenderClassOrganizationType = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RenderViewTitle.default, {
      i18keyContext: "text-study-organization-type",
      i18KeyDelete: "delete_button_sheet",
      type: 2,
      onDeleteAction: keyDelete => {
        onDeleteAction(keyDelete);
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-study-simple-type",
      type: 2,
      status: lmsClassFilter.classOrganizationType[0].A,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          classOrganizationType: prevState.classOrganizationType.map((item, i) => i === 0 ? {
            ...item,
            A: !item.A
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-study-program",
      type: 2,
      status: lmsClassFilter.classOrganizationType[0].B,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          classOrganizationType: prevState.classOrganizationType.map((item, i) => i === 0 ? {
            ...item,
            B: !item.B
          } : item)
        }));
      }
    })]
  }), [lmsClassFilter]);
  const onDeleteAction = key => {
    let lmsClassFilterNew = {
      ...lmsClassFilter
    };
    switch (key) {
      case 'type_of_item':
        // Xoa het
        lmsClassFilterNew = {
          ...lmsClassFilter,
          statusLearn: [{
            A: false,
            B: false,
            C: false
          }],
          statusRelation: [{
            A: false,
            B: false
          }],
          statusClass: [{
            A: false,
            B: false,
            C: false
          }],
          classOrganizationType: [{
            A: false,
            B: false
          }]
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-study-state':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          statusLearn: [{
            A: false,
            B: false,
            C: false
          }]
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-study-state-required':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          statusRelation: [{
            A: false,
            B: false
          }]
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-time-process':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          statusClass: [{
            A: false,
            B: false,
            C: false
          }]
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-study-organization-type':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          classOrganizationType: [{
            A: false,
            B: false
          }]
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      default:
        break;
    }
  };

  /**
   * Get height view bottomsheet.
   * @param {} event
   */
  const onViewLayout = event => {
    const {
      height
    } = event.nativeEvent.layout;
    setViewHeight(height);
  };
  const transformObject = obj => {
    // Transform statusLearn
    const newStatusLearn = obj.statusLearn.flatMap(item => {
      const result = [];
      if (item.A) {
        result.push(1);
      } else {
        result.push(0);
      }
      if (item.B) {
        result.push(2);
      } else {
        result.push(0);
      }
      if (item.C) {
        result.push(3);
      } else {
        result.push(0);
      }
      return result;
    });

    // Transform statusRelation
    const newStatusRelation = obj.statusRelation.flatMap(item => {
      const result = [];
      if (item.A) {
        result.push(1);
      } else {
        result.push(0);
      }
      if (item.B) {
        result.push(2);
      } else {
        result.push(0);
      }
      return result;
    });
    // Transform statusClass
    const newStatusClass = obj.statusClass.flatMap(item => {
      const result = [];
      if (item.A) {
        result.push(1);
      } else {
        result.push(0);
      }
      if (item.B) {
        result.push(2);
      } else {
        result.push(0);
      }
      if (item.C) {
        result.push(3);
      } else {
        result.push(0);
      }
      return result;
    });

    // Transform classOrganizationType
    const newClassOrganizationType = obj.classOrganizationType.flatMap(item => {
      const result = [];
      if (item.A) {
        result.push(1);
      } else {
        result.push(0);
      }
      if (item.B) {
        result.push(2);
      } else {
        result.push(0);
      }
      return result;
    });
    return {
      ...obj,
      statusLearn: newStatusLearn,
      statusRelation: newStatusRelation,
      statusClass: newStatusClass,
      classOrganizationType: newClassOrganizationType
    };
  };
  const checkDataCallBack = () => {
    const newObj = transformObject(lmsClassFilter);
    handleApplyOnPress(newObj);
    closeModal();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
    supportedOrientations: ['portrait', 'landscape'],
    animationType: "fade",
    transparent: true,
    visible: isOpenModal,
    propagateSwipe: true,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeReanimated.default.View, {
      style: [styles.viewButtonSheet, translationStyles],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
        style: [{
          ..._reactNative.StyleSheet.absoluteFillObject,
          backgroundColor: '#0000004D'
        }, opacityStyles]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
        style: {
          ..._reactNative.StyleSheet.absoluteFillObject
        },
        activeOpacity: 1,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          style: [styles.btnCancel, {
            bottom: viewHeight + (0, _scales.vertical)(10)
          }],
          onPress: closeModal,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_cancel.default, {
            width: 24,
            height: 24
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableWithoutFeedback, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: [styles.buttonSheet],
            onLayout: onViewLayout,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
              scrollEnabled: true,
              bounces: false,
              showsVerticalScrollIndicator: false,
              style: styles.scrollView,
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
                activeOpacity: 1,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RenderViewTitle.default, {
                  i18keyContext: "type_of_item",
                  i18KeyDelete: "delete_all_button_sheet",
                  type: 1,
                  onDeleteAction: keyDelete => {
                    onDeleteAction(keyDelete);
                  }
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RederStatusLearn, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderStatusRelation, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderStatusClass, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderClassOrganizationType, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                  style: [styles.btnApply, {
                    backgroundColor: appColor?.base_color
                  }],
                  onPress: checkDataCallBack,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                    i18nKey: "text_btn_apply",
                    style: styles.textBtnApply
                  })
                })]
              })
            })
          })
        })]
      })]
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  viewButtonSheet: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: _colors.Color.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: _platforms.screenHeight * 0.7,
    paddingVertical: 24
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: (0, _scales.vertical)(14),
    paddingHorizontal: (0, _scales.vertical)(14)
  },
  textTitle: {
    fontSize: (0, _scales.textSize)(20),
    color: _colors.Color.text_color,
    fontWeight: '700',
    lineHeight: 28
  },
  textDelete: {
    fontWeight: '400',
    color: _colors.Color.base_color,
    fontSize: (0, _scales.textSize)(12)
  },
  scrollView: {
    height: _platforms.screenHeight * 0.7
  },
  viewBody: {
    marginTop: (0, _scales.vertical)(15),
    paddingHorizontal: (0, _scales.horizontal)(20)
  },
  textItem: {
    fontSize: (0, _scales.textSize)(16),
    color: _colors.Color.cl_text_app
  },
  btnCancel: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  viewLine: {
    height: (0, _scales.vertical)(10),
    width: '100%',
    backgroundColor: _colors.Color.color_border
  },
  viewDots: {
    paddingHorizontal: (0, _scales.vertical)(14)
  },
  btnApply: {
    backgroundColor: _colors.Color.base_color,
    height: 56,
    marginHorizontal: (0, _scales.horizontal)(14),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBtnApply: {
    fontSize: (0, _scales.textSize)(16),
    fontWeight: '700',
    color: _colors.Color.white,
    lineHeight: (0, _scales.textSize)(20)
  }
});
var _default = exports.default = BottomSheetFilterClassRoom;
//# sourceMappingURL=index.js.map