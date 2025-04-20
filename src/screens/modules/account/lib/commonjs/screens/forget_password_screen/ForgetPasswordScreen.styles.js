"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _platforms = require("@utils/platforms");
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: (0, _scales.vertical)(20)
  },
  viewImage: {
    alignItems: 'center',
    marginTop: (0, _scales.vertical)(50)
  },
  textInputUser: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    marginVertical: (0, _scales.vertical)(100),
    marginBottom: (0, _scales.vertical)(10),
    marginHorizontal: (0, _scales.horizontal)(20),
    borderColor: _colors.Color.color_uncheck_answer
  },
  btnForgetPass: {
    height: 56,
    width: _platforms.screenWidth - (0, _scales.horizontal)(15) * 2,
    borderRadius: 100,
    marginTop: (0, _scales.vertical)(50),
    marginBottom: (0, _scales.vertical)(20),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textForgetPass: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4
  }
});
//# sourceMappingURL=ForgetPasswordScreen.styles.js.map