/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import IconField from '@assets/icons/icon_field.svg';
import IconWatch from '@assets/icons/icon_watch.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { getByTrainingId } from '../../../services/lmssubject.api';

const WIDTH_ITEM = (screenWidth - horizontal(20 * 2) - horizontal(20)) / 2;
const IMAGE_HEIGHT = (WIDTH_ITEM * 154) / 216;

const ListSubject = (props) => {
  const dispatch = useDispatch();
  const { navigation, params } = props;
  const isMounteRef = useRef(false);
  const isRefreshing = false;
  const [listSubject, setListSubject] = useState([]);
  const [totalSubject, setTotalSubject] = useState([]);
  const paramsListSubject = {
    offset: 0,
    limit: 20,
    keyword: '',
    trainingId: params?.id,
  };

  const funcGetByTrainingId = async () => {
    const response = await getByTrainingId(paramsListSubject);
    if (response?.status && isMounteRef.current) {
      setListSubject(response?.data);
      setTotalSubject(response?.metaData?.totalRecord);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetByTrainingId();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const onRefresh = () => {};

  /**
   * Reder view item subject.
   * @param {*} param0
   */
  const renderItemSubject = (item) => (
    <TouchableDebounce
      style={[styles.viewItemClass]}
      onPress={() => {
        navigation.navigate(Constant.EDU_CLASS_DETAIL_SCREEN, item);
      }}
    >
      <CustomImage style={styles.imageItemClass} source={item?.avatar} />
      <CMText
        title={item?.title}
        style={styles.textTitleMyClass}
        numberOfLines={2}
      />
      <View style={styles.viewDateItem}>
        <IconField width={18} height={18} />
        <CMText title={item?.fieldName} style={styles.textDateMyClass} />
      </View>
      <View style={styles.viewDateItem}>
        <IconWatch width={18} height={18} />
        <CMText
          title={`${item?.duration?.toString()} giờ`}
          style={styles.textDateMyClass}
        />
      </View>
    </TouchableDebounce>
  );

  const renderHeader = () => (
    <View style={styles.viewClassFilter}>
      <View style={styles.viewTextClass}>
        <CMText i18nKey="text-list-subject" style={styles.textClass} />
        <CMText
          title={` (${totalSubject})`}
          style={[styles.textClass, { color: Color.color_text_progress_bar }]}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        data={listSubject}
        ListHeaderComponent={renderHeader}
        renderItem={({ item, index }) => renderItemSubject(item, index)}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    backgroundColor: Color.white,
  },
  viewItemClass: {
    width: WIDTH_ITEM,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: vertical(15),
    marginRight: horizontal(20),
    paddingHorizontal: horizontal(20),
  },
  imageItemClass: {
    height: IMAGE_HEIGHT,
    width: WIDTH_ITEM,
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  textTitleMyClass: {
    fontSize: 12,
    fontWeight: '700',
    color: Color.text_color,
    marginTop: vertical(10),
    height: vertical(20),
    fontFamily: fonts.bold,
    lineHeight: 20.4,
  },
  viewDateItem: {
    flexDirection: 'row',
    marginTop: vertical(5),
  },
  textDateMyClass: {
    fontSize: 10,
    fontWeight: '400',
    color: Color.text_color,
    lineHeight: 16,
    paddingHorizontal: horizontal(5),
    fontFamily: fonts.regular,
  },
  viewProgress: {
    marginTop: vertical(10),
    backgroundColor: Color.color_bg_progress_bar,
  },
  textProgress: {
    fontSize: 10,
    fontWeight: '600',
    color: Color.color_text_progress_bar,
    marginTop: vertical(5),
  },
  viewClassFilter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vertical(20),
    marginHorizontal: horizontal(20),
  },
  viewTextClass: {
    flexDirection: 'row',
  },
  textClass: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25.2,
  },
});
export default ListSubject;
