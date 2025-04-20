/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import IconClock from '@assets/other/clock.svg';
import BackHeader from '@components/BackHeader';
import BottomSheetFilterExam from '@/screens/base/components/BottomSheetFilterExam';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { searchRegistor } from '@services/test/testregistor.api';
import { getRegistorCategoryById } from '@services/test/testregistorcategory.api';
import { styles } from '../ExamSearch.style';
import HeaderSearchExamByCategoryComponent from '../exam_category/components/HeaderSearchExamByCategoryComponent';

const RenderContentItem = ({ item, index, gotoContentDetail }) => (
  <TouchableDebounce
    style={styles.viewItemContent}
    onPress={() => gotoContentDetail(item)}
    key={index}
  >
    <View style={styles.boxItem}>
      <View style={styles.boxImg}>
        <CustomImage style={styles.imageItemContent} source={item?.avatar} resizeMode="stretch" />
      </View>
      <View style={styles.boxInfo}>
        <CMText style={styles.textTitleMyContent} numberOfLines={2} title={item?.title} />
        <View style={styles.viewDateItem}>
          <IconClock width={16} height={16} />
          <CMText i18nKey="get-start" style={styles.textDateMyClass}>
            <CMText title={`: ${item?.startDate}`} style={styles.textDateMyClass} />
          </CMText>
        </View>
        <View style={styles.viewDateItem}>
          <IconClock width={16} height={16} />
          <CMText i18nKey="get-end" style={styles.textDateMyClass}>
            <CMText title={`: ${item?.endDate}`} style={styles.textDateMyClass} />
          </CMText>
        </View>
      </View>
    </View>
  </TouchableDebounce>
);
const SearchExamByCategoryScreen = (props) => {
  const { navigation, route } = props;
  const { contentCategory } = route?.params ?? {};
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listContent, setListContent] = useState([]);
  const [countContent, setCountContent] = useState(0);
  const [listContentCategory, setListContentCategory] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [limit] = useState(20);
  const [category, setCategory] = useState(contentCategory);
  const [categoryListRoute, setCategoryListRoute] = useState([contentCategory]);
  const isMounteRef = useRef(false);
  const dispatch = useDispatch();
  const [model, setModel] = useState({
    offset,
    limit,
    keyword: search,
    statusTime: 1,
    categoryId: contentCategory?.id,
    dataRange: [],
    statusRegistor: [],
    statusRelation: [],
  });

  const gotoContentDetail = (item) => {
    navigation.navigate(Constant.SEARCH_EXAM_DETAIL, {
      contentDetail: item,
    });
  };
  /**
   * Load more.
   */
  const handleLoadMore = () => {
    if (
      !isLoadMore &&
      !this.onEndReachedCalledDuringMomentum &&
      listContent.length < countContent
    ) {
      setLoadMore(true);
      const newModel = { ...model, offset: offset + limit };
      getData(newModel);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
  const onRefresh = () => {
    setOffset(0);
    const newModel = { ...model, offset: 0 };
    setModel(newModel);
    getData(newModel, true);
  };
  const getData = async (param, isRefresh = false) => {
    const statusRegistor = param?.statusRegistor?.filter((item) => item !== 0);
    const statusRelation = param?.statusRelation?.filter((item) => item !== 0);
    const newParams = {
      ...param,
      statusRegistor,
      statusRelation,
    };
    const response = await searchRegistor(newParams);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setListContent(response?.data);
      } else {
        setOffset(offset + 10);
        setListContent([...listContent, ...(response?.data ?? [])]);
      }
      setCountContent(response?.metaData?.totalRecord);
    }
  };

  const funcSearchRegistor = async () => {
    const response = await searchRegistor(model);
    if (response?.status && isMounteRef.current) {
      setListContent(response?.data);
      setCountContent(response?.metaData?.totalRecord);
    }
  };
  const funcGetRegistorCategoryById = async () => {
    const response = await getRegistorCategoryById(contentCategory?.id);
    if (response?.status && isMounteRef.current) {
      setListContentCategory(response?.data?.childs);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcSearchRegistor();
    funcGetRegistorCategoryById();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const getClassCategory = async (category) => {
    isMounteRef.current = true;
    const response = await getRegistorCategoryById(category?.id);
    if (response?.status && isMounteRef.current) {
      setListContentCategory(response?.data?.childs);
    }
  };

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
  const onBack = () => {
    if (categoryListRoute) {
      const indexScreenCurrent = categoryListRoute.indexOf(category);
      if (indexScreenCurrent > 0) {
        const categoryPrev = categoryListRoute[indexScreenCurrent - 1];
        if (categoryPrev) {
          setCategory(categoryPrev);
          const newModel = { ...model, categoryId: categoryPrev?.id };
          setModel(newModel);
          getClassCategory(categoryPrev);
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

  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetFilterExam
        isOpenModal={isOpenModal}
        handleApplyOnPress={(event) => {
          const newModel = { ...event, keyword: search, offset: 0 };
          setModel(newModel);
          getData(newModel, true);
          setOffset(0);
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        model={model}
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
          data={listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <HeaderSearchExamByCategoryComponent
              navigation={navigation}
              listContentCategory={listContentCategory}
              countContent={countContent}
              onPressFilter={() => {
                setIsOpenModal(true);
              }}
              onSearch={(keyword) => {
                const newModel = {
                  ...model,
                  keyword: keyword.trim(),
                  offset: 0,
                };
                setSearch(keyword.trim());
                setModel(newModel);
                getData(newModel, true);
                setOffset(0);
              }}
              onHandleChangeCategory={(category) => {
                let listCategoryRoute = categoryListRoute;
                if (!listCategoryRoute) {
                  listCategoryRoute = [];
                }
                listCategoryRoute.push(category);
                setCategoryListRoute(listCategoryRoute);
                setCategory(category);
                const newModel = { ...model, categoryId: category?.id };
                setModel(newModel);
                getClassCategory(category);
                getData(newModel, true);
              }}
            />
          }
          renderItem={({ item, index }) => (
            <RenderContentItem item={item} index={index} gotoContentDetail={gotoContentDetail} />
          )}
          numColumns={1}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={<View />}
        />
        <RenderBottomFilter />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SearchExamByCategoryScreen;
