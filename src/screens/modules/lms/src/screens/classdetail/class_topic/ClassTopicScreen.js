import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Color } from '@theme/colors';
import { vertical } from '@utils/scales';
import CustomTabView from '@components/CustomTabView';
import ClassTopicDetail from './ClassTopicDetail';
import ClassTopicGeneral from './ClassTopicGeneral';
import ClassTopicContent from './ClassTopicContent';

const ClassTopicScreen = (props) => {
  const { classInfo, index } = props;
  const [activeTab, setActiveTab] = useState(0);
  const isLoadMain = true;
  const renderRoute1 = () => (
    <ClassTopicGeneral
      classInfo={classInfo}
      index={index}
      activeTab={activeTab}
    />
  );
  const renderRoute2 = () => (
    <ClassTopicContent
      classInfo={classInfo}
      index={index}
      activeTab={activeTab}
    />
  );
  return (
    <View style={styles.container}>
      {isLoadMain ? (
        <CustomTabView
          style={styles.tabBar}
          activeTab={activeTab}
          onIndexChange={(index) => setActiveTab(index)}
          firstRoute={renderRoute1}
          secondRoute={renderRoute2}
          routes={[
            { key: 'first', title: 'text-class-topic-general' },
            { key: 'second', title: 'text-class-topic-content' },
          ]}
        />
      ) : (
        <ClassTopicDetail />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingBottom: 25,
  },
  tabBar: {
    backgroundColor: Color.white,
    marginTop: vertical(10),
  },
});
export default ClassTopicScreen;
