/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import IconCalenda from '@assets/other/icon_calendar.svg';
import IconSubject from '@assets/icons/icon_subject.svg';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import CustomImage from '@components/CustomImage';
import { searchTrainingByUser } from '../../services/lmstraining.api';
import { styles } from './EducationProgram.styles';
import HeaderEduProgramComponent from './components/HeaderEduProgramComponent';
import BottomSheetFilterEduProgram from '../../component/BottomSheetFilterEduProgram';
import ViewTrainingRoomEmpty from './components/ViewTrainingRoomEmpty';

const EducationProgramScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation, index } = props;
  const isRefreshing = false;
  const [isLoadMore, setLoadMore] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isMounteRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [params, setParams] = useState({
    offset,
    limit: 20,
    keyword,
    statusTraining: [], // Trạng thái học tập.
    dataRange: [],
  });
  const [listEduProgram, setListEduProgram] = useState([]);
  const [countEduProgram, setCountEduProgram] = useState(0);

  /**
   * Api chương trình đào tạo.
   */
  const funcSearchTrainingByUser = async () => {
    const response = await searchTrainingByUser(params);
    if (response?.status && isMounteRef.current) {
      setListEduProgram(response?.data);
      setCountEduProgram(response?.metaData?.totalRecord);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (index === 1) {
      dispatch(updateLoadingAction(true));
      funcSearchTrainingByUser();
      dispatch(updateLoadingAction(false));
    }

    return () => {
      isMounteRef.current = false;
    };
  }, [index]);

  /**
   * Api danh sach chương trình đào tạo.
   * @param {*} param
   */
  const getDataEduProgram = async (param, isRefresh = false) => {
    const newStatusTraining = param?.statusTraining?.filter(
      (item) => item !== 0
    );
    const newParams = {
      ...param,
      statusTraining: newStatusTraining,
    };
    const response = await searchTrainingByUser(newParams);
    setLoadMore(false);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setListEduProgram(response?.data);
      } else {
        setOffset(offset + 10);
        setListEduProgram([...listEduProgram, ...(response?.data ?? [])]);
      }
      setCountEduProgram(response?.metaData?.totalRecord);
    }
  };

  const onRefresh = () => {
    const newParams = { ...params, offset: 0 };
    setParams(newParams);
    setOffset(0);
    getDataEduProgram(newParams, true);
  };

  /**
   * Load more.
   */
  const handleLoadMore = () => {
    if (
      !isLoadMore &&
      !this.onEndReachedCalledDuringMomentum &&
      listEduProgram.length < countEduProgram
    ) {
      setLoadMore(true);
      const newParams = { ...params, offset: offset + 10 };
      getDataEduProgram(newParams);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  /**
   * Reder view item edu program.
   * @param {*} param0
   */
  const itemEduProgram = (item) => (
    <TouchableDebounce
      style={styles.viewItemClass}
      onPress={() => {
        navigation.navigate(Constant.EDU_PROGRAM_DETAIL_SCREEN, item);
      }}
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
      <View style={styles.viewDateItem}>
        <IconSubject width={14} height={14} />
        <CMText title={`${item?.numSubject} `} style={styles.textDateMyClass}>
          <CMText i18nKey="text-title-subject" style={styles.textDateMyClass} />
        </CMText>
      </View>
    </TouchableDebounce>
  );

  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetFilterEduProgram
        isOpenModal={isOpenModal}
        handleApplyOnPress={(event) => {
          const newModel = { ...event, offset: 0, keyword };
          setOffset(0);
          setParams(newModel);
          getDataEduProgram(newModel, true);
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        model={params}
      />
    ),
    [isOpenModal]
  );
  const gotoSearchTraining = () => {
    navigation.navigate(Constant.SEARCH_STACK, {
      screen: Constant.SEARCH_SCREEN,
      params: { tabIndex: 1 },
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
          overScrollMode="never"
          initialNumToRender={10}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          windowSize={50}
          bounce={false}
          keyExtractor={(_item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={listEduProgram}
          ListHeaderComponent={
            <HeaderEduProgramComponent
              navigation={navigation}
              listEduProgram={listEduProgram}
              countEduProgram={countEduProgram}
              onPressFilter={() => {
                setIsOpenModal(true);
              }}
              onSearch={(search) => {
                const newParams = {
                  ...params,
                  keyword: search.trim(),
                  offset: 0,
                };
                setOffset(0);
                setKeyword(search.trim());
                setParams(newParams);
                getDataEduProgram(newParams, true);
              }}
            />
          }
          renderItem={({ item }) => itemEduProgram(item)}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={
            <ViewTrainingRoomEmpty
              onPressExplore={() => {
                gotoSearchTraining();
              }}
            />
          }
        />
        <RenderBottomFilter />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EducationProgramScreen;
