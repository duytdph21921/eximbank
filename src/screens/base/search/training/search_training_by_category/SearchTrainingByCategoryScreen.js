/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import BackHeader from '@components/BackHeader';
import BottomSheetFilterTrainingSearch from '@/screens/base/components/BottomSheetFilterTrainingSearch';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { searchTraining } from '@services/lms/lmstraining.api';
import { getTrainingCategoryById } from '@services/lms/lmstrainingcategorytree.api';
import { LmsTrainingSearch } from '@base/model/lmstraining.model';
import ViewTrainingEmpty from '@base/search/training/components/ViewTrainingEmpty';
import HeaderSearchTrainingByCategoryComponent from './components/HeaderSearchTrainingByCategoryComponent';
import RenderItemTraining from './components/RenderItemTraining';

const SearchTrainingByCategoryScreen = (props) => {
  const { navigation, route } = props;
  const { trainingCategory } = route?.params ?? {};
  const dispatch = useDispatch();
  const [listTraining, setListTraining] = useState([]);
  const [listTrainingCategory, setListTrainingCategory] = useState([]);
  const [countTraining, setCountTrainign] = useState(0);
  const [category, setCategory] = useState(trainingCategory);
  const [categoryListRoute, setCategoryListRoute] = useState([trainingCategory]);
  const [isLoadMore, setLoadMore] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const isMounteRef = useRef(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [search, setSearch] = useState('');
  const [model, setModel] = useState(
    new LmsTrainingSearch(offset, limit, search, [], [], category?.id),
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const onBack = () => {
    if (categoryListRoute) {
      const indexScreenCurrent = categoryListRoute.indexOf(category);
      if (indexScreenCurrent > 0) {
        const categoryPrev = categoryListRoute[indexScreenCurrent - 1];
        if (categoryPrev) {
          setCategory(categoryPrev);
          const newModel = {
            ...model,
            trainingCategoryTreeId: categoryPrev?.id,
            offset: 0,
          };
          setOffset(0);
          setModel(newModel);
          getTrainingCategory(categoryPrev);
          getData(newModel, true);
        } else {
          navigation.goBack();
        }
      } else {
        navigation.goBack();
      }
    } else {
      navigation.goBack();
    }
  };
  if (!category) {
    onBack();
  }

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText title={category?.title} style={globalStyles.titleScreen} numberOfLines={2} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, [category]);

  const funcSearchTraining = async () => {
    const response = await searchTraining(model);
    if (response?.status && isMounteRef.current) {
      setListTraining(response?.data);
      setCountTrainign(response?.metaData?.totalRecord);
    }
  };
  const funcGetTrainingCategoryById = async () => {
    const response = await getTrainingCategoryById(trainingCategory?.id);
    if (response?.status && isMounteRef.current) {
      setListTrainingCategory(response?.data?.childs);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcSearchTraining();
    funcGetTrainingCategoryById();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const getTrainingCategory = async (category) => {
    const response = await getTrainingCategoryById(category?.id);
    if (response?.status && isMounteRef.current) {
      setListTrainingCategory(response?.data?.childs);
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
      const newModel = { ...model, offset: offset + limit };
      getData(newModel);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  const onRefresh = () => {
    const newModel = { ...model, offset: 0 };
    setOffset(0);
    setModel(newModel);
    getData(newModel, true);
  };

  const getData = async (param, isRefresh = false) => {
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
      setCountTrainign(response?.metaData?.totalRecord);
    }
  };

  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetFilterTrainingSearch
        isOpenModal={isOpenModal}
        handleApplyOnPress={(event) => {
          const newModel = { ...event, keyword: search, offset: 0 };
          setOffset(0);
          setModel(newModel);
          getData(newModel, true);
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        model={model}
        typeMode={2}
      />
    ),
    [isOpenModal],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        onEndReached={() => {
          handleLoadMore();
        }}
        keyExtractor={(item, index) => index.toString()}
        data={listTraining}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <HeaderSearchTrainingByCategoryComponent
            navigation={navigation}
            listTrainingCategory={listTrainingCategory}
            countTraining={countTraining}
            onPressFilter={() => {
              setIsOpenModal(true);
            }}
            onHandleChangeCategory={(category) => {
              let listCategoryRoute = categoryListRoute;
              if (!listCategoryRoute) {
                listCategoryRoute = [];
              }
              listCategoryRoute.push(category);
              setCategoryListRoute(listCategoryRoute);
              setCategory(category);
              const newModel = {
                ...model,
                trainingCategoryTreeId: category?.id,
                offset: 0,
              };
              setOffset(0);
              setModel(newModel);
              getTrainingCategory(category);
              getData(newModel, true);
            }}
            onSearch={(keyword) => {
              const newModel = {
                ...model,
                keyword,
                offset: 0,
              };
              setOffset(0);
              setSearch(keyword);
              getData(newModel, true);
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
  );
};

const WIDTH_ITEM = (screenWidth - horizontal(24 * 2) - horizontal(20)) / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  contentContainerStyle: {
    backgroundColor: Color.white,
  },
  viewItemClass: {
    width: WIDTH_ITEM,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: vertical(15),
    marginRight: horizontal(20),
  },
});
export default SearchTrainingByCategoryScreen;
