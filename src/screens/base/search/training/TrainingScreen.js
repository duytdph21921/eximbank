/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, RefreshControl, SafeAreaView } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import BottomSheetFilterTrainingSearch from '@/screens/base/components/BottomSheetFilterTrainingSearch';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { searchTraining } from '@services/lms/lmstraining.api';
import { getTrainingCategoryOnSearchScreen } from '@services/lms/lmstrainingcategorytree.api';
import { LmsTrainingSearch } from '@base/model/lmstraining.model';
import { styles } from './TrainingScreen.styles';
import HeaderSearchTrainingComponent from './components/HeaderSearchTrainingComponent';
import RenderItemTraining from './components/RenderItemTraining';
import ViewTrainingEmpty from './components/ViewTrainingEmpty';

const TrainingScreen = (props) => {
  const { navigation, index } = props;
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listTraining, setListTraining] = useState([]);
  const [countTraining, setCountTraining] = useState(0);
  const [listTrainingCategory, setListTrainingCategory] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [model, setModel] = useState(
    new LmsTrainingSearch(0, 20, search, [], [], '00000000-0000-0000-0000-000000000000'),
  );
  const [modelCategory, setModelCategory] = useState({
    offset: 0,
    limit: 9999,
    keyword: '',
  });
  const [isLoadMore, setLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const isMounteRef = useRef(false);

  /**
   * Get all data training.
   */
  const funcSearchTraining = async () => {
    const response = await searchTraining(model);
    if (response?.status && isMounteRef.current) {
      setListTraining(response?.data);
      setCountTraining(response?.metaData?.totalRecord);
    }
  };
  const funcGetTrainingCategoryOnSearchScreen = async () => {
    const response = await getTrainingCategoryOnSearchScreen(modelCategory);
    if (response?.status && isMounteRef.current) {
      setListTrainingCategory(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (index === 1) {
      dispatch(updateLoadingAction(true));
      funcSearchTraining();
      funcGetTrainingCategoryOnSearchScreen();
      dispatch(updateLoadingAction(false));
    }

    return () => {
      isMounteRef.current = false;
    };
  }, [index]);

  /**
   *
   */
  const getAllDataTraining = async (param, isRefresh = false) => {
    const statusTraining = param?.statusTraining?.filter((item) => item !== 0);
    const dataRange = param?.dataRange?.filter((item) => item !== 0);
    const newParams = {
      ...param,
      statusTraining,
      dataRange,
    };
    const response = await searchTraining(newParams);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setListTraining(response?.data);
      } else {
        setOffset(offset + 10);
        setListTraining([...listTraining, ...(response?.data ?? [])]);
      }
      setCountTraining(response?.metaData?.totalRecord);
    }
  };

  /**
   * Load more.
   */
  const handleLoadMore = () => {
    if (
      !isLoadMore &&
      !this.onEndReachedCalledDuringMomentum &&
      listTraining.length < countTraining
    ) {
      setLoadMore(true);
      const newParams = { ...model, offset: offset + 10 };
      getAllDataTraining(newParams);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
  /**
   * Load danh sách mới.
   */
  const onRefresh = () => {
    const newParams = { ...model, offset: 0 };
    setModel(newParams);
    setOffset(0);
    getAllDataTraining(newParams, true);
  };

  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetFilterTrainingSearch
        isOpenModal={isOpenModal}
        handleApplyOnPress={(event) => {
          const newModel = { ...event, keyword: search, offset: 0 };
          setModel(newModel);
          setOffset(0);
          getAllDataTraining(newModel, true);
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        model={model}
        typeMode={1}
      />
    ),
    [isOpenModal],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={isIOS && hasNotch() ? 0 : 10}
      behavior={isIOS ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
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
          data={listTraining}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <HeaderSearchTrainingComponent
              navigation={navigation}
              listTrainingCategory={listTrainingCategory}
              countTraining={countTraining}
              onPressFilter={() => {
                setIsOpenModal(true);
              }}
              onSearch={(keyword) => {
                const newModel = { ...model, keyword, offset: 0 };
                setModel(newModel);
                setSearch(keyword);
                setOffset(0);
                getAllDataTraining(newModel, true);
              }}
            />
          }
          renderItem={({ item, index }) => (
            <RenderItemTraining
              item={item}
              index={index}
              goToTrainingDetail={(item) => {
                navigation.navigate(Constant.SEARCH_TRAINING_DETAIL_SCREEN, {
                  trainingDetail: item,
                });
              }}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={<ViewTrainingEmpty onPressExplore={() => {}} />}
        />
        <RenderBottomFilter />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TrainingScreen;
