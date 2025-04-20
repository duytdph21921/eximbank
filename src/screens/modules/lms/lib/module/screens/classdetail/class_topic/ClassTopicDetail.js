"use strict";

/* eslint-disable global-require */
/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet, FlatList, KeyboardAvoidingView, SafeAreaView, TouchableNativeFeedback } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { faEllipsisH, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { horizontal, vertical } from '@utils/scales';
import CMText from '@components/CMText';
import fonts from '@assets/value/fonts';
import TouchableDebounce from '@components/TouchableDebounce';
import FastImage from 'react-native-fast-image';
import { calculatorTime, loadFile, replaceHtml } from '@utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@theme/colors';
import he from 'he';
import Constant from '@utils/constants';
import { isIOS, screenHeight, screenWidth } from '@utils/platforms';
import { hasNotch } from 'react-native-device-info';
import { updateLoadingAction, updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import HeaderTopicDetail from "./HeaderTopicDetail.js";
import { deleteClassTopic, getTopicInfo, postClassTopic, updateClassTopic, updateLike } from "../../../services/lmsclasstopic.api.js";
import BottomAddClassTopic from "../../../component/BottomAddClassTopic/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RenderAction = ({
  item,
  handleEdit,
  handleDelete
}) => /*#__PURE__*/_jsxs(View, {
  style: styles.boxActions,
  children: [/*#__PURE__*/_jsx(TouchableNativeFeedback, {
    onPress: () => {
      handleEdit(item);
    },
    children: /*#__PURE__*/_jsx(CMText, {
      i18nKey: "text-edit",
      style: styles.textAction
    })
  }), /*#__PURE__*/_jsx(TouchableNativeFeedback, {
    onPress: () => {
      handleDelete();
    },
    children: /*#__PURE__*/_jsx(CMText, {
      i18nKey: "text-delete",
      style: styles.textAction
    })
  })]
});
const ClassTopicDetail = props => {
  const {
    classInfo,
    type,
    contentInfo,
    classTopicInfo,
    handleBack
  } = props;
  const languageLocal = useSelector(state => state.global.language);
  const [listData, setListData] = useState([]);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const isMounteRef = useRef(false);
  const [isShowAction, setIsShowAction] = useState();
  const [itemEdit, setItemEdit] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const onHandleBack = (type = 0, index = 0) => {
    handleBack(type, index);
  };
  const funcGetTopicInfo = async () => {
    const response = await getTopicInfo(classTopicInfo?.id);
    if (response?.status && isMounteRef.current) {
      setListData(response?.data?.childs);
      setData(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetTopicInfo();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const updateLikeTopic = async id => {
    if (id) {
      const response = await updateLike(id);
      if (response?.status) {
        funcGetTopicInfo();
      }
    }
  };
  const postComment = async event => {
    if (!event?.comment) {
      return;
    }
    const model = {
      parentId: data?.id,
      classId: classInfo?.id,
      itemId: type === 1 ? Constant.GUIDEMPTY : contentInfo?.id,
      content: event?.comment,
      fileId: event?.fileId,
      id: itemEdit ? itemEdit?.id : Constant.GUIDEMPTY
    };
    const response = await postClassTopic(model);
    if (response?.status) {
      funcGetTopicInfo();
      setComment('');
      setItemEdit();
    }
  };
  const renderComment = (item, index) => /*#__PURE__*/_jsxs(View, {
    style: styles.comment,
    children: [/*#__PURE__*/_jsxs(View, {
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
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.boxItem,
        children: [/*#__PURE__*/_jsx(CMText, {
          title: item?.displayName,
          style: styles.displayName
        }), /*#__PURE__*/_jsx(CMText, {
          title: calculatorTime(item?.createdDate, languageLocal),
          style: [styles.textTimeComment, {
            marginLeft: horizontal(10)
          }]
        })]
      }), item?.isCreated && /*#__PURE__*/_jsx(View, {
        style: styles.actions,
        children: /*#__PURE__*/_jsx(TouchableDebounce, {
          onPress: () => {
            setItemEdit(item);
            setIsShowAction(!isShowAction);
          },
          children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
            icon: faEllipsisH
          })
        })
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.commentContent,
      children: [item?.fileId && /*#__PURE__*/_jsx(FastImage, {
        source: {
          uri: loadFile(item?.fileId)
        },
        resizeMode: "cover",
        style: styles.imageFileUpload
      }), /*#__PURE__*/_jsx(CMText, {
        title: `${he.decode(replaceHtml(item?.content ?? ''))}`,
        style: styles.textContent
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: [styles.boxAction, {
        marginTop: vertical(6)
      }],
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.boxItem,
        children: [/*#__PURE__*/_jsx(CMText, {
          title: (item?.totalLike ?? 0).toString(),
          style: styles.textComment
        }), /*#__PURE__*/_jsx(CMText, {
          i18nKey: "text-like",
          style: styles.textComment
        })]
      }), /*#__PURE__*/_jsx(TouchableDebounce, {
        style: styles.boxItem,
        onPress: () => {
          updateLikeTopic(item?.id);
        },
        children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: faThumbsUp,
          size: 20,
          style: [styles.iconComment, item?.isLiked === true && {
            color: Color.base_color
          }]
        })
      })]
    }), isShowAction && itemEdit?.id === item?.id && /*#__PURE__*/_jsx(RenderAction, {
      item: item,
      handleDelete: handleDelete,
      handleEdit: handleEdit
    })]
  });
  const handleEdit = () => {
    setIsShowAction(false);
    // setIsOpenModal(true);
    // fill lai text vao o checkbox
    setComment(itemEdit?.content);
  };
  const handleDelete = async () => {
    setIsShowAction(false);
    const response = await deleteClassTopic(itemEdit?.id);
    if (response?.status) {
      funcGetTopicInfo();
      setItemEdit();
    } else {
      dispatch(updateShowDialogWarnAction({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-notification',
        keyMessage: 'ext-action-false',
        contentMessage: '',
        isShowSubmit: false,
        isShowCancel: true,
        keyCancel: 'text-close'
      }));
    }
  };
  const RenderBottomAddClassTopic = useCallback(() => /*#__PURE__*/_jsx(BottomAddClassTopic, {
    isOpenModal: isOpenModal,
    handleSubmitTopic: event => {
      handleSubmitTopic(event);
    },
    closeModal: () => {
      setIsOpenModal(false);
    },
    item: itemEdit
  }), [isOpenModal]);
  const handleSubmitTopic = useCallback(async item => {
    // Check data truoc khi day len
    if (!item?.title || !item?.content || item?.title === '' || item?.content === '') {
      setTimeout(() => {
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
      }, 500);
    } else {
      // Call api đẩy dữ liệu lên
      const modelAdd = {
        id: item?.id,
        content: item?.content,
        title: item?.title
      };
      const response = await updateClassTopic(modelAdd);
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
        funcGetTopicInfo();
      } else {
        dispatch(updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-title-dialog-warn',
          keyMessage: 'text-internal-error',
          contentMessage: '',
          isShowCancel: false,
          isShowSubmit: false
        }));
      }
    }
  });
  const onCancelChange = () => {
    setItemEdit();
    setComment();
  };
  return /*#__PURE__*/_jsxs(KeyboardAvoidingView, {
    style: styles.container,
    keyboardVerticalOffset: isIOS && hasNotch() ? 0 : 10,
    behavior: isIOS ? 'padding' : 'height',
    children: [/*#__PURE__*/_jsx(SafeAreaView, {
      style: styles.container,
      children: /*#__PURE__*/_jsx(FlatList, {
        keyExtractor: (item, index) => index.toString(),
        data: listData,
        showsVerticalScrollIndicator: false,
        ListHeaderComponent: /*#__PURE__*/_jsx(HeaderTopicDetail, {
          onPostComment: event => {
            postComment(event);
          },
          classTopicInfo: classTopicInfo,
          contentInfo: contentInfo,
          handleBack: (type, index) => {
            onHandleBack(type, index);
          },
          data: data,
          type: type,
          onHandleGetData: () => {
            funcGetTopicInfo();
          },
          commentEdit: comment,
          handleCancel: () => {
            onCancelChange();
          }
        }),
        renderItem: ({
          item,
          index
        }) => renderComment(item, index),
        contentContainerStyle: styles.contentContainerStyle
      })
    }), /*#__PURE__*/_jsx(RenderBottomAddClassTopic, {})]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
  boxTopic: {
    marginTop: vertical(10)
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28
  },
  avatarProfile: {
    width: 40,
    height: 40,
    borderRadius: 40
  },
  displayName: {
    fontFamily: fonts.regular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
    marginLeft: horizontal(4)
  },
  textTime: {
    fontFamily: fonts.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    color: Color.text_color_hover
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: Color.text_color_hover,
    marginHorizontal: horizontal(8),
    marginVertical: vertical(6)
  },
  boxItem: {
    flexDirection: 'row'
  },
  boxItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vertical(7.5),
    borderTopColor: Color.color_width_featured_class,
    borderTopWidth: 1
  },
  topicContent: {
    marginTop: vertical(16)
  },
  topicAction: {
    marginTop: vertical(24)
  },
  boxItemAction: {
    flexDirection: 'row',
    marginHorizontal: horizontal(15)
  },
  iconAction: {
    marginRight: horizontal(5)
  },
  textInputComment: {
    borderRadius: 100,
    height: 44,
    borderWidth: 1,
    marginTop: vertical(5),
    marginBottom: vertical(10),
    borderColor: Color.color_uncheck_answer
  },
  boxAction: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconUserAction: {
    margin: 5,
    backgroundColor: Color.white
  },
  contentContainerStyle: {
    backgroundColor: Color.white
  },
  // style cho binh luan
  comment: {
    marginTop: vertical(16),
    marginLeft: horizontal(24),
    position: 'relative',
    zIndex: 0
  },
  commentContent: {
    marginTop: vertical(4)
  },
  textContent: {
    fontFamily: fonts.regular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8
  },
  textComment: {
    fontFamily: fonts.regular,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: Color.text_color_hover,
    marginRight: vertical(5)
  },
  textTimeComment: {
    fontFamily: fonts.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    color: Color.text_color_hover,
    marginTop: vertical(2)
  },
  iconComment: {
    marginTop: vertical(-1)
  },
  imageFileUpload: {
    height: screenHeight * 0.2,
    justifyContent: 'flex-start'
  },
  actions: {
    marginLeft: 'auto'
  },
  boxActions: {
    position: 'absolute',
    right: 2,
    top: 20,
    width: screenWidth * 0.3,
    borderRadius: 10,
    backgroundColor: Color.color_bg_tab_view,
    elevation: isIOS ? 0 : 1,
    borderWidth: 1,
    borderColor: Color.color_bg_tab_view,
    shadowColor: Color.gray,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    zIndex: 1
  },
  textAction: {
    fontFamily: fonts.regular,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: Color.text_color_hover,
    marginRight: vertical(5),
    paddingHorizontal: horizontal(5),
    paddingVertical: vertical(5)
  }
});
export default ClassTopicDetail;
//# sourceMappingURL=ClassTopicDetail.js.map