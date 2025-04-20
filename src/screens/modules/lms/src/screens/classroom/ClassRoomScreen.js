/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import { hasNotch } from 'react-native-device-info';
import * as Progress from 'react-native-progress';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS, screenWidth } from '@utils/platforms';
import { horizontal } from '@utils/scales';
import IconCalenda from '@assets/other/icon_calendar.svg';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import BottomSheetFilterClassRoom from '../../component/BottomSheetFilterClassRoom';
import { getClassJoined } from '../../services/lmsclass.api';
import { styles } from './ClassRoom.styles';
import HeaderClassRoomComponent from './components/HeaderClassRoomComponent';
import ViewClassRoomEmpty from './components/ViewClassRoomEmpty';

const WIDTH_ITEM = (screenWidth - horizontal(15 * 2) - horizontal(15 * 2)) / 2;

const ClassRoomScreen = (props) => {
  const { navigation, index } = props;
  const dispatch = useDispatch();
  const isRefreshing = false;
  const [isLoadMore, setLoadMore] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listClassRoom, setListClassRoom] = useState([]);
  const [countContent, setCountContent] = useState(0);
  const [offset, setOffset] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [limit] = useState(20);
  const isMounteRef = useRef(false);
  const [model, setModel] = useState({
    offset,
    limit: 20,
    keyword,
    orderBy: 1, // Ko dùng
    statusLearn: [], // trạng thái học tập
    statusRelation: [], // trạng thái  bắt buộc
    statusClass: [], // tiến trình thời gian
    classOrganizationType: [], // Loại tổ chức
    classCategoryId: '00000000-0000-0000-0000-000000000000',
    dataRange: [], // Phạm vi dữ liệu,  Ko dùng
  });

  /**
   * Lấy danh sách lớp học.
   */
  const funcGetClassJoined = async () => {
    const response = await getClassJoined(model);
    if (response?.status) {
      setListClassRoom(response?.data);
      setCountContent(response?.metaData?.totalRecord);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (index === 0) {
      dispatch(updateLoadingAction(true));
      funcGetClassJoined();
      dispatch(updateLoadingAction(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, [index]);

  /**
   * Load refresh.
   */
  const onRefresh = () => {
    setOffset(0);
    const newModel = { ...model, offset: 0 };
    setModel(newModel);
    getData(newModel, true);
  };

  /**
   * Load more.
   */
  const handleLoadMore = () => {
    if (
      !isLoadMore &&
      !this.onEndReachedCalledDuringMomentum &&
      listClassRoom.length < countContent
    ) {
      setLoadMore(true);
      const newModel = { ...model, offset: offset + limit };
      getData(newModel);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  /**
   * Get data load more, search, filter...
   */
  const getData = async (newModel, isRefresh = false) => {
    const statusLearn = newModel?.statusLearn?.filter((item) => item !== 0);
    const statusRelation = newModel?.statusRelation?.filter(
      (item) => item !== 0
    );
    const statusClass = newModel?.statusClass?.filter((item) => item !== 0);
    const classOrganizationType = newModel?.classOrganizationType?.filter(
      (item) => item !== 0
    );
    const newParams = {
      ...newModel,
      statusLearn,
      statusRelation,
      statusClass,
      classOrganizationType,
    };
    const response = await getClassJoined(newParams);
    if (response?.status) {
      if (isRefresh) {
        setListClassRoom(response?.data);
      } else {
        setOffset(offset + 10);
        setListClassRoom([...listClassRoom, ...(response?.data ?? [])]);
      }
      setCountContent(response?.metaData?.totalRecord);
    }
  };

  const gotoClassDetail = (item) => {
    navigation.navigate(Constant.CLASS_DETAIL_SCREEN, {
      id: item?.id,
      indexTab: 1,
    });
  };
  /**
   * Reder view item class room.
   * @param {*} param0
   */
  const renderItemClassRoom = (item) => (
    <TouchableDebounce
      style={styles.viewItemClass}
      onPress={() => gotoClassDetail(item)}
    >
      <CustomImage style={styles.imageItemClass} source={item?.avatar} />
      <CMText
        title={item?.title}
        style={styles.textTitleMyClass}
        numberOfLines={2}
      />
      <View style={styles.viewDateItem}>
        {(item?.startDate !== '' || item?.endDate !== '') && (
          <IconCalenda width={16} height={16} />
        )}
        <CMText
          title={`${item?.startDate ?? ''}${
            item?.endDate ? ` - ${item?.endDate}` : ''
          }`}
          style={styles.textDateMyClass}
          numberOfLines={1}
        />
      </View>
      <Progress.Bar
        progress={(item?.percent ?? 0) / 100}
        width={WIDTH_ITEM}
        style={styles.viewProgress}
        color={Color.color_progress_bar}
        borderWidth={0}
      />
      <CMText i18nKey="text-complete-survey" style={styles.textProgress}>
        <CMText title={` ${item?.percent}%`} style={styles.textProgress} />
      </CMText>
    </TouchableDebounce>
  );

  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetFilterClassRoom
        isOpenModal={isOpenModal}
        handleApplyOnPress={(event) => {
          const newModel = { ...event, keyword };
          setModel(newModel);
          getData(newModel, true);
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        model={model}
      />
    ),
    [isOpenModal]
  );

  const gotoSearchClass = () => {
    navigation.navigate(Constant.SEARCH_STACK, {
      screen: Constant.SEARCH_SCREEN,
      params: {
        tabIndex: 0,
      },
    });
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={isIOS && hasNotch() ? 0 : 10}
      behavior={isIOS ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
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
            <HeaderClassRoomComponent
              navigation={navigation}
              listClassRoom={listClassRoom}
              countClassRoom={countContent}
              onPressFilter={() => {
                setIsOpenModal(true);
              }}
              onSearch={(search) => {
                const newModel = {
                  ...model,
                  keyword: search.trim(),
                  offset: 0,
                };
                setOffset(0);
                setKeyword(search.trim());
                setModel(newModel);
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
                gotoSearchClass();
              }}
            />
          }
        />
        <RenderBottomFilter />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ClassRoomScreen;
