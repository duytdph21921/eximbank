import React, { useLayoutEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import { styles } from './ExtendScreen.styles';

const HeaderTitle = () => (
  <CMText i18nKey="text-tabar-label-extend" style={globalStyles.titleScreen} />
);

const HeaderRight = () => <View />;

const ExtendScreen = (props) => {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
      headerTitle: HeaderTitle,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <CMText i18nKey="text-comming-soon" />
    </SafeAreaView>
  );
};

export default ExtendScreen;
