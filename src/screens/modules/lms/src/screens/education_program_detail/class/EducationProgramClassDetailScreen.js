/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import IconNote from '@assets/other/icon_note.svg';
import CustomTabView from '@components/CustomTabView';
import globalStyles from '@theme/globalStyles';
import { styles } from '../EducationProgramDetail.styles';
import IntroduceEdu from './IntroduceEdu';
import ListClass from './ListClass';

const EducationProgramClassDetailScreen = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const [activeTab, setActiveTab] = useState(0);

  const renderHeaderTitle = () => (
    <CMText
      title={route?.params?.title}
      style={globalStyles.titleScreen}
      numberOfLines={1}
    />
  );
  const renderHeaderRight = () => (
    <TouchableDebounce style={styles.viewBtnBack} onPress={() => {}}>
      <IconNote width={44} height={44} />
    </TouchableDebounce>
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerRight: renderHeaderRight,
    });
  }, []);

  const renderRoute1 = () => (
    <IntroduceEdu navigation={navigation} params={params} />
  );
  const renderRoute2 = () => (
    <ListClass navigation={navigation} params={params} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomTabView
        style={styles.tabBar}
        onIndexChange={(index) => setActiveTab(index)}
        firstRoute={renderRoute1}
        secondRoute={renderRoute2}
        routes={[
          { key: 'first', title: 'text-introduction-class' },
          { key: 'second', title: 'text-list-class' },
        ]}
      />
    </SafeAreaView>
  );
};

export default EducationProgramClassDetailScreen;
