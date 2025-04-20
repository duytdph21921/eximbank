"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _icon_add_course = _interopRequireDefault(require("@assets/icons/icon_add_course"));
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _globalSlice = require("@store/reducers/globalSlice");
var _icon_dots = _interopRequireDefault(require("@assets/icons/icon_dots.svg"));
var _helpers = require("@utils/helpers");
var _NotificationClassScreenStyles = require("./NotificationClassScreen.styles.js");
var _lmsclassnotificationApi = require("../../../services/lmsclassnotification.api.js");
var _index = _interopRequireDefault(require("../../../component/BottomSheetNotification/index.js"));
var _ViewNotificationClassEmpty = _interopRequireDefault(require("./components/ViewNotificationClassEmpty.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const NotificationClassScreen = props => {
  const {
    classInfo,
    index
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const [listNotification, setListNotification] = (0, _react.useState)([]);
  const isRefreshing = false;
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const isMounteRef = (0, _react.useRef)(false);
  const [params, setParams] = (0, _react.useState)({
    offset: 0,
    limit: 20,
    keyword: '',
    classId: classInfo?.id
  });
  const funcGetNotification = async model => {
    const response = await (0, _lmsclassnotificationApi.getNotification)(model);
    if (response?.status && isMounteRef.current) {
      setListNotification(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    if (index === 5) {
      dispatch((0, _globalSlice.updateLoadingAction)(true));
      funcGetNotification(params);
      dispatch((0, _globalSlice.updateLoadingAction)(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, [index]);

  /**
   * handle refresh list notification.
   */
  const onRefresh = () => {
    funcGetNotification(params);
  };
  const itemNotification = item => {
    const source = {
      html: item?.content
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      activeOpacity: 1,
      style: [_NotificationClassScreenStyles.styles.viewItemNoti, {
        marginVertical: 15
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: _NotificationClassScreenStyles.styles.viewContent,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: _NotificationClassScreenStyles.styles.viewTitle,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: item?.title,
            numberOfLines: 1,
            style: _NotificationClassScreenStyles.styles.textTitle
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: (0, _helpers.calculatorTime)(item?.createdDate, languageLocal),
            style: _NotificationClassScreenStyles.styles.textTime
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: _NotificationClassScreenStyles.styles.viewTitleDetail,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_add_course.default, {
            width: 24,
            height: 24
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: item?.createdUserDisplayName,
            numberOfLines: 1,
            style: _NotificationClassScreenStyles.styles.textDetail
          }), item?.isRead !== _constants.default.IS_READ && /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_dots.default, {
            width: 8,
            height: 8
          })]
        })]
      })
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
    style: _NotificationClassScreenStyles.styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
      refreshControl: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.RefreshControl, {
        refreshing: isRefreshing,
        onRefresh: onRefresh
      }),
      data: listNotification,
      renderItem: ({
        item,
        index
      }) => itemNotification(item, index),
      ListEmptyComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewNotificationClassEmpty.default, {}),
      keyExtractor: (item, index) => index.toString(),
      showsVerticalScrollIndicator: false,
      style: {
        paddingTop: 10
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      isOpenModal: isOpenModal,
      closeModal: () => {
        setIsOpenModal(false);
      },
      filter: params?.type,
      handleApplyOnPress: select => {
        const params = {
          keyword: '',
          type: select
        };
        setParams(params);
        // getDataNotification(params);
      }
    })]
  });
};
var _default = exports.default = NotificationClassScreen;
//# sourceMappingURL=NotificationClassScreen.js.map