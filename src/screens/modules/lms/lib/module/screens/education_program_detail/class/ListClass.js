"use strict";

/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import IconField from '@assets/icons/icon_field.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import BottomSheetListSubjectClass from '@components/BottomSheetListSubjectClass';
import IconFilter from '@assets/icons/icon_filter.svg';
import { getBySubjectIdAndUser } from "../../../services/lmsclass.api.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const WIDTH_ITEM = (screenWidth - horizontal(20 * 2) - horizontal(20)) / 2;
const IMAGE_HEIGHT = WIDTH_ITEM * 154 / 216;
const ListClass = props => {
  const dispatch = useDispatch();
  const {
    navigation,
    params
  } = props;
  const isMounteRef = useRef(false);
  const isRefreshing = false;
  const [listClass, setListClass] = useState([]);
  const [totalClass, setTotalClass] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const search = '';
  const [isLoadMore, setLoadMore] = useState(false);
  const [paramsListClass, setParamsListClass] = useState({
    offset,
    limit,
    keyword: search,
    subjectId: params?.id,
    orderBy: 1,
    statusLearn: [],
    statusRelation: [],
    statusClass: []
  });
  const funcGetBySubjectIdAndUser = async () => {
    const response = await getBySubjectIdAndUser(paramsListClass);
    if (response?.status && isMounteRef.current) {
      setListClass(response?.data);
      setTotalClass(response?.metaData?.totalRecord);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetBySubjectIdAndUser();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const onRefresh = () => {};
  /**
   * Reder view item class.
   * @param {*} param0
   */
  const gotoClassDetail = item => {
    navigation.navigate(Constant.SEARCH_CLASS_DETAIL, {
      classDetail: item
    });
  };
  const renderItemClass = (item, index) => /*#__PURE__*/_jsxs(TouchableDebounce, {
    style: [styles.viewItemClass, {
      marginLeft: index % 2 !== 0 ? screenWidth - horizontal(30 * 2) - WIDTH_ITEM * 2 : 0
    }],
    onPress: () => gotoClassDetail(item),
    children: [/*#__PURE__*/_jsx(CustomImage, {
      style: styles.imageItemClass,
      source: item?.avatar
    }), /*#__PURE__*/_jsx(CMText, {
      title: item?.title,
      style: styles.textTitleMyClass,
      numberOfLines: 2
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.viewDateItem,
      children: [(item?.startDate !== '' || item?.endDate !== '') && /*#__PURE__*/_jsx(IconField, {
        width: 18,
        height: 18
      }), /*#__PURE__*/_jsx(CMText, {
        title: `${item?.startDate ?? ''}${item?.endDate ? ` - ${item?.endDate}` : ''}`,
        style: styles.textDateMyClass
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: styles.viewClassType,
      children: /*#__PURE__*/_jsx(CMText, {
        title: `${item?.classTypeName}`,
        style: styles.textTypeClass
      })
    })]
  });
  const onPressFilter = () => {
    setIsOpenModal(true);
  };
  const getDataClass = async (param, isRefresh = false) => {
    const statusLearn = param?.statusLearn?.filter(item => item !== 0);
    const statusClass = param?.statusClass?.filter(item => item !== 0);
    const newParams = {
      ...param,
      statusLearn,
      statusClass
    };
    const response = await getBySubjectIdAndUser(newParams);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setListClass(response?.data);
      } else {
        setOffset(offset + 10);
        setListClass([...listClass, ...(response?.data ?? [])]);
      }
      setTotalClass(response?.metaData?.totalRecord);
    }
  };
  const renderHeader = () => /*#__PURE__*/_jsxs(View, {
    style: styles.viewClassFilter,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.viewTextClass,
      children: [/*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-list-class",
        style: styles.textClass
      }), /*#__PURE__*/_jsx(CMText, {
        title: ` (${totalClass ?? 0})`,
        style: [styles.textClass, {
          color: Color.color_text_progress_bar
        }]
      })]
    }), /*#__PURE__*/_jsx(TouchableDebounce, {
      onPress: onPressFilter,
      children: /*#__PURE__*/_jsx(IconFilter, {
        width: 24,
        height: 24
      })
    })]
  });
  const handleLoadMore = () => {
    if (!isLoadMore && !this.onEndReachedCalledDuringMomentum && listClass.length < totalClass) {
      setLoadMore(true);
      const newModel = {
        ...paramsListClass,
        offset: offset + limit
      };
      getDataClass(newModel);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
  const RenderBottomFilter = useCallback(() => /*#__PURE__*/_jsx(BottomSheetListSubjectClass, {
    isOpenModal: isOpenModal,
    handleApplyOnPress: event => {
      const newModel = {
        ...event,
        keyword: search,
        offset: 0
      };
      setParamsListClass(newModel);
      setOffset(0);
      getDataClass(newModel, true);
    },
    closeModal: () => {
      setIsOpenModal(false);
    },
    model: paramsListClass,
    type: 2,
    showStatusLearn: true,
    showStatusClass: true
  }), [isOpenModal]);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(FlatList, {
      refreshControl: /*#__PURE__*/_jsx(RefreshControl, {
        refreshing: isRefreshing,
        onRefresh: onRefresh
      }),
      onEndReached: () => {
        handleLoadMore();
      },
      onMomentumScrollBegin: () => {
        this.onEndReachedCalledDuringMomentum = false;
      },
      data: listClass,
      ListHeaderComponent: renderHeader,
      renderItem: ({
        item,
        index
      }) => renderItemClass(item, index),
      keyExtractor: (item, index) => index.toString(),
      numColumns: 2,
      contentContainerStyle: styles.contentContainerStyle
    }), /*#__PURE__*/_jsx(RenderBottomFilter, {})]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainerStyle: {
    backgroundColor: Color.white
  },
  viewItemClass: {
    width: WIDTH_ITEM,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: vertical(15),
    marginRight: horizontal(20),
    paddingHorizontal: horizontal(20)
  },
  imageItemClass: {
    height: IMAGE_HEIGHT,
    width: WIDTH_ITEM,
    alignSelf: 'flex-start',
    borderRadius: 8
  },
  textTitleMyClass: {
    fontSize: 12,
    fontWeight: '700',
    color: Color.text_color,
    marginTop: vertical(10),
    height: vertical(20),
    fontFamily: fonts.bold,
    lineHeight: 20.4
  },
  viewDateItem: {
    flexDirection: 'row',
    marginTop: vertical(5)
  },
  viewClassType: {
    flexDirection: 'row',
    marginTop: vertical(5),
    borderRadius: 50,
    width: 100,
    paddingVertical: 3,
    backgroundColor: Color.color_width_featured_class,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textDateMyClass: {
    fontSize: 10,
    fontWeight: '400',
    color: Color.text_color,
    lineHeight: 16,
    paddingHorizontal: horizontal(5),
    fontFamily: fonts.regular
  },
  textTypeClass: {
    fontSize: 10,
    fontWeight: '600',
    color: Color.text_color,
    lineHeight: 16,
    paddingHorizontal: horizontal(10),
    fontFamily: fonts.regular,
    paddingVertical: vertical(5)
  },
  viewProgress: {
    marginTop: vertical(10),
    backgroundColor: Color.color_bg_progress_bar
  },
  textProgress: {
    fontSize: 10,
    fontWeight: '600',
    color: Color.color_text_progress_bar,
    marginTop: vertical(5)
  },
  viewClassFilter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vertical(20),
    marginHorizontal: horizontal(20)
  },
  viewTextClass: {
    flexDirection: 'row'
  },
  textClass: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25.2
  }
});
export default ListClass;
//# sourceMappingURL=ListClass.js.map