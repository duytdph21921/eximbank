/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { Color } from '@theme/colors';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import TouchableDebounce from '@components/TouchableDebounce';
import { changeColor } from '@utils/helpers';
import IconDocument from '@assets/icons/icon_document';
import { horizontal, vertical } from '@utils/scales';
import IconClock from '@assets/icons/icon_clock.svg';
import { getByRegistorId } from '@services/test/testregistortestform.api';
import BottomSheetFilterListExam from '@/screens/base/components/BottomSheetFilterListExam';
import { screenWidth } from '@utils/platforms';
import RenderHeaderList from './components/RenderHeaderList';

const RenderContentItem = ({ item, index, onHandleItem }) => (
  <TouchableDebounce style={styles.viewContenItem} onPress={() => onHandleItem(item)} key={index}>
    <View
      style={[
        styles.viewIcon,
        {
          backgroundColor: changeColor(Color.base_color),
        },
      ]}
    >
      <IconDocument width={32} height={32} />
    </View>
    <View style={styles.viewContent}>
      <CMText title={item?.title} numberOfLines={2} style={styles.textTitleItem} />

      <View style={styles.viewItem}>
        <IconClock width={16} height={16} />
        <CMText i18nKey="get-start" style={styles.textContentItem}>
          <CMText
            title={` : ${item?.startDate}`}
            numberOfLines={1}
            style={styles.textContentItem}
          />
        </CMText>
      </View>
      <View style={styles.viewItem}>
        <IconClock width={16} height={16} />
        <CMText i18nKey="get-end" style={styles.textContentItem}>
          <CMText title={` : ${item?.endDate}`} numberOfLines={1} style={styles.textContentItem} />
        </CMText>
      </View>
    </View>
  </TouchableDebounce>
);
const ListExamScreen = (props) => {
  const dispatch = useDispatch();
  const { contentInfo, navigation } = props;
  const isMounteRef = useRef(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [dataListExam, setDataListExam] = useState(0);
  const [countContent, setCountContent] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [model, setModel] = useState({
    offset,
    limit,
    statusRegistor: [],
    registorId: contentInfo?.id,
  });
  const funcGetByRegistorId = async () => {
    const response = await getByRegistorId(model);
    if (response?.status && isMounteRef.current) {
      setDataListExam(response?.data?.listData);
      setCountContent(response?.data?.totalRows);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetByRegistorId();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const onHandleItem = (item) => {
    navigation.navigate(Constant.EXAM_INFORMATION_SCREEN, item);
  };

  const getData = async (model, isRefresh = false) => {
    const statusRegistor = model?.statusRegistor?.filter((item) => item !== 0);
    const newParams = {
      ...model,
      statusRegistor,
    };
    const response = await getByRegistorId(newParams);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setDataListExam(response?.data?.listData);
      } else {
        setOffset(offset + 10);
        setDataListExam([...dataListExam, ...(response?.data?.listData ?? [])]);
      }
      setCountContent(response?.data?.totalRows);
    }
  };

  const onRefresh = () => {
    setOffset(0);
    const newModel = { ...model, offset: 0 };
    setModel(newModel);
    getData(newModel, true);
  };
  const handleLoadMore = () => {
    if (
      !isLoadMore &&
      !this.onEndReachedCalledDuringMomentum &&
      dataListExam.length < countContent
    ) {
      setLoadMore(true);
      const newModel = { ...model, offset: offset + limit };
      getData(newModel);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetFilterListExam
        isOpenModal={isOpenModal}
        handleApplyOnPress={(event) => {
          const newModel = { ...event, offset: 0 };
          setModel(newModel);
          setOffset(0);
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
    <View style={styles.container}>
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
        data={dataListExam}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <RenderHeaderList
            onPressFilter={() => {
              setIsOpenModal(true);
            }}
            totalRecord={countContent}
          />
        }
        renderItem={({ item, index }) => (
          <RenderContentItem item={item} index={index} onHandleItem={onHandleItem} />
        )}
        numColumns={1}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<View />}
      />
      <RenderBottomFilter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: horizontal(24),
  },
  contentContainerStyle: {
    backgroundColor: Color.white,
  },
  viewTextClass: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: vertical(20),
  },
  textClass: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25.2,
  },

  viewIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Color.color_bg_item_my_test,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vertical(2),
  },
  viewContent: {
    flex: 1,
    paddingLeft: horizontal(15),
  },
  viewItem: {
    flexDirection: 'row',
    marginTop: vertical(10),
  },
  textTitleItem: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20.4,
  },
  textContentItem: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: 3,
  },
  viewContenItem: {
    backgroundColor: Color.white,
    borderRadius: 16,
    flexDirection: 'row',
    padding: horizontal(16),
    marginTop: vertical(20),
    width: screenWidth - horizontal(24 * 2),
  },
});
export default ListExamScreen;
