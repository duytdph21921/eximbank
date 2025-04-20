/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import BottomSheetFilterClassSearch from '@/screens/base/components/BottomSheetFilterClassSearch';
import { searchClass } from '@services/lms/lmsclass.api';
import { getClassCategoryOnSearchScreen } from '@services/lms/lmsclasscategory.api';
import ViewClassRoomEmpty from '@components/ViewClassRoomEmpty';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { styles } from './Class.style';
import HeaderSearchClassRoomComponent from './components/HeaderSearchClassRoomComponent';
import RenderItemClassRoom from './components/RenderItemClassRoom';

const ClassScreen = (props) => {
  const { navigation, route, index } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listClassRoom, setListClassRoom] = useState([]);
  const [countClassRoom, setCountClassRoom] = useState(0);
  const [listClassCategory, setListClassCategory] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [limit] = useState(20);
  const isMounteRef = useRef(false);
  const dispatch = useDispatch();
  const [model, setModel] = useState({
    offset: 0,
    limit,
    keyword: '',
    orderBy: route?.params?.orderBy ?? 1,
    statusRelation: [],
    statusClass: [],
    dataRange: [],
    classOrganizationType: [],
    classCategoryId: '00000000-0000-0000-0000-000000000000',
    statusLearn: [],
  });
  const modelCategory = {
    offset: 0,
    limit: 9999,
    keyword: '',
  };
  const goToClassDetail = (item) => {
    if (item?.isJoined) {
      navigation.navigate(Constant.CLASS_DETAIL_SCREEN, {
        id: item?.id,
        indexTab: 1,
      });
    } else {
      navigation.navigate(Constant.SEARCH_CLASS_DETAIL, {
        classDetail: item,
      });
    }
  };
  const funcSearchClass = async (modelSearch) => {
    const response = await searchClass(modelSearch);
    if (response?.status && isMounteRef.current) {
      setListClassRoom(response?.data);
      setCountClassRoom(response?.metaData?.totalRecord);
    }
  };
  const funcGetClassCategoryOnSearchScreen = async (modelCategory) => {
    const response = await getClassCategoryOnSearchScreen(modelCategory);
    if (response?.status && isMounteRef.current) {
      setListClassCategory(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (index === 0) {
      dispatch(updateLoadingAction(true));
      funcSearchClass(model);
      funcGetClassCategoryOnSearchScreen(modelCategory);
      dispatch(updateLoadingAction(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  /**
   * Get all data classroom.
   */
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
    if (response?.status) {
      if (isMounteRef.current) {
        if (isRefresh) {
          setListClassRoom(response?.data);
        } else {
          setOffset(offset + 10);
          setListClassRoom([...listClassRoom, ...response?.data]);
        }
        setCountClassRoom(response?.metaData?.totalRecord);
      }
    }
  };

  /**
   * Load more.
   */
  const handleLoadMore = async () => {
    if (
      !isLoadMore &&
      !this.onEndReachedCalledDuringMomentum &&
      listClassRoom?.length < countClassRoom
    ) {
      setLoadMore(true);
      // const newModel = { ...model, offset: offset + 10 };
      const newModel = { ...model, offset: offset + limit };
      getData(newModel);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  const onRefresh = () => {
    const newParams = { ...model, offset: 0 };
    setModel(newParams);
    setOffset(0);
    getData(newParams, true);
  };

  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetFilterClassSearch
        isOpenModal={isOpenModal}
        handleApplyOnPress={(event) => {
          const newModel = { ...event, offset: 0, keyword: search };
          setOffset(0);
          setModel(newModel);
          getData(newModel, true);
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        model={model}
        type={1}
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
          data={listClassRoom}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <HeaderSearchClassRoomComponent
              navigation={navigation}
              listClassRoom={listClassRoom}
              listClassCategory={listClassCategory}
              countClassRoom={countClassRoom}
              onPressFilter={() => {
                setIsOpenModal(true);
              }}
              onSearch={(keyword) => {
                const newParams = {
                  ...model,
                  keyword: keyword.trim(),
                  offset: 0,
                };
                setOffset(0);
                setSearch(keyword.trim());
                setModel(newParams);
                getData(newParams, true);
              }}
            />
          }
          renderItem={({ item, index }) => (
            <RenderItemClassRoom
              item={item}
              index={index}
              goToClassDetail={(item) => goToClassDetail(item)}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={<ViewClassRoomEmpty onPressExplore={() => {}} />}
        />
        <RenderBottomFilter />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ClassScreen;
