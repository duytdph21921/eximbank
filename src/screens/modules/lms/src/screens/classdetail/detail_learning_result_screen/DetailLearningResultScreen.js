import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';

const DetailLearningResultScreen = (props) => {
  const { navigation } = props;
  const renderHeaderTitle = () => (
    <CMText
      i18nKey="text-header-result-study-detail"
      style={globalStyles.titleScreen}
    />
  );
  const renderHeaderRight = () => <View />;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, [navigation]);

  return <View />;
};

export default DetailLearningResultScreen;
