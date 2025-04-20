/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  View,
  VirtualizedList,
} from 'react-native';
import CMText from '@components/CMText';
import { isIOS } from '@utils/platforms';
import { hasNotch } from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import Constant from '@utils/constants';
import { styles } from './MyTestScreen.styles';
import ViewMyTestEmpty from './components/ViewMyTestEmpty';
import ViewHeader from './components/ViewHeader';
import RenderHeaderList from './components/RenderHeaderList';
import RenderItemTest from './components/RenderItemTest';
import { getMyTest } from '../../services/testregistortestform.api';
import BottomSheetFilterMyTestSearch from '../../component/BottomSheetFilterMyTestSearch';

/**
 * V. Bài thi của tôi-data
 * @returns
 */
const MyTestScreen = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [listMyTest, setListMyTest] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [limit] = useState(10);
  const isMounteRef = useRef(false);
  const [model, setModel] = useState({
    offset,
    limit,
    keyword: search,
    statusRegistor: [],
  });

  /**
   * Custom header screeen.
   */

  const renderHeaderRight = () => <View />;

  const renderHeaderLeft = () => (
    <View>
      <CMText i18nKey="text-title-my-exam" style={styles.titleScreen} />
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      title: '',
    });
  }, [navigation]);

  const funcGetMyTest = async (params) => {
    const response = await getMyTest(params);
    if (response?.status && isMounteRef.current) {
      setListMyTest(response?.data);
      setTotalRecord(response?.metaData?.totalRecord);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetMyTest(model);
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  /**
   * Get data  bài thi ngoài lớp học.
   */
  const getDataMyTest = async (param, isRefresh = false) => {
    const statusRegistor = param?.statusRegistor?.filter((item) => item !== 0);
    const newParams = {
      ...param,
      statusRegistor,
    };
    const response = await getMyTest(newParams);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setListMyTest(response?.data);
      } else {
        setOffset(offset + 10);
        setListMyTest([...listMyTest, ...response?.data]);
      }
      setTotalRecord(response?.metaData?.totalRecord);
    }
  };

  /**
   * Làm mới danh sách bài thi ngoài lớp học.
   */
  const onRefresh = () => {
    setOffset(0);
    const newModel = { ...model, offset: 0 };
    setModel(newModel);
    getDataMyTest(newModel, true);
  };

  /**
   * Load more: lấy dữ liệu củ của bài thi ngoài lớp học.
   */
  const handleLoadMore = () => {
    if (
      !isLoadMore &&
      !this.onEndReachedCalledDuringMomentum &&
      listMyTest?.length < totalRecord
    ) {
      setLoadMore(true);
      const newModel = { ...model, offset: offset + limit };
      getDataMyTest(newModel);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetFilterMyTestSearch
        isOpenModal={isOpenModal}
        handleApplyOnPress={(event) => {
          const newModel = { ...event, keyword: search, offset: 0 };
          setModel(newModel);
          setOffset(0);
          getDataMyTest(newModel, true);
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        model={model}
      />
    ),
    [isOpenModal]
  );

  const onPressExplore = () => {
    navigation.navigate(Constant.SEARCH_STACK, {
      screen: Constant.SEARCH_SCREEN,
      params: { tabIndex: 2 },
    });
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={isIOS && hasNotch() ? 0 : 10}
      behavior={isIOS ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <ViewHeader
          valueSearch={model?.keyword}
          onSubmitSearch={(keyword) => {
            const newModel = { ...model, keyword: keyword.trim(), offset: 0 };
            setSearch(keyword.trim());
            setOffset(0);
            setModel(newModel);
            getDataMyTest(newModel, true);
          }}
        />
        <VirtualizedList
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          onEndReached={() => {
            handleLoadMore();
          }}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          onEndReachedThreshold={0.01}
          overScrollMode="never"
          getItemCount={(data) => (data !== undefined ? data?.length : 0)}
          getItem={(data, index) => data[index]}
          initialNumToRender={10}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          windowSize={50}
          bounce={false}
          keyExtractor={(_item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={listMyTest}
          ListHeaderComponent={
            <RenderHeaderList
              onPressFilter={() => {
                setIsOpenModal(true);
              }}
              totalRecord={totalRecord}
            />
          }
          renderItem={({ item, index }) => (
            <RenderItemTest item={item} index={index} navigation={navigation} />
          )}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={
            <ViewMyTestEmpty
              onHandleExplore={() => {
                onPressExplore();
              }}
            />
          }
        />
        <RenderBottomFilter />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MyTestScreen;
