/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import IconFilter from '@assets/icons/icon_filter.svg';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { getBySubjectId } from '@services/lms/lmsclass.api';
import BottomSheetListSubjectClass from '@components/BottomSheetListSubjectClass';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import ItemClass from './ItemClass';

const SubjectListClassTab = (props) => {
  const { subjectData, trainingInfo, navigation, index } = props;
  const dispatch = useDispatch();
  const [listClass, setListClass] = useState([]);
  const [countClass, setCountClass] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [search, setSearch] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isMounteRef = useRef(false);
  const [model, setModel] = useState({
    offset,
    limit,
    keyword: search,
    subjectId: subjectData?.id,
    trainingId: trainingInfo?.id,
    orderBy: 1,
    statusLearn: [],
    statusRelation: [],
    statusClass: [],
  });

  const funcGetBySubjectId = async () => {
    const response = await getBySubjectId(model);
    if (response?.status && isMounteRef.current) {
      setListClass(response?.data);
      setCountClass(response?.metaData?.totalRecord);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (index === 1) {
      dispatch(updateLoadingAction(true));
      funcGetBySubjectId();
      dispatch(updateLoadingAction(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, [index]);

  const onRefresh = () => {
    const newModel = { ...model, offset: 0 };
    setOffset(0);
    setModel(newModel);
    getDataClass(newModel, true);
  };

  const handleLoadMore = () => {
    if (!isLoadMore && !this.onEndReachedCalledDuringMomentum && listClass.length < countClass) {
      setLoadMore(true);
      const newModel = { ...model, offset: offset + limit };
      getDataClass(newModel);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  const getDataClass = async (param, isRefresh = false) => {
    const statusRelation = param?.statusRelation?.filter((item) => item !== 0);
    const statusClass = param?.statusClass?.filter((item) => item !== 0);
    const newParams = {
      ...param,
      statusRelation,
      statusClass,
    };
    const response = await getBySubjectId(newParams);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setListClass(response?.data);
      } else {
        setOffset(offset + 10);
        setListClass([...listClass, ...(response?.data ?? [])]);
      }
      setCountClass(response?.metaData?.totalRecord);
    }
  };

  const onPressFilter = () => {
    setIsOpenModal(true);
  };
  /**
   * Click item lớp học.
   * @param {*} item
   */
  const onHandleItemClick = (item) => {
    navigation.navigate(Constant.SEARCH_CLASS_DETAIL, { classDetail: item });
  };

  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetListSubjectClass
        isOpenModal={isOpenModal}
        handleApplyOnPress={(event) => {
          const newModel = { ...event, keyword: search, offset: 0 };
          setModel(newModel);
          setOffset(0);
          getDataClass(newModel, true);
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        model={model}
        type={2}
        showOrderby
        showRequired
        showStatusClass
      />
    ),
    [isOpenModal],
  );
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
        data={listClass}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={[styles.viewClassFilter]}>
            <View style={styles.viewTextClass}>
              <CMText i18nKey="text-list-class" style={styles.textClass} />
              <CMText
                title={` (${countClass})`}
                style={[styles.textClass, { color: Color.color_text_progress_bar }]}
              />
            </View>
            <TouchableDebounce onPress={onPressFilter}>
              <IconFilter width={24} height={24} />
            </TouchableDebounce>
          </View>
        }
        renderItem={({ item, index }) => (
          <ItemClass
            item={item}
            index={index}
            onHandleItemClick={(item) => onHandleItemClick(item)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<View />}
      />
      <RenderBottomFilter />
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
  viewClassFilter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  viewTextClass: {
    flexDirection: 'row',
  },
  textClass: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25.2,
  },
});
export default SubjectListClassTab;
