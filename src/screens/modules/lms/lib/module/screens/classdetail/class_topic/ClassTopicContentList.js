"use strict";

/* eslint-disable global-require */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import { horizontal, vertical } from '@utils/scales';
import { isTablet } from 'react-native-device-info';
import { screenWidth } from '@utils/platforms';
import TouchableDebounce from '@components/TouchableDebounce';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { updateLoadingAction, updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import CMText from '@components/CMText';
import { calculatorTime, loadFile } from '@utils/helpers';
import FastImage from 'react-native-fast-image';
import ViewClassTopicEmpty from "./ViewClassTopicEmpty.js";
import { postClassTopic, searchFr } from "../../../services/lmsclasstopic.api.js";
import BottomAddClassTopic from "../../../component/BottomAddClassTopic/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ITEM_WIDTH_SLIDE = screenWidth - horizontal(24 * 2);
const ITEM_HEIGHT_SLIDE = isTablet ? ITEM_WIDTH_SLIDE * 140 / 327 : ITEM_WIDTH_SLIDE * 162 / 327;
const RenderItemClassTopic = ({
  item,
  languageLocal,
  viewDetailTopic
}) => /*#__PURE__*/_jsxs(TouchableOpacity, {
  style: styles.boxTopic,
  onPress: () => {
    viewDetailTopic(item);
  },
  children: [/*#__PURE__*/_jsx(View, {
    style: {
      marginBottom: vertical(8)
    },
    children: /*#__PURE__*/_jsx(CMText, {
      title: item?.title,
      style: styles.title
    })
  }), /*#__PURE__*/_jsxs(View, {
    style: styles.boxItem,
    children: [item?.avatar ? /*#__PURE__*/_jsx(FastImage, {
      source: {
        uri: loadFile(item?.avatar)
      },
      resizeMode: "contain",
      style: styles.avatarProfile
    }) : /*#__PURE__*/_jsx(FastImage, {
      source: require('@assets/img/avatar-detail.png'),
      resizeMode: "contain",
      style: styles.avatarProfile
    }), /*#__PURE__*/_jsx(CMText, {
      title: item?.displayName,
      style: styles.displayName
    }), item?.createdDate && /*#__PURE__*/_jsxs(View, {
      style: {
        flexDirection: 'row'
      },
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.dot
      }), /*#__PURE__*/_jsx(CMText, {
        title: calculatorTime(item?.createdDate, languageLocal),
        style: styles.textTime
      })]
    })]
  })]
});
const ClassTopicContentList = props => {
  const {
    contentInfo,
    classInfo,
    index,
    handleTopicInfo,
    handleBack
  } = props;
  const [listData, setListData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const isMounteRef = useRef(false);
  const languageLocal = useSelector(state => state.global.language);
  useEffect(() => {
    if (contentInfo) {
      let newTitle = contentInfo?.title ?? '';
      if (newTitle.length > 45) {
        newTitle = `${newTitle.slice(0, 45)}...`;
      }
      setTitle(newTitle);
    }
  }, []);
  const funcSearchFr = async params => {
    const response = await searchFr(params);
    if (response?.status && isMounteRef.current) {
      setListData(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    const model = {
      offset: 0,
      limit: 9999,
      keyword: '',
      classId: classInfo?.id,
      classContentId: contentInfo?.id
    };
    if (index === 4) {
      dispatch(updateLoadingAction(true));
      funcSearchFr(model);
      dispatch(updateLoadingAction(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const getData = () => {
    const model = {
      offset: 0,
      limit: 9999,
      keyword: '',
      classId: classInfo?.id,
      classContentId: contentInfo?.id
    };
    if (index === 4) {
      funcSearchFr(model);
    }
  };
  const RenderBottomAddClassTopic = useCallback(() => /*#__PURE__*/_jsx(BottomAddClassTopic, {
    isOpenModal: isOpenModal,
    handleSubmitTopic: event => {
      handleSubmitTopic(event);
    },
    closeModal: () => {
      setIsOpenModal(false);
    }
  }), [isOpenModal]);
  const handleSubmitTopic = async item => {
    // Check data truoc khi day len
    if (!item?.title || !item?.content) {
      dispatch(updateShowDialogWarnAction({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-title-dialog-warn',
        keyMessage: 'text-notify-tb21',
        contentMessage: '',
        isShowCancel: true,
        isShowSubmit: false,
        keyCancel: 'text-close'
      }));
      return;
    }
    // Call api đẩy dữ liệu lên
    const model = {
      classId: classInfo?.id,
      content: item?.content,
      title: item?.title,
      itemId: contentInfo?.id
    };
    const response = await postClassTopic(model);
    if (response?.status) {
      dispatch(updateShowDialogWarnAction({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-tab-notification',
        keyMessage: 'text-success-action',
        contentMessage: '',
        isShowCancel: true,
        isShowSubmit: false,
        keyCancel: 'text-close'
      }));
      getData();
    } else {
      dispatch(updateShowDialogWarnAction({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-title-dialog-warn',
        keyMessage: 'text-internal-error',
        contentMessage: '',
        isShowCancel: true,
        isShowSubmit: false,
        keyCancel: 'text-close'
      }));
    }
  };
  const viewDetailTopic = item => {
    handleTopicInfo(2, item);
  };
  const onHandleBack = () => {
    handleBack(0);
  };
  const handleLoadMore = () => {};
  return /*#__PURE__*/_jsx(SafeAreaView, {
    style: styles.container,
    children: /*#__PURE__*/_jsxs(View, {
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.header,
        children: [/*#__PURE__*/_jsx(TouchableDebounce, {
          onPress: () => {
            onHandleBack();
          },
          children: /*#__PURE__*/_jsx(CMText, {
            i18nKey: "text-class-topic-content",
            style: styles.textHeader
          })
        }), /*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: faAngleRight,
          style: styles.iconFaAngleRight,
          size: 10
        }), /*#__PURE__*/_jsx(CMText, {
          title: title,
          style: styles.textHeader
        })]
      }), /*#__PURE__*/_jsx(View, {
        style: styles.boxParent,
        children: /*#__PURE__*/_jsx(FlatList, {
          onEndReached: () => {
            handleLoadMore();
          },
          onMomentumScrollBegin: () => {
            this.onEndReachedCalledDuringMomentum = false;
          },
          keyExtractor: (item, index) => index.toString(),
          data: listData,
          showsVerticalScrollIndicator: false,
          renderItem: ({
            item,
            index
          }) => /*#__PURE__*/_jsx(RenderItemClassTopic, {
            item: item,
            index: index,
            viewDetailTopic: viewDetailTopic,
            languageLocal: languageLocal
          }),
          contentContainerStyle: styles.contentContainerStyle,
          ListEmptyComponent: /*#__PURE__*/_jsx(ViewClassTopicEmpty, {})
        })
      }), /*#__PURE__*/_jsx(View, {
        style: styles.viewBtnAdd,
        children: /*#__PURE__*/_jsx(TouchableDebounce, {
          style: [styles.btnAddTopic, {
            backgroundColor: Color.base_color
          }],
          onPress: () => {
            setIsOpenModal(true);
          },
          children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
            icon: faPlus,
            style: styles.iconPlus
          })
        })
      }), /*#__PURE__*/_jsx(RenderBottomAddClassTopic, {})]
    })
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    marginHorizontal: horizontal(20),
    position: 'relative'
  },
  textInput: {
    width: screenWidth - horizontal(20 * 2),
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: isTablet ? ITEM_HEIGHT_SLIDE * 0.2 : 1
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20.4
  },
  avatarProfile: {
    width: 20,
    height: 20,
    borderRadius: 20
  },
  boxItem: {
    flexDirection: 'row'
  },
  displayName: {
    fontFamily: fonts.regular,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: horizontal(4)
  },
  boxTopic: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Color.color_width_featured_class,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(16),
    width: screenWidth - horizontal(20) * 2,
    marginTop: vertical(16)
  },
  boxParent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: Color.text_color_hover,
    marginHorizontal: horizontal(8),
    marginVertical: vertical(4)
  },
  textTime: {
    fontFamily: fonts.regular,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    color: Color.text_color_hover
  },
  btnAddTopic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  iconPlus: {
    fontSize: 20,
    color: Color.white
  },
  viewBtnAdd: {
    position: 'absolute',
    bottom: 50,
    right: 10,
    alignSelf: 'flex-end'
  },
  header: {
    flexDirection: 'row'
  },
  iconFaAngleRight: {
    marginHorizontal: horizontal(5),
    marginVertical: vertical(2.5)
  },
  textHeader: {
    fontFamily: fonts.regular,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16
  }
});
export default ClassTopicContentList;
//# sourceMappingURL=ClassTopicContentList.js.map