import React, { useContext } from 'react';
import TouchableDebounce from '@components/TouchableDebounce';
import { StyleSheet, View, Platform } from 'react-native';
import CMText from '@components/CMText';
import IconNext from '@assets/icons/icon_next.svg';
import { Color } from '@theme/colors';
import { vertical } from '@utils/scales';
import Constant from '@utils/constants';
import { AuthContext } from '@store/context';
import { useDispatch } from 'react-redux';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';

const ItemProfile = (props) => {
  const { item, navigation } = props;
  const { signOut } = useContext(AuthContext);
  const dispatch = useDispatch();
  return (
    <TouchableDebounce
      style={styles.option}
      onPress={() => {
        if (item.name === Constant.LOGOUT) {
          dispatch(
            updateShowDialogWarnAction({
              isShowModalWarn: true,
              isSigout: true,
              titleHeader: '',
              keyHeader: 'text-warning',
              keyMessage: 'text-want-signout',
              contentMessage: '',
            })
          );
        } else {
          navigation.navigate(item.name);
        }
      }}
    >
      <View style={styles.icon}>{item.icon}</View>
      <CMText style={styles.textOption} i18nKey={item.keyName} />
      <IconNext style={{ marginLeft: 'auto' }} />
    </TouchableDebounce>
  );
};
const styles = StyleSheet.create({
  option: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    height: vertical(50),
    width: '100%',
    marginTop: 15,
    borderRadius: 12,
    backgroundColor: Color.white,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(58, 72, 101, 0.14)',
        shadowOpacity: 1,
        elevation: 1,
        shadowRadius: 30,
        shadowOffset: { width: 0, height: 20 },
        backgroundColor: Color.transparents,
      },
      android: {
        elevation: 1,
        backgroundColor: Color.transparents,
      },
    }),
  },
  textOption: {
    fontSize: 14,
    color: Color.cl_text_app,
    marginStart: 10,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Color.base_color,
  },
});
export default ItemProfile;
