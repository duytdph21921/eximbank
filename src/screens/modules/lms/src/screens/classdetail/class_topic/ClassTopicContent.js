/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Color } from '@theme/colors';
import { horizontal } from '@utils/scales';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import ClassTopicContentList from './ClassTopicContentList';
import ClassTopicDetail from './ClassTopicDetail';
import { getClassContentTopic } from '../../../services/lmsclasstopic.api';
import TreeViewTopicCustom from '../../../component/TreeViewTopicCustom';

const ClassTopicContent = (props) => {
  const { classInfo, index, activeTab } = props;
  const dispatch = useDispatch();
  const isMounteRef = useRef(false);
  const [listData, setListData] = useState([]);
  const [indexView, setIndexView] = useState(0);
  const [contentInfo, setContentInfo] = useState();
  const [classTopicInfo, setClassTopicInfo] = useState();

  const funcGetClassContentTopic = async () => {
    const response = await getClassContentTopic(classInfo?.id);
    if (response?.status && isMounteRef.current) {
      setListData(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (index === 4 && activeTab === 1) {
      dispatch(updateLoadingAction(true));
      funcGetClassContentTopic();
      dispatch(updateLoadingAction(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const onViewClassContent = (content) => {
    setContentInfo(content);
    setIndexView(1);
  };
  const handleGotoIndex = (index) => {
    setIndexView(index);
    getData();
  };
  const handleGotoDetail = (index, item) => {
    setClassTopicInfo(item);
    setIndexView(index);
  };
  const getData = async () => {
    const response = await getClassContentTopic(classInfo?.id);
    if (response?.status && isMounteRef.current) {
      setListData(response?.data);
    }
  };
  return (
    <View>
      {indexView === 0 && (
        <TreeViewTopicCustom
          data={listData}
          childrenKey="childs"
          onViewClassContent={onViewClassContent}
        />
      )}
      {indexView === 1 && (
        <ClassTopicContentList
          contentInfo={contentInfo}
          classInfo={classInfo}
          handleBack={(index) => {
            handleGotoIndex(index);
          }}
          index={4}
          handleTopicInfo={(index, item) => {
            handleGotoDetail(index, item);
          }}
        />
      )}
      {indexView !== 0 && indexView !== 1 && (
        <View style={styles.container}>
          <ClassTopicDetail
            type={2}
            contentInfo={contentInfo}
            classTopicInfo={classTopicInfo}
            classInfo={classInfo}
            handleBack={(type, index) => {
              handleGotoIndex(index);
            }}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    marginHorizontal: horizontal(20),
    position: 'relative',
  },
});
export default ClassTopicContent;
