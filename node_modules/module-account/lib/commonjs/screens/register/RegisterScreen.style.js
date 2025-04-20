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
  imageBackground: {
    position: 'absolute',
    width: _platforms.screenWidth,
    height: _platforms.screenHeight
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: (0, _scales.vertical)(20)
  },
  viewContainer: {
    marginTop: (0, _scales.vertical)(150)
  },
  textInputUser: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    marginTop: (0, _scales.vertical)(20),
    fontSize: 14,
    fontWeight: '400',
    color: _colors.Color.text_color
  },
  textInput: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    marginTop: (0, _scales.vertical)(10),
    fontSize: 14,
    fontWeight: '400',
    color: _colors.Color.text_color,
    marginHorizontal: (0, _scales.horizontal)(15)
  },
  buttonLanguage: {
    marginTop: 50,
    height: 50,
    backgroundColor: _colors.Color.base_color,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignContent: 'center'
  },
  textLanguage: {
    color: _colors.Color.white,
    fontSize: 15
  },
  viewLanguage: {
    alignSelf: 'flex-end',
    paddingHorizontal: (0, _scales.horizontal)(10),
    paddingTop: (0, _scales.vertical)(5)
  },
  btnForgot: {
    alignSelf: 'center'
  },
  iamgeLanguage: {
    width: 30,
    height: 25
  },
  textForgot: {
    marginTop: (0, _scales.vertical)(10)
  },
  btnLoginGoogle: {
    marginVertical: (0, _scales.vertical)(15),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (0, _scales.vertical)(50),
    width: _platforms.screenWidth - (0, _scales.horizontal)(15 * 2),
    height: (0, _scales.vertical)(50),
    borderRadius: 10,
    backgroundColor: _colors.Color.base_color
  },
  iconGoogle: {
    width: (0, _scales.horizontal)(25),
    height: (0, _scales.horizontal)(25)
  },
  textLoginGoogle: {
    paddingHorizontal: (0, _scales.horizontal)(5),
    color: _colors.Color.white
  },
  viewDonotAccount: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  textSignupNow: {
    textAlign: 'center',
    fontSize: 14,
    color: _colors.Color.base_color,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  btnLogin: {
    height: 56,
    width: _platforms.screenWidth - (0, _scales.horizontal)(15) * 2,
    borderRadius: 100,
    marginTop: (0, _scales.vertical)(40),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBtnLogin: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4
  }
});
//# sourceMappingURL=RegisterScreen.style.js.map