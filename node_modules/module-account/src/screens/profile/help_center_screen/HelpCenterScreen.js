import React, { useLayoutEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import IconArrowRight from '@assets/icons/arrow-right.svg';
import IconMail from '@assets/icons/icon_mail.svg';
import IconPhone from '@assets/icons/icon_phone.svg';
import IconSupport from '@assets/icons/support.svg';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import CMTextInput from '@components/CMTextInput';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { styles } from './HelpCenterScreen.styles';
import HelpHeader from './conponents/HelpHeader';

const PLACEHOLDER = {
  en: {
    userplaceholder: 'What do you want to help with?',
  },
  vn: {
    userplaceholder: 'Bạn muốn trợ giúp điều gì',
  },
};

const listItem = [
  {
    id: 1,
    icon: <IconSupport width={44} height={44} />,
    isNext: true,
    title: 'text-frequently-asked-questions',
  },
  {
    id: 2,
    icon: <IconMail width={44} height={44} />,
    isNext: false,
    title: 'text-mail',
  },
  {
    id: 3,
    icon: <IconPhone width={44} height={44} />,
    isNext: false,
    title: 'text-phone',
  },
];

const HelpCenterScreen = (props) => {
  const { navigation, route } = props;
  const languageLocal = useSelector((state) => state.global.language);

  const renderHeaderLeft = () => (
    <BackHeader
      handleGoBack={() => {
        navigation.goBack();
      }}
    />
  );

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText i18nKey="text-support-center" style={globalStyles.titleScreen} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HelpHeader />
      <View style={styles.viewContent}>
        <CMText i18nKey="text-title-help-center" style={styles.textTitle} />
        <CMText i18nKey="text-content-help-center" style={styles.textContent} />
      </View>
      <CMTextInput
        placeholder={
          languageLocal === Constant.LANGUAGE_VN
            ? PLACEHOLDER.vn.userplaceholder
            : PLACEHOLDER.en.userplaceholder
        }
        returnKeyType="next"
        blurOnSubmit={false}
        value=""
        onChangeText={() => {}}
        isSearch
        textInputStyle={styles.textInput}
        maxLength={200}
      />
      <View style={styles.viewLine} />
      {listItem.map((item, index) => (
        <TouchableDebounce
          key={item?.id}
          style={styles.boxMenuItem}
          onPress={() => {
            if (item?.id === 1) {
              navigation.navigate(Constant.FREQUENTLY_QUESTION_SCREEN);
            }
          }}
        >
          {item?.icon}
          <CMText style={styles.textMenu} i18nKey={item.title} />
          {item?.isNext && (
            <IconArrowRight style={styles.arrowRight} width={18} height={18} />
          )}
        </TouchableDebounce>
      ))}
    </SafeAreaView>
  );
};

export default React.memo(HelpCenterScreen);
