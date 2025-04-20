/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import IconRight from '@assets/icons/icon_right.svg';
import IconLeft from '@assets/icons/icon_left.svg';
import { Color } from '@theme/colors';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { styles } from './HistoryAccessScreen.styles';
import { getLearningHistory } from '../../../services/logs.api';

const HistoryAccessScreen = (props) => {
  const { navigation, route } = props;
  const isRefreshing = false;
  const [listHistoryAccess, setListHistoryAccess] = useState([]);
  const isMounteRef = useRef(false);
  const isLoading = useRef(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const classUserId = route?.params?.classUser?.id;
  const params = {
    classUserId,
    offset,
    limit: 10,
  };

  const renderHeaderTitle = () => (
    <CMText
      i18nKey="text-header-history-access-screen"
      style={globalStyles.titleScreen}
    />
  );
  const renderHeaderRight = () => <View />;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, [navigation]);

  const funcGetLearningHistory = async (model) => {
    const response = await getLearningHistory(model);
    if (response?.status && isMounteRef.current) {
      setListHistoryAccess(response?.data);
      setTotal(response?.metaData?.totalRecord);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetLearningHistory(params);
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  /**
   * Render item history.
   */
  const itemHistory = (item) => (
    <View style={styles.viewItemHistory}>
      <View
        style={[
          styles.viewIcon,
          {
            backgroundColor:
              item?.actionCode === 'END_VIEW'
                ? Color.color_text_progress_bar
                : Color.text_color_hover,
          },
        ]}
      >
        {item?.actionCode === 'END_VIEW' ? (
          <IconLeft width={20} height={20} />
        ) : (
          <IconRight width={20} height={20} />
        )}
      </View>
      <View style={styles.viewContent}>
        <CMText title={item?.title ?? ''} style={styles.textTitle} />
        <CMText
          style={styles.textDate}
          title={moment(item?.logTime).format('HH:mm - DD/MM/YYYY') ?? ''}
        />
      </View>
    </View>
  );

  /**
   * handle refresh list notification.
   */
  const getData = async (type) => {
    if (isLoading.current === true) return;
    let newOffset = offset;
    if (type === 'refresh') {
      newOffset = 0;
    } else if (listHistoryAccess && listHistoryAccess.length < total) {
      newOffset = offset + 10;
    } else {
      return;
    }
    isLoading.current = false;
    const newModel = { ...params, offset: newOffset };
    const response = await getLearningHistory(newModel);
    if (response?.status) {
      if (type === 'refresh') {
        setListHistoryAccess(response?.data);
      } else {
        setListHistoryAccess([...listHistoryAccess, ...(response?.data ?? [])]);
      }
      setOffset(newOffset);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => getData('refresh')}
          />
        }
        onEndReachedThreshold={0.3}
        onEndReached={() => getData('loadMore')}
        data={listHistoryAccess}
        renderItem={({ item, index }) => itemHistory(item, index)}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HistoryAccessScreen;
