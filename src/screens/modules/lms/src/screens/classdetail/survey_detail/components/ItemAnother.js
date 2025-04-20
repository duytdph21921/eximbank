import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { horizontal, vertical } from '@utils/scales';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import IconCheckBox from '@assets/icons/icon_checkbox';
import IconUnCheckBox from '@assets/icons/icon_uncheckbox.svg';
import IconCheckResult from '@assets/icons/icon_check_result.svg';
import { isIOS } from '@utils/platforms';
import Toast from 'react-native-toast-message';

const PLACEHOLDER = {
  en: {
    answer_placeholder: 'Enter another option',
  },
  vn: {
    answer_placeholder: 'Nhập phương án khác',
  },
};

/**
 * Item answer survey contain textinput.
 * @param {*} props
 * @returns
 */
const ItemAnother = (props) => {
  const {
    selected,
    titleContent,
    isDisable,
    onHandleSelect,
    multipe,
    item,
    onHandleUpdateAnswer,
  } = props;
  const languageLocal = useSelector((state) => state.global.language);
  const [answer, setAnswer] = useState(item?.subContentData);
  const getBorderColor = () => {
    if (selected) {
      return isDisable ? Color.color_border_answer : Color.base_color;
    }
    return Color.color_uncheck;
  };
  const getKey18n = () => {
    if (answer === null && item?.subContentData == null) {
      return 'text-save-question';
    }
    if (answer === item?.subContentData) {
      return 'text-saved-question';
    }
    return 'text-save-question';
  };
  return (
    <View style={styles.container}>
      <TouchableDebounce
        activeOpacity={1}
        style={styles.viewTitle}
        disabled={isDisable}
        onPress={onHandleSelect}
      >
        {multipe ? (
          <View style={styles.viewDotsMultipe}>
            {selected &&
              (isDisable ? (
                <IconCheckResult width={24} height={24} />
              ) : (
                <IconCheckBox width={24} height={24} />
              ))}
            {!selected && <IconUnCheckBox width={24} height={24} />}
          </View>
        ) : (
          <View
            style={[
              styles.viewDots,
              {
                borderWidth: selected ? 7 : 1,
                borderColor: getBorderColor(),
              },
            ]}
          />
        )}
        <CMText title={titleContent} style={styles.textContent} />
      </TouchableDebounce>
      <TextInput
        style={styles.textInput}
        maxLength={1000}
        multiline
        placeholder={
          languageLocal === Constant.LANGUAGE_VN
            ? PLACEHOLDER.vn.answer_placeholder
            : PLACEHOLDER.en.answer_placeholder
        }
        onChangeText={(answer) => setAnswer(answer)}
        editable={!isDisable}
        value={
          !isDisable ? answer : item?.lmsSurveyUserQuestionResult?.subAnswer
        }
      />
      {!isDisable && (
        <TouchableDebounce
          style={[
            styles.btnSave,
            {
              backgroundColor: selected
                ? Color.base_color
                : Color.color_uncheck_answer,
            },
          ]}
          onPress={() => {
            if (selected) {
              onHandleUpdateAnswer(answer);
            }
          }}
        >
          <CMText i18nKey={getKey18n()} style={styles.textBtnSave} />
        </TouchableDebounce>
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: vertical(15),
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    borderRadius: 20,
    paddingVertical: vertical(10),
    paddingHorizontal: horizontal(15),
  },
  viewTitle: {
    flexDirection: 'row',
  },
  viewDots: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    backgroundColor: Color.white,
    alignContent: 'center',
  },
  viewDotsMultipe: {
    width: 24,
    height: 24,
  },
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.text_color,
    paddingHorizontal: horizontal(15),
  },
  textInput: {
    height: vertical(80),
    marginTop: isIOS ? vertical(5) : 0,
    paddingLeft: horizontal(15) + 24,
    textAlignVertical: 'top',
    color: Color.text_color,
  },
  btnSave: {
    backgroundColor: Color.base_color,
    padding: 5,
    borderRadius: 10,
    width: 80,
    alignItems: 'center',
  },
  textBtnSave: {
    color: Color.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ItemAnother;
