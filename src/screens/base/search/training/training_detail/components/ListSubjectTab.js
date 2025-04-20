/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import { useDispatch } from 'react-redux';
import { getByTrainingId } from '@services/lms/lmssubject.api';
import Constant from '@utils/constants';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import ItemSubject from './ItemSubject';

const ListSubjectTab = (props) => {
  const dispatch = useDispatch();
  const { trainingInfo, index, navigation } = props;
  const [listSubject, setListSubject] = useState([]);
  const isMounteRef = useRef(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [countSubject, setCountSubject] = useState(0);

  const funcGetByTrainingId = async (params) => {
    const response = await getByTrainingId(params);
    setOffset(offset + limit);
    if (response?.status && isMounteRef.current) {
      setListSubject(response?.data);
      setCountSubject(response?.metaData?.totalRecord);
    } else {
      setOffset(offset - limit);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (index === 1) {
      const params = {
        offset,
        limit,
        keyword: '',
        trainingId: trainingInfo?.id,
      };
      dispatch(updateLoadingAction(true));
      funcGetByTrainingId(params);
      dispatch(updateLoadingAction(false));
    }

    return () => {
      isMounteRef.current = false;
    };
  }, [index]);

  const onRefresh = () => {
    const params = {
      offset: 0,
      limit,
      keyword: '',
      trainingId: trainingInfo?.id,
    };
    setRefreshing(true);
    setOffset(0);
    funcGetByTrainingId(params);
  };

  const handleLoadMore = () => {
    if (
      !isLoadMore &&
      !this.onEndReachedCalledDuringMomentum &&
      listSubject.length < countSubject
    ) {
      setLoadMore(true);
      getDataSubject();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  const getDataSubject = () => {
    setLoadMore(false);
    const params = {
      offset,
      limit,
      keyword: '',
      trainingId: trainingInfo?.id,
    };
    funcGetByTrainingId(params);
  };
  const onHandleItemClick = (item) => {
    navigation.navigate(Constant.SEARCH_TRAINING_DETAIL_SUBJECT_SCREEN, {
      itemSubject: item,
      trainingInfo,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        onEndReached={() => {
          handleLoadMore();
        }}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
        }}
        onEndReachedThreshold={0.01}
        keyExtractor={(item, index) => index.toString()}
        data={listSubject}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.viewTextClass}>
            <CMText i18nKey="text-list-subject" style={styles.textClass} />
            <CMText
              title={` (${countSubject})`}
              style={[styles.textClass, { color: Color.color_text_progress_bar }]}
            />
          </View>
        }
        renderItem={({ item, index }) => (
          <ItemSubject
            item={item}
            index={index}
            onHandleItemClick={(item) => onHandleItemClick(item)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<View />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    backgroundColor: Color.white,
  },
  viewTextClass: {
    flexDirection: 'row',
    paddingHorizontal: horizontal(20),
    paddingBottom: vertical(20),
  },
  textClass: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25.2,
  },
});
export default ListSubjectTab;
