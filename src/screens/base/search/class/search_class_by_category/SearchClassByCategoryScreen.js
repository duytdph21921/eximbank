/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS, screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import IconCalenda from '@assets/other/icon_calendar.svg';
import fonts from '@assets/value/fonts';
import BackHeader from '@components/BackHeader';
import BottomSheetFilterClassSearch from '@/screens/base/components/BottomSheetFilterClassSearch';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { searchClass } from '@services/lms/lmsclass.api';
import { getClassCategoryById } from '@services/lms/lmsclasscategory.api';
import ViewClassRoomEmpty from '@components/ViewClassRoomEmpty';
import { LmsClassSearch } from '@base/model/lmsclass.model';
import HeaderSearchClassByCategoryComponent from './components/HeaderSearchClassByCategoryComponent';

const SearchClassByCategoryScreen = (props) => {
  const { navigation, route } = props;
  const { classCategory } = route?.params;
  const [listClassCategory, setListClassCategory] = useState([]);
  const [listClassRoom, setListClassRoom] = useState([]);
  const [countClassRoom, setCountClassRoom] = useState(0);
  const [category, setCategory] = useState(classCategory);
  const [categoryListRoute, setCategoryListRoute] = useState([classCategory]);
  const isMounteRef = useRef(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [search, setSearch] = useState('');
  const [isLoadMore, setLoadMore] = useState(false);
  const [model, setModel] = useState(
    new LmsClassSearch(offset, limit, search, 1, [], [], [], [], category?.id, []),
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [isRefreshing, setRefreshing] = useState(false);

  const onBack = () => {
    if (categoryListRoute) {
      const indexScreenCurrent = categoryListRoute.indexOf(category);
      if (indexScreenCurrent > 0) {
        const categoryPrev = categoryListRoute[indexScreenCurrent - 1];
        if (categoryPrev) {
          setCategory(categoryPrev);
          const newModel = { ...model, classCategoryId: categoryPrev?.id };
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
  }, [navigation, category]);

  const funcSearchClass = async () => {
    const response = await searchClass(model);
    if (response?.status && isMounteRef.current) {
      setListClassRoom(response?.data);
      setCountClassRoom(response?.metaData?.totalRecord);
    }
  };
  const funcGetClassCategoryById = async () => {
    const response = await getClassCategoryById(classCategory?.id);
    if (response?.status) {
      setListClassCategory(response?.data?.childs);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcSearchClass();
    funcGetClassCategoryById();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const gotoClassDetail = (item) => {
    navigation.navigate(Constant.SEARCH_CLASS_DETAIL, {
      classDetail: item,
    });
  };
  const renderItemClassRoom = (item, index) => (
    <TouchableDebounce
      style={styles.viewItemClass}
      onPress={() => gotoClassDetail(item)}
      key={index}
    >
      <CustomImage style={styles.imageItemClass} source={item?.avatar} />
      <CMText title={item?.title} style={styles.textTitleMyClass} numberOfLines={2} />
      <View style={styles.viewDateItem}>
        {(item?.startDate !== '' || item?.endDate !== '') && <IconCalenda width={16} height={16} />}
        <CMText
          title={`${item?.startDate ?? ''}${item?.endDate ? ` - ${item?.endDate}` : ''}`}
          style={styles.textDateMyClass}
        />
      </View>
      <View style={styles.classTypeName}>
        <CMText style={styles.textClassTypeName} title={item?.classTypeName} />
      </View>
    </TouchableDebounce>
  );
  const getData = async (model, isRefresh = false) => {
    const statusRelation = model?.statusRelation?.filter((item) => item !== 0);
    const statusClass = model?.statusClass?.filter((item) => item !== 0);
    const dataRange = model?.dataRange?.filter((item) => item !== 0);
    const classOrganizationType = model?.classOrganizationType?.filter((item) => item !== 0);
    const newParams = {
      ...model,
      statusRelation,
      statusClass,
      dataRange,
      classOrganizationType,
    };
    const response = await searchClass(newParams);
    setLoadMore(false);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setListClassRoom(response?.data);
      } else {
        setOffset(offset + 10);
        setListClassRoom([...listClassRoom, ...response?.data]);
      }
      setCountClassRoom(response?.metaData?.totalRecord);
    }
  };
  const getClassCategory = async (category) => {
    const response = await getClassCategoryById(category?.id);
    if (response?.status) {
      setListClassCategory(response?.data?.childs);
    }
  };
  const onRefresh = () => {
    setOffset(0);
    const newModel = { ...model, offset: 0 };
    setModel(newModel);
    getData(model, true);
  };
  /**
   * Load more.
   */
  const handleLoadMore = () => {
    if (
      !isLoadMore &&
      !this.onEndReachedCalledDuringMomentum &&
      listClassRoom.length < countClassRoom
    ) {
      setLoadMore(true);
      const newModel = { ...model, offset: offset + limit };
      getData(newModel);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetFilterClassSearch
        isOpenModal={isOpenModal}
        handleApplyOnPress={(event) => {
          const newModel = { ...event, offset: 0, keyword: search };
          setModel(newModel);
          setOffset(0);
          getData(newModel, true);
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        type={2}
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
          keyExtractor={(item, index) => index.toString()}
          data={listClassRoom}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <HeaderSearchClassByCategoryComponent
              navigation={navigation}
              listClassCategory={listClassCategory}
              countClassRoom={countClassRoom}
              onPressFilter={() => {
                setIsOpenModal(true);
              }}
              onHandleChangeCategory={(categoryNew) => {
                let listCategoryRoute = categoryListRoute;
                if (!listCategoryRoute) {
                  listCategoryRoute = [];
                }
                listCategoryRoute.push(categoryNew);
                setCategoryListRoute(listCategoryRoute);
                setCategory(categoryNew);
                const newModel = { ...model, classCategoryId: categoryNew?.id };
                setModel(newModel);
                getClassCategory(categoryNew);
                getData(newModel, true);
              }}
              onSearch={(keyword) => {
                const newModel = {
                  ...model,
                  keyword: keyword.trim(),
                  offset: 0,
                };
                setModel(newModel);
                setSearch(keyword);
                setOffset(0);
                getData(newModel, true);
              }}
            />
          }
          renderItem={({ item, index }) => renderItemClassRoom(item, index)}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={
            <ViewClassRoomEmpty
              onPressExplore={() => {
                navigation.navigate(Constant.SEARCH_SCREEN, {
                  tabIndex: 0,
                });
              }}
            />
          }
        />
        <RenderBottomFilter />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const WIDTH_ITEM = (screenWidth - horizontal(24 * 2) - horizontal(20)) / 2;
const IMAGE_HEIGHT = (WIDTH_ITEM * 154) / 216;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  contentContainerStyle: {
    backgroundColor: Color.white,
  },
  imageItemClass: {
    height: IMAGE_HEIGHT,
    width: WIDTH_ITEM,
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  classTypeName: {
    borderRadius: 100,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(4),
    backgroundColor: Color.color_width_featured_class,
    marginTop: vertical(8),
    alignSelf: 'flex-start',
  },
  textClassTypeName: {
    fontFamily: fonts.semi,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    textAlign: 'center',
  },
  viewItemClass: {
    width: WIDTH_ITEM,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: vertical(15),
    marginRight: horizontal(20),
    paddingHorizontal: horizontal(24),
  },
  textTitleMyClass: {
    fontSize: 12,
    fontWeight: '700',
    color: Color.text_color,
    marginTop: vertical(10),
    height: vertical(30),
  },
  viewDateItem: {
    flexDirection: 'row',
    marginTop: vertical(5),
    width: WIDTH_ITEM,
  },
  textDateMyClass: {
    fontSize: 10,
    fontWeight: '400',
    color: Color.text_color,
    lineHeight: 16,
    paddingHorizontal: horizontal(5),
    fontFamily: fonts.regular,
  },
});

export default SearchClassByCategoryScreen;
