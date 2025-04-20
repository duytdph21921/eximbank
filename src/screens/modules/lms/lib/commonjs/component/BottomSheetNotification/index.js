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
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const BottomSheetNotification = props => {
  const {
    isOpenModal,
    closeModal,
    handleApplyOnPress,
    filter
  } = props;
  const translateY = (0, _reactNativeReanimated.useSharedValue)(_platforms.screenHeight);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const [viewHeight, setViewHeight] = (0, _react.useState)(0);
  const [model, setModel] = (0, _react.useState)([{
    id: -1,
    key_title: 'text-all-state',
    isSelect: filter === -1
  }, {
    id: 1,
    key_title: 'text-state-is-readed',
    isSelect: filter === 1
  }, {
    id: 2,
    key_title: 'text-state-un-read',
    isSelect: filter === 2
  }]);
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
  const handleOptionSelect = id => {
    const newModel = model.map(item => item.id === id ? {
      ...item,
      isSelect: true
    } : {
      ...item,
      isSelect: false
    });
    setModel(newModel);
  };
  const onHandleApply = () => {
    handleApplyOnPress(model.find(item => item.isSelect === true).id);
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
  const RenderItem = (0, _react.useCallback)(() => model.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSwitchDots.default, {
    i18nKeyContext: item?.key_title,
    type: 1,
    status: item?.isSelect,
    containerStyle: styles.viewDots,
    onPress: () => {
      handleOptionSelect(item?.id);
    }
  }, item.id || index)), [model]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
    supportedOrientations: ['portrait', 'landscape'],
    animationType: "fade",
    transparent: true,
    visible: isOpenModal,
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
                  onDeleteAction: () => {
                    handleOptionSelect(-1);
                  }
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderItem, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                  style: [styles.btnApply, {
                    backgroundColor: _colors.Color.base_color
                  }],
                  onPress: onHandleApply,
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
    paddingVertical: 24,
    maxHeight: _platforms.screenHeight / 2
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
  viewDots: {
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  btnApply: {
    backgroundColor: _colors.Color.base_color,
    height: 56,
    marginHorizontal: (0, _scales.horizontal)(14),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (0, _scales.vertical)(20),
    bottom: (0, _scales.vertical)(0)
  },
  textBtnApply: {
    fontSize: (0, _scales.textSize)(16),
    fontWeight: '700',
    color: _colors.Color.white,
    lineHeight: (0, _scales.textSize)(20)
  }
});
var _default = exports.default = BottomSheetNotification;
//# sourceMappingURL=index.js.map