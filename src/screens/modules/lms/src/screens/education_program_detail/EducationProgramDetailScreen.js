/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import CustomTabView from '@components/CustomTabView';
import { styles } from './EducationProgramDetail.styles';
import IntroduceEdu from './subject/IntroduceEdu';
import ListSubject from './subject/ListSubject';

const EducationProgramDetailScreen = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const [activeTab, setActiveTab] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route?.params?.title,
      headerRight: () => (
        // <TouchableDebounce style={styles.viewBtnBack} onPress={() => {}}>
        //   <IconNote width={44} height={44} />
        // </TouchableDebounce>
        <View />
      ),
    });
  }, []);
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    };
  }, []);

  const renderRoute1 = () => (
    <IntroduceEdu navigation={navigation} params={params} />
  );
  const renderRoute2 = () => (
    <ListSubject navigation={navigation} params={params} />
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
          { key: 'second', title: 'text-list-subject' },
        ]}
      />
    </SafeAreaView>
  );
};

export default EducationProgramDetailScreen;
