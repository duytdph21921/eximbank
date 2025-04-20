"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _TreeViewCustom = _interopRequireDefault(require("@components/TreeViewCustom"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TabDetailResult = props => {
  const {
    dataDetailResult,
    navigation,
    classInfo
  } = props;

  /**
   * On handle click item detail.
   * @param {*} content
   */
  const onViewClassContent = content => {
    navigation.navigate(_constants.default.DETAIL_LEARNING_RESULT_SCREEN, {
      classId: classInfo?.id,
      classContentId: content?.id,
      isLoadNew: true
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TreeViewCustom.default, {
    data: dataDetailResult,
    childrenKey: "childs",
    onViewClassContent: onViewClassContent
  });
};
var _default = exports.default = TabDetailResult;
//# sourceMappingURL=TabDetailResult.js.map