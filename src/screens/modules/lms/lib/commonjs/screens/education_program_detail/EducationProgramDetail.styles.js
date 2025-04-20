"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white
  },
  viewBtnBack: {
    right: (0, _scales.horizontal)(15)
  },
  tabBar: {
    backgroundColor: _colors.Color.color_bg_tab_view,
    marginHorizontal: (0, _scales.horizontal)(15),
    marginTop: (0, _scales.vertical)(20)
  }
});
//# sourceMappingURL=EducationProgramDetail.styles.js.map