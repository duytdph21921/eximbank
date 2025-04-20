import React from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';
import { screenWidth, isTablet } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import TouchableDebounce from '@components/TouchableDebounce';
import IconEyeOn from '@assets/other/eye_on.svg';
import IconEyeOff from '@assets/other/eye_off.svg';
import IconInfor from '@assets/icons/icon_infor.svg';
import IconSearch from '@assets/other/icon_search_textinput.svg';
import CMText from '@components/CMText';

const CMTextInput = (props) => {
  const {
    placeholder,
    containerStyle,
    textInputStyle,
    onSubmitEditing,
    onSubmitSearch,
    maxLength,
    secureTextEntry,
    inputRef,
    isPassWord,
    isInfor,
    isSearch,
    onShowPassword,
    keyboardType,
    onChangeText,
    onBlur,
    textKeyTitle,
    isInputRequied,
    multiline,
    isValid = true,
    errorKey,
    textAlignVertical,
  } = props;

  const handleChangeText = (text) => onChangeText && onChangeText(text);
  const handleBlur = (text) => onBlur && onBlur(text);
  return (
    <View style={[styles.container, containerStyle]}>
      {textKeyTitle && (
        <View style={styles.viewTitleInput}>
          <CMText style={styles.titleViewInput} i18nKey={textKeyTitle} />
          {isInputRequied && <CMText style={styles.textValid} title="*" />}
        </View>
      )}
      <TextInput
        {...props}
        ref={inputRef}
        style={[
          globalStyles.textInput,
          styles.input,
          { height: multiline ? 180 : isTablet ? 65 : 56 },
          { borderColor: isValid ? Color.cl_border_text_input : Color.cl_text_requied },
          textInputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={Color.cl_text_place_holder}
        maxLength={maxLength}
        keyboardType={keyboardType}
        textAlignVertical={textAlignVertical}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        onSubmitEditing={() => {
          Keyboard.dismiss();
          if (onSubmitEditing) {
            onSubmitEditing();
          }
        }}
      />
      {!isValid && errorKey && <CMText style={styles.textRequied} i18nKey={errorKey} />}
      {isPassWord && (
        <TouchableDebounce onPress={onShowPassword} style={styles.iconWrapper}>
          {secureTextEntry ? (
            <IconEyeOff width={20} height={20} />
          ) : (
            <IconEyeOn width={20} height={20} />
          )}
        </TouchableDebounce>
      )}
      {isSearch && (
        <TouchableDebounce onPress={onSubmitSearch} style={styles.iconWrapper}>
          <IconSearch width={20} height={20} />
        </TouchableDebounce>
      )}
      {isInfor && (
        <TouchableDebounce onPress={() => {}} style={styles.iconWrapper}>
          <IconInfor width={20} height={20} />
        </TouchableDebounce>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    position: 'relative',
  },
  viewTitleInput: {
    flexDirection: 'row',
    width: screenWidth - horizontal(15) * 2,
    alignSelf: 'center',
    marginTop: vertical(5),
  },
  titleViewInput: {
    fontSize: 16,
    lineHeight: 17,
    color: Color.text_color,
    fontWeight: 'bold',
  },
  textValid: {
    fontSize: 16,
    color: Color.cl_requied_input,
    fontWeight: 'bold',
    marginHorizontal: 3,
  },
  textRequied: {
    fontSize: 12,
    color: Color.cl_requied_input,
    width: screenWidth - horizontal(15) * 2,
    alignSelf: 'center',
  },
  input: {
    // flex: 1,
    fontSize: 16,
    color: Color.black,
    // alignSelf: 'center',
    paddingHorizontal: horizontal(10),
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Color.white,
  },
  iconWrapper: {
    position: 'absolute',
    right: horizontal(20),
    width: 20,
    height: 20,
    top: '50%',
  },
});

export default CMTextInput;
