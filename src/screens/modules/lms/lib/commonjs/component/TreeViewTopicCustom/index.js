"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _reactRedux = require("react-redux");
var _scales = require("@utils/scales");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _icon_content_class = _interopRequireDefault(require("@assets/other/icon_content_class.svg"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _helpers = require("@utils/helpers");
var _platforms = require("@utils/platforms");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable prettier/prettier */
/* eslint-disable global-require */

const TreeViewTopicCustom = props => {
  const {
    data,
    onViewClassContent
  } = props;
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const [expandedNodes, setExpandedNodes] = (0, _react.useState)({}); // Quản lý trạng thái mở rộng

  (0, _react.useEffect)(() => {
    setExpandedNodes({});
    // Neu data co gia tri thi moi lay
    if (data && data.length > 0) {
      setExpandedNodes(prevState => ({
        ...prevState,
        [data[0]?.id]: !prevState[data[0]?.id]
      }));
    }
  }, [data]);

  // Hàm toggle mở rộng/thu gọn node
  const toggleNode = id => {
    setExpandedNodes(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  const renderViewTree = item => {
    if (item?.level >= 1 && item?.isFolder === true) return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.boxViewTree,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.viewItemLevel1, {
          width: 10 + (item?.level ?? 0) * 9
        }]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.dotTree, {
          left: 10 + (item?.level ?? 0) * 9
        }]
      })]
    });
    if (item?.level >= 1) return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.boxViewTree,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.viewItemLevel1, {
          width: 10 + (item?.level ?? 0) * 9
        }]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.dotTree, {
          left: 10 + (item?.level ?? 0) * 9
        }]
      })]
    });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  };
  const getTextStyle = item => {
    if (item?.isFolder && item?.level === 0) return styles.textLevel0;
    if (item?.isFolder && item?.level === 1) return styles.textLevel1;
    return styles.textContent;
  };

  // Hàm render từng item
  const renderItem = ({
    item
  }) => {
    const isExpanded = expandedNodes[item.id];
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.itemContainer],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.boxViewContent,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: item?.level === 0 ?? styles.viewLevel0,
          children: [renderViewTree(item), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: [styles.itemContent, item?.level === 0 ? {
              marginLeft: 10 * (item?.level ?? 1)
            } : {
              marginLeft: 10 * (item?.level ?? 1) + 50
            }],
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.marginText,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                children: item?.level === 0 && item?.isFolder === true ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                  onPress: () => {
                    toggleNode(item?.id);
                  },
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_content_class.default, {
                    style: [styles.iconContent, item?.isFolder === true && {
                      marginTop: (0, _scales.vertical)(2)
                    }],
                    width: 20,
                    height: 20
                  })
                }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {})
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.flexItem,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                  children: item?.isFolder === false ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.boxViewContent,
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
                      onPress: () => {
                        if (item?.isFolder === false) {
                          onViewClassContent(item);
                        } else toggleNode(item?.id);
                      },
                      children: [item?.totalComment > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: {
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          width: '95%'
                        },
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                          style: [getTextStyle(item), {
                            width: _platforms.screenWidth - 2 * (5 * (item?.level ?? 1) + 50)
                          }],
                          title: `${item?.title} (${item?.totalComment})`
                        })
                      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: {
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          width: '95%'
                        },
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                          style: [getTextStyle(item), {
                            width: _platforms.screenWidth - 2 * (5 * (item?.level ?? 1) + 50)
                          }],
                          title: `${item?.title}`
                        })
                      }), item?.usernameTopic && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                        style: styles.lastestTopic,
                        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                          style: {
                            flexDirection: 'row'
                          },
                          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                            i18nKey: "text-lastest",
                            style: styles.textLastest
                          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                            title: `: ${item?.titleTopic}`,
                            style: styles.titleTopic
                          })]
                        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                          style: {
                            flexDirection: 'row',
                            marginTop: (0, _scales.vertical)(10)
                          },
                          children: [item?.avatarTopic ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
                            source: {
                              uri: (0, _helpers.loadFile)(item?.avatarTopic)
                            },
                            resizeMode: "contain",
                            style: styles.avatarProfile
                          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
                            source: require('@assets/img/avatar-detail.png'),
                            resizeMode: "contain",
                            style: styles.avatarProfile
                          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                            title: item?.displayNameTopic,
                            style: [styles.displayNameTopic, {
                              marginLeft: (0, _scales.horizontal)(10)
                            }]
                          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                            style: styles.dot
                          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                            title: (0, _helpers.calculatorTime)(item?.createdDateTopic, languageLocal),
                            style: styles.displayNameTopic
                          })]
                        })]
                      })]
                    })
                  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                      onPress: () => {
                        if (item?.isFolder === false) onViewClassContent(item);else toggleNode(item?.id);
                      },
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                        style: [getTextStyle(item), {
                          width: _platforms.screenWidth - 2 * (5 * (item?.level ?? 1) + 50)
                        }],
                        title: item?.title
                      })
                    })
                  })
                })
              })]
            })
          })]
        })
      }), item?.hasChildren && isExpanded && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
        data: item.childs,
        renderItem: renderItem,
        keyExtractor: child => child.id.toString(),
        showsVerticalScrollIndicator: false
      })]
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
    data: data,
    renderItem: renderItem,
    keyExtractor: item => item.id.toString(),
    style: styles.boxContent,
    showsVerticalScrollIndicator: false
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: _colors.Color.white,
    flex: 1
  },
  boxContent: {
    marginVertical: (0, _scales.vertical)(5),
    marginHorizontal: (0, _scales.horizontal)(24)
  },
  flexItem: {
    flexDirection: 'row'
  },
  iconContent: {
    marginRight: (0, _scales.horizontal)(5)
  },
  viewLevel0: {
    position: 'relative'
  },
  viewItemLevel1: {
    position: 'absolute',
    height: 1,
    left: 0,
    width: 16,
    backgroundColor: _colors.Color.color_width_featured_class,
    top: 10
  },
  viewItemLevelChild: {
    borderLeftWidth: 1,
    borderLeftColor: _colors.Color.color_width_featured_class,
    position: 'absolute',
    height: '100%',
    width: 16,
    left: 30,
    borderRadius: 0.01
  },
  textLevel0: {
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
    flexWrap: 'wrap'
  },
  textLevel1: {
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 23.8,
    flexWrap: 'wrap'
  },
  textContent: {
    fontFamily: _fonts.default.semi,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 20.4,
    flexWrap: 'wrap'
  },
  dotTree: {
    width: 5,
    height: 5,
    backgroundColor: _colors.Color.color_width_featured_class,
    position: 'absolute',
    top: 8,
    borderRadius: 5
  },
  itemContent: {
    flexDirection: 'row',
    // alignItems: "flex-start",
    justifyContent: 'space-between'
  },
  iconFinish: {
    marginRight: 8
  },
  textContentType: {
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16
  },
  marginText: {
    marginBottom: 16,
    flexDirection: 'row'
  },
  boxViewTree: {
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
    position: 'absolute',
    height: '100%',
    width: 16,
    left: 30
  },
  itemContentType: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: (0, _scales.vertical)(4)
  },
  icon: {
    marginRight: (0, _scales.horizontal)(5)
  },
  boxViewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconDownload: {
    alignSelf: 'flex-end'
  },
  lastestTopic: {
    padding: 8,
    backgroundColor: _colors.Color.color_bg_tab_view,
    width: _platforms.screenWidth
  },
  titleTopic: {
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20.4,
    flex: 1,
    flexWrap: 'wrap'
  },
  textLastest: {
    fontFamily: _fonts.default.medium,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 20.4
  },
  avatarProfile: {
    width: 20,
    height: 20,
    borderRadius: 20
  },
  displayNameTopic: {
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
    color: _colors.Color.text_color_hover
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: _colors.Color.text_color_hover,
    borderRadius: 5,
    marginHorizontal: (0, _scales.horizontal)(10),
    marginTop: 5
  }
});
var _default = exports.default = TreeViewTopicCustom;
//# sourceMappingURL=index.js.map