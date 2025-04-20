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
var _RenderViewTitle = _interopRequireDefault(require("@components/RenderViewTitle"));
var _reactRedux = require("react-redux");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const BottomSheetFilterMyTestSearch = props => {
  const appColor = (0, _reactRedux.useSelector)(state => state.global.appColor);
  const {
    isOpenModal,
    closeModal,
    handleApplyOnPress,
    model
  } = props;
  const translateY = (0, _reactNativeReanimated.useSharedValue)(_platforms.screenHeight);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const [viewHeight, setViewHeight] = (0, _react.useState)(0);
  const [lmsMytestFilter, setLmsMyTestFilter] = (0, _react.useState)({
    offset: 0,
    limit: 10,
    keyword: '',
    statusRegistor: [{
      A: model?.statusRegistor[0] === 1,
      B: model?.statusRegistor[1] === 2,
      C: model?.statusRegistor[2] === 3
    }]
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
  const RenderViewStatusRelation = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RenderViewTitle.default, {
      i18keyContext: "text-study-state-required",
      i18KeyDelete: "delete_button_sheet",
      type: 2,
      onDeleteAction: keyDelete => {
        onDeleteAction(keyDelete);
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-officially",
      type: 2,
      status: lmsMytestFilter.statusRelation[0].A,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsMyTestFilter(prevState => ({
          ...prevState,
          statusRelation: prevState.statusRelation.map((item, i) => i === 0 ? {
            ...item,
            A: !item.A
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-practice",
      type: 2,
      status: lmsMytestFilter.statusRelation[0].B,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsMyTestFilter(prevState => ({
          ...prevState,
          statusRelation: prevState.statusRelation.map((item, i) => i === 0 ? {
            ...item,
            B: !item.B
          } : item)
        }));
      }
    })]
  }), [lmsMytestFilter]);
  const RenderViewTimeProcess = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
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
      status: lmsMytestFilter.statusRegistor[0].A,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsMyTestFilter(prevState => ({
          ...prevState,
          statusRegistor: prevState.statusRegistor.map((item, i) => i === 0 ? {
            ...item,
            A: !item.A
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-time-will-processing",
      type: 2,
      status: lmsMytestFilter.statusRegistor[0].B,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsMyTestFilter(prevState => ({
          ...prevState,
          statusRegistor: prevState.statusRegistor.map((item, i) => i === 0 ? {
            ...item,
            B: !item.B
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
      i18nKeyContext: "text-time-processed",
      type: 2,
      status: lmsMytestFilter.statusRegistor[0].C,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsMyTestFilter(prevState => ({
          ...prevState,
          statusRegistor: prevState.statusRegistor.map((item, i) => i === 0 ? {
            ...item,
            C: !item.C
          } : item)
        }));
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.viewLine
    })]
  }), [lmsMytestFilter]);
  const onDeleteAction = key => {
    switch (key) {
      case 'text-time-process':
      case 'type_of_item':
        setLmsMyTestFilter({
          ...lmsMytestFilter,
          statusRegistor: [{
            A: false,
            B: false,
            C: false
          }]
        });
        break;
      default:
        break;
    }
  };
  const transformObject = obj => {
    // Transform statusRelation
    const statusRegistor = obj.statusRegistor.flatMap(item => {
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

    // Transform statusTime
    // const statusTime = obj.statusTime.flatMap((item) => {
    //   const result = [];
    //   if (item.A) {
    //     result.push(1);
    //   } else {
    //     result.push(0);
    //   }
    //   if (item.B) {
    //     result.push(2);
    //   } else {
    //     result.push(0);
    //   }
    //   if (item.C) {
    //     result.push(3);
    //   } else {
    //     result.push(0);
    //   }
    //   return result;
    // });

    return {
      ...obj,
      statusRegistor
      // statusTime: statusTime,
    };
  };
  const checkDataCallBack = () => {
    const newObj = transformObject(lmsMytestFilter);
    handleApplyOnPress(newObj);
    closeModal();
  };
  const onViewLayout = event => {
    const {
      height
    } = event.nativeEvent.layout;
    setViewHeight(height);
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
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                activeOpacity: 1,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RenderViewTitle.default, {
                  i18keyContext: "type_of_item",
                  i18KeyDelete: "delete_all_button_sheet",
                  type: 1,
                  onDeleteAction: keyDelete => {
                    onDeleteAction(keyDelete);
                  }
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.viewLine
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderViewTimeProcess, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
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
    maxHeight: _platforms.screenHeight * 0.7,
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
    backgroundColor: _colors.Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  viewLine: {
    height: (0, _scales.vertical)(10),
    width: '100%',
    backgroundColor: _colors.Color.color_bg_progress_bar
  },
  viewDots: {
    paddingHorizontal: (0, _scales.vertical)(14)
  },
  btnApply: {
    backgroundColor: _colors.Color.base_color,
    height: 56,
    margin: (0, _scales.horizontal)(14),
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
var _default = exports.default = BottomSheetFilterMyTestSearch;
//# sourceMappingURL=index.js.map