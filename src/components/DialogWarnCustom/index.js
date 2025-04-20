import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import TouchableDebounce from '@components/TouchableDebounce';
import { logoutAction, updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import Constant from '@utils/constants';
import IconClose from '@assets/icons/icon_close.svg';
import { userLogout } from '@services/authentication/authenticationusers.api';
import { resetUserAction } from '@store/reducers/authSlice';
import { storage } from '@utils/storage';

const DialogWarnCustom = (props) => {
  const {
    isShowModal,
    titleHeader,
    keyHeader,
    contentMessage,
    keyMessage,
    cancelOnPress,
    submitOnPress,
    keyCancel,
    keySubmit,
    isSigout = false,
    isShowCancel = true,
    isShowSubmit = true,
    isShowCancelDialog = true,
  } = props;

  const appColor = useSelector((state) => state.global.appColor);
  const dispatch = useDispatch();

  /**
   * Handle click button cancel.
   */
  const onHandleOnCancel = () => {
    dispatch(
      updateShowDialogWarnAction({
        isShowModalWarn: false,
      }),
    );
    if (cancelOnPress) cancelOnPress(false);
  };

  /**
   * Handle click button submit.
   */
  const onHandleOnSubmit = async () => {
    if (isSigout) {
      /**
       * Call api logout success.
       */
      const refreshToken = storage.getString(Constant.KEY_REFRESH_TOKEN);
      await userLogout(refreshToken);
      storage.delete(Constant.KEY_USER_TOKEN);
      storage.delete(Constant.KEY_REFRESH_TOKEN);
      const language = storage.getString(Constant.LANGUAGE_APP);
      const jsonAppColor = storage.getString(Constant.APP_COLOR);
      const appColor = JSON.parse(jsonAppColor);
      const isRemember = storage.getBoolean(Constant.REMEMBER_ACCOUNT);
      const params = {
        language,
        isRemember,
        appColor,
      };
      dispatch(logoutAction(params));
      dispatch(resetUserAction(params));
      if (submitOnPress) submitOnPress(true);
    }
    /**
     * On handle submit.
     */
    if (submitOnPress) submitOnPress(true);
    dispatch(
      updateShowDialogWarnAction({
        isShowModalWarn: false,
      }),
    );
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      visible={isShowModal}
      transparent
      animationType="fade"
    >
      <View style={styles.viewModal}>
        <View style={styles.viewContentDialog}>
          <View style={styles.viewHeader}>
            <View style={styles.viewClose}>
              {isShowCancelDialog && (
                <TouchableDebounce onPress={onHandleOnCancel} style={{ padding: 5 }}>
                  <IconClose width={12} height={12} />
                </TouchableDebounce>
              )}
            </View>
            <CMText
              i18nKey={keyHeader ?? 'text-title-dialog-warn'}
              title={titleHeader}
              style={styles.textHeader}
            />
          </View>
          <View style={styles.viewContent}>
            <CMText
              i18nKey={keyMessage}
              title={contentMessage ?? 'Nội dung thông báo!!'}
              style={styles.textContent}
            />
          </View>
          {(isShowCancel || isShowSubmit) && <View style={styles.viewLine} />}
          <View style={styles.viewBottom}>
            {isShowCancel && (
              <TouchableDebounce onPress={onHandleOnCancel} style={styles.viewButtonCancel}>
                <CMText i18nKey={keyCancel ?? 'text-button-cancel'} style={styles.textCancel} />
              </TouchableDebounce>
            )}
            {isShowSubmit && (
              <TouchableDebounce
                onPress={onHandleOnSubmit}
                style={[
                  styles.viewButtonSubmit,
                  {
                    backgroundColor: appColor?.base_color,
                  },
                ]}
              >
                <CMText i18nKey={keySubmit ?? 'text-button-submit'} style={styles.textSubmit} />
              </TouchableDebounce>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewModal: {
    backgroundColor: Color.cl_background_dialog_warn,
    flex: 1,
    justifyContent: 'center',
  },
  viewContentDialog: {
    backgroundColor: Color.white,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
  },
  viewHeader: {
    position: 'relative',
    paddingHorizontal: horizontal(16),
    paddingTop: vertical(16),
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'manrope-regular',
    color: Color.color_header_title,
    lineHeight: 27,
    textAlign: 'center',
  },
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'manrope-regular',
    color: Color.color_header_title,
    lineHeight: 23.8,
    textAlign: 'center',
    marginHorizontal: horizontal(15),
  },
  viewLine: {
    height: 1,
    backgroundColor: Color.color_border,
  },
  viewContent: {
    alignItems: 'center',
    marginHorizontal: horizontal(16),
    marginVertical: vertical(8),
  },
  viewBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  viewButtonCancel: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: Color.text_color,
    borderRadius: 100,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(8),
    margin: 5,
  },
  viewButtonSubmit: {
    width: '48%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(8),
    margin: 5,
    backgroundColor: Color.base_color,
  },
  textCancel: {
    fontWeight: 'bold',
  },
  textSubmit: {
    color: Color.white,
    fontWeight: 'bold',
  },
  viewClose: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default DialogWarnCustom;
