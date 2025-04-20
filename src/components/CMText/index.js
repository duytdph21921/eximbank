/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useComponentWillMount } from '@hooks/useComponentWillMount';
import I18n from '@translations/i18n';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts/index';

// CMText.propTypes = {
//   i18nKey: PropTypes.string.isRequired,
//   title: PropTypes.string,
//   style: Text.propTypes.style,
// };

// CMText.defaultProps = {
//   i18nKey: '',
//   title: '',
//   style: {},
// };

const CMText = (props) => {
  const [i18n, setI18n] = useState(I18n);
  const language = useSelector((state) => state.global.language);

  useComponentWillMount(() => {
    setMainLocaleLanguage(language);
  });

  function setMainLocaleLanguage(language) {
    i18n.locale = language;
    setI18n(i18n);
  }

  useEffect(() => {
    setMainLocaleLanguage(language);
  }, [language]);

  return (
    <Text {...props} style={[styles.text, props.style]} numberOfLines={props.numberOfLines}>
      {props.i18nKey
        ? i18n.t(props.i18nKey).includes('missing')
          ? (props.title ?? '')
          : i18n.t(props.i18nKey)
        : (props.title ?? '')}
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Color.text_color,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: fonts.regular,
  },
});
export default CMText;
