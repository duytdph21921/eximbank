import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import { screenHeight, screenWidth } from '@utils/platforms';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: vertical(20),
  },
  viewImage: {
    alignItems: 'center',
    marginTop: vertical(50),
  },
  textInputUser: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    marginVertical: vertical(100),
    marginBottom: vertical(10),
    marginHorizontal: horizontal(20),
    borderColor: Color.color_uncheck_answer,
  },
  btnForgetPass: {
    height: 56,
    width: screenWidth - horizontal(15) * 2,
    borderRadius: 100,
    marginTop: vertical(50),
    marginBottom: vertical(20),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textForgetPass: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
  },
});
