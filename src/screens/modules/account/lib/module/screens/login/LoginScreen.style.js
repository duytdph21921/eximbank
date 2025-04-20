"use strict";

/* eslint-disable import/no-extraneous-dependencies */
import { StyleSheet } from 'react-native';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: vertical(20)
  },
  viewContainer: {
    marginTop: vertical(150)
  },
  viewInput: {
    marginTop: vertical(20),
    marginBottom: vertical(10),
    marginHorizontal: horizontal(20)
  },
  viewInputPassword: {
    marginTop: vertical(5),
    marginHorizontal: horizontal(20)
  },
  textInputUser: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer
  },
  textInput: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer
  },
  buttonLanguage: {
    marginTop: 50,
    height: 50,
    backgroundColor: Color.base_color,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignContent: 'center'
  },
  textLanguage: {
    color: Color.white,
    fontSize: 15
  },
  viewLanguage: {
    alignSelf: 'flex-end',
    paddingHorizontal: horizontal(10),
    paddingTop: vertical(5)
  },
  btnForgot: {
    alignSelf: 'center'
  },
  iamgeLanguage: {
    width: 30,
    height: 25
  },
  textForgot: {
    marginTop: vertical(10)
  },
  btnLoginGoogle: {
    marginVertical: vertical(15),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vertical(50),
    width: screenWidth - horizontal(15 * 2),
    height: vertical(50),
    borderRadius: 10,
    backgroundColor: Color.base_color
  },
  iconGoogle: {
    width: horizontal(25),
    height: horizontal(25)
  },
  textLoginGoogle: {
    paddingHorizontal: horizontal(5),
    color: Color.white
  },
  viewDonotAccount: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  textSignupNow: {
    textAlign: 'center',
    fontSize: 14,
    color: Color.base_color,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  btnLogin: {
    height: 56,
    width: screenWidth - horizontal(20) * 2,
    borderRadius: 100,
    marginTop: vertical(20),
    marginBottom: vertical(10),
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
//# sourceMappingURL=LoginScreen.style.js.map