"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _scales = require("@utils/scales");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _helpers = require("@utils/helpers");
var _globalSlice = require("@store/reducers/globalSlice");
var _lmssurveyApi = require("../../../services/lmssurvey.api.js");
var _ItemSurveyEssay = _interopRequireDefault(require("../survey_detail/components/ItemSurveyEssay.js"));
var _ItemSurveyMultipeSelect = _interopRequireDefault(require("../survey_detail/components/ItemSurveyMultipeSelect.js"));
var _ItemSurveyOneSelect = _interopRequireDefault(require("../survey_detail/components/ItemSurveyOneSelect.js"));
var _ItemSurveyParentChild = _interopRequireDefault(require("../survey_detail/components/ItemSurveyParentChild.js"));
var _SurveyResultDetailStyles = require("./SurveyResultDetail.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */

const SurveyResultDetailScreen = props => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    navigation,
    route
  } = props;
  const {
    surveyId,
    surveyUserId
  } = route?.params || {};
  const [listSurveyResult, setListSurveyResult] = (0, _react.useState)([]);
  const isRefreshing = false;
  const isMounteRef = (0, _react.useRef)(false);
  const renderHearderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-header-survey-result-detail-screen",
    style: _globalStyles.default.titleScreen
  }); // Title screen
  /**
   * Custom header.
   */
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHearderTitle
    });
  }, [navigation]);

  /**
   * Call api kết quả chi tiết làm bài khảo sát.
   */
  const funcGetBySurveyUserDetailResult = async () => {
    const response = await (0, _lmssurveyApi.getBySurveyUserDetailResult)(surveyUserId, surveyId);
    if (response?.status && response?.data && isMounteRef.current) {
      const listResult = response?.data;
      listResult.forEach(survey => {
        survey.lmsSurveyQuestions.forEach(question => {
          if (question.subContentData) {
            question.subContentData = question.subContentData.map(data => ({
              id: data.id,
              title: data.title,
              mark: data.mark,
              answerData: question.answerData.map(answer => ({
                id: answer.id,
                title: answer.title,
                mark: answer.mark,
                selected: false
              }))
            }));
          }
        });
      });
      listResult.forEach(survey => {
        survey.lmsSurveyQuestions.forEach(question => {
          if (question.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || question.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || question.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8) {
            question.answerData.forEach(answer1 => {
              const found = question?.lmsSurveyUserQuestionResult?.answerData.find(answer2 => answer2.row === answer1.id);
              if (found) {
                answer1.selected = true;
              } else {
                answer1.selected = false;
              }
            });
          } else if (question.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 || question.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4) {
            question.answerData.forEach(answer1 => {
              const found = question?.lmsSurveyUserQuestionResult?.answerData.find(answer2 => answer2.row === answer1.id);
              if (found) {
                answer1.selected = true;
              } else {
                answer1.selected = false;
              }
            });
          } else if (question.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 || question.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6) {
            question?.subContentData.forEach(subContent => {
              const matchedAnswers = question?.lmsSurveyUserQuestionResult?.answerData?.filter(answer => answer.row === subContent.id);
              subContent.answerData.forEach(answer => {
                const matchedAnswer = matchedAnswers?.find(matched => matched.col === answer.id);
                answer.selected = !!matchedAnswer;
              });
            });
          }
          // else if (
          //   question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7
          // ) {
          // }
        });
      });
      setListSurveyResult(listResult);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetBySurveyUserDetailResult();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const renderSurveyItem = (question, index) => {
    const {
      type
    } = question;
    if (type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSurveyOneSelect.default, {
        item: question,
        index: index,
        isDisable: true
      }, index);
    }
    if (type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 || type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSurveyMultipeSelect.default, {
        item: question,
        index: index,
        isDisable: true
      }, index);
    }
    if (type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 || type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSurveyParentChild.default, {
        item: question,
        index: index,
        isDisable: true
      }, index);
    }
    if (type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSurveyEssay.default, {
        item: question,
        index: index,
        isDisable: false
      }, index);
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {}, index);
  };
  const itemGroupSurvey = (item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: item?.name,
      style: _SurveyResultDetailStyles.styles.textTitleGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [_SurveyResultDetailStyles.styles.viewItemSurvey, {
        marginTop: index > 0 ? (0, _scales.vertical)(15) : 0
      }],
      children: (0, _helpers.checkListEmpty)(item?.lmsSurveyQuestions) && item?.lmsSurveyQuestions.map(renderSurveyItem)
    })]
  });
  const onRefresh = () => {};
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: _SurveyResultDetailStyles.styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
      bounces: false,
      refreshControl: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.RefreshControl, {
        refreshing: isRefreshing,
        onRefresh: onRefresh
      }),
      data: listSurveyResult,
      renderItem: ({
        item,
        index
      }) => itemGroupSurvey(item, index),
      ListEmptyComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {}),
      keyExtractor: (item, index) => index.toString(),
      showsVerticalScrollIndicator: false
    })
  });
};
var _default = exports.default = SurveyResultDetailScreen;
//# sourceMappingURL=SurveyResultDetailScreen.js.map