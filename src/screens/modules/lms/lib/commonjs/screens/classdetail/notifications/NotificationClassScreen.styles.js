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
  btnFilterHeader: {
    marginHorizontal: (0, _scales.horizontal)(15)
  },
  viewItemNoti: {
    flexDirection: 'row',
    height: (0, _scales.horizontal)(80),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  viewTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: _platforms.screenWidth - 2 * (0, _scales.horizontal)(15) - 40 - (0, _scales.horizontal)(10)
  },
  viewTitleDetail: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: _platforms.screenWidth - 2 * (0, _scales.horizontal)(15) - 40 - (0, _scales.horizontal)(10),
    marginTop: 10
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '700',
    width: _platforms.screenWidth - 2 * (0, _scales.horizontal)(15) - 40 - (0, _scales.horizontal)(50)
  },
  textDetail: {
    fontSize: 12,
    fontWeight: '400',
    width: _platforms.screenWidth - 2 * (0, _scales.horizontal)(15) - 40 - (0, _scales.horizontal)(50),
    color: _colors.Color.text_color_hover
  },
  textTime: {
    fontSize: 12,
    fontWeight: '400'
  },
  viewContent: {
    backgroundColor: _colors.Color.white,
    padding: 20,
    shadowColor: _colors.Color.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 1,
    borderRadius: 15
  }
});
//# sourceMappingURL=NotificationClassScreen.styles.js.map