/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import IconClock from '@assets/other/clock.svg';
import BottomSheetFilterExam from '@/screens/base/components/BottomSheetFilterExam';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { searchRegistor } from '@services/test/testregistor.api';
import { searchRegistorCategory } from '@services/test/testregistorcategory.api';
import { styles } from './ExamSearch.style';
import HeaderSearchExamComponent from './components/HeaderSearchExamComponent';
import ViewExamEmpty from './components/ViewExamEmpty';

const RenderContentItem = ({ item, index, gotoContentDetail }) => (
  <TouchableDebounce
    style={styles.viewItemContent}
    onPress={() => gotoContentDetail(item)}
    key={index}
  >
    <View style={styles.boxItem}>
      <View style={styles.boxImg}>
        <CustomImage style={styles.imageItemContent} source={item?.avatar} />
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

const ExamSearchScreen = (props) => {
  const { navigation, index } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listContent, setListContent] = useState([]);
  const [countContent, setCountContent] = useState(0);
  const [listContentCategory, setListContentCategory] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [limit] = useState(20);
  const isMounteRef = useRef(false);
  const dispatch = useDispatch();
  const [model, setModel] = useState({
    categoryId: '00000000-0000-0000-0000-000000000000',
    statusRelation: [1, 0], // Pham vi dữ
    statusRegistor: [], // Tiến trình thời gian
    dataRange: [], // Phạm vi dữ liệu.
    offset,
    limit,
    keyword: search,
  });
  const modelCategory = {
    offset: 0,
    limit: 9999,
    keyword: '',
  };

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
    const dataRange = param?.dataRange?.filter((item) => item !== 0);
    const newParams = {
      ...param,
      statusRegistor,
      statusRelation,
      dataRange,
    };
    const response = await searchRegistor(newParams);
    setLoadMore(false);
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
  const funcSearchRegistorCategory = async () => {
    const response = await searchRegistorCategory(modelCategory);
    if (response?.status && isMounteRef.current) {
      setListContentCategory(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (index === 2) {
      dispatch(updateLoadingAction(true));
      funcSearchRegistor();
      funcSearchRegistorCategory();
      dispatch(updateLoadingAction(false));
    }

    return () => {
      isMounteRef.current = false;
    };
  }, [index]);

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
        isSortAll
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
            <HeaderSearchExamComponent
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
                setOffset(0);
                setModel(newModel);
                getData(newModel, true);
              }}
            />
          }
          renderItem={({ item, index }) => (
            <RenderContentItem item={item} index={index} gotoContentDetail={gotoContentDetail} />
          )}
          numColumns={1}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={<ViewExamEmpty />}
        />
        <RenderBottomFilter />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ExamSearchScreen;
