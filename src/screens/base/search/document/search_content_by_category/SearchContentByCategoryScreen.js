/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { useDispatch, useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import EyeIcon from '@assets/other/eye_on.svg';
import LikeIcon from '@assets/other/like_icon.svg';
import BackHeader from '@components/BackHeader';
import BottomSheetFilterContentSearch from '@/screens/base/components/BottomSheetFilterContentSearch';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { changeColor } from '@utils/helpers';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { searchContent } from '@services/lms/lmscontent.api';
import { getContentCategoryById } from '@services/lms/lmscontentcategory.api';
import { Color } from '@theme/colors';
import { styles } from '../DocumentSearch.style';
import HeaderSearchDocumentByCategoryComponent from '../document_category/components/HeaderSearchDocumentByCategoryComponent';

const RenderContentItem = ({ item, index, gotoContentDetail }) => (
  <TouchableDebounce
    style={styles.viewItemContent}
    onPress={() => gotoContentDetail(item)}
    key={index}
  >
    <View style={styles.boxItem}>
      <View style={styles.boxInfo}>
        <CMText style={styles.textTitleMyContent} title={item?.title} />
        <View
          style={[
            styles.contentTypeName,
            {
              backgroundColor: changeColor(Color.base_color),
            },
          ]}
        >
          <CMText
            style={[
              styles.textContentTypeName,
              {
                color: Color.base_color,
              },
            ]}
            title={item?.typeName}
          />
        </View>
      </View>
      <View style={styles.boxImg}>
        <CustomImage style={styles.imageItemContent} source={item?.avatar} />
        <View style={styles.boxLikeView}>
          <View style={styles.boxLikeView}>
            <EyeIcon width={16} height={26} />
            <CMText style={styles.textLikeView} title={`${item?.numView ?? 0}`} />
          </View>
          <View style={styles.boxLikeView}>
            <LikeIcon width={16} height={26} />
            <CMText style={styles.textLikeView} title={`${item?.numLike ?? 0}`} />
          </View>
        </View>
      </View>
    </View>
  </TouchableDebounce>
);

const SearchContentByCategoryScreen = (props) => {
  const { navigation, route } = props;
  const { contentCategory } = route?.params ?? {};
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listContent, setListContent] = useState([]);
  const [countContent, setCountContent] = useState(0);
  const [listContentCategory, setListContentCategory] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(contentCategory);
  const [categoryListRoute, setCategoryListRoute] = useState([contentCategory]);
  const isMounteRef = useRef(false);
  const dispatch = useDispatch();
  const [model, setModel] = useState({
    offset,
    limit,
    keyword: search,
    statusTime: 1,
    contentCategoryId: contentCategory?.id,
    dataRange: [],
  });

  const gotoContentDetail = (item) => {
    navigation.navigate(Constant.SEARCH_CONTENT_DETAIL, {
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
    const newModel = { ...model, offset: 0, keywork: search };
    setModel(newModel);
    getData(newModel, true);
  };
  const getData = async (param, isRefresh = false) => {
    const dataRange = param?.dataRange?.filter((item) => item !== 0);
    const newParams = {
      ...param,
      dataRange,
    };
    const response = await searchContent(newParams);
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
  const funcSearchContent = async () => {
    const response = await searchContent(model);
    if (response?.status && isMounteRef.current) {
      setListContent(response?.data);
      setCountContent(response?.metaData?.totalRecord);
    }
  };
  const funcGetContentCategoryById = async () => {
    const response = await getContentCategoryById(contentCategory?.id);
    if (response?.status) {
      setListContentCategory(response?.data?.childs);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcSearchContent();
    funcGetContentCategoryById();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

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
          const newModel = {
            ...model,
            contentCategoryId: categoryPrev?.id,
            offset: 0,
          };
          setOffset(0);
          setModel(newModel);
          getContentCategory(categoryPrev);
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
  const getContentCategory = async (category) => {
    const response = await getContentCategoryById(category?.id);
    if (response?.status && isMounteRef.current) {
      setListContentCategory(response?.data?.childs);
    }
  };
  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetFilterContentSearch
        isOpenModal={isOpenModal}
        handleApplyOnPress={(event) => {
          const newModel = { ...event, keywork: search, offset: 0 };
          setModel(newModel);
          getData(newModel, true);
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
            <HeaderSearchDocumentByCategoryComponent
              navigation={navigation}
              listContentCategory={listContentCategory}
              countContent={countContent}
              onPressFilter={() => {
                setIsOpenModal(true);
              }}
              onSearch={(keyword) => {
                const newModel = { ...model, keyword, offset: 0 };
                setModel(newModel);
                setSearch(keyword);
                setOffset(0);
                getData(newModel, true);
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
                  contentCategoryId: category?.id,
                  offset: 0,
                };
                setOffset(0);
                setModel(newModel);
                getContentCategory(category);
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

export default SearchContentByCategoryScreen;
