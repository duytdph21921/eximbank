"use strict";

/* eslint-disable global-require */
/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet, ScrollView, TouchableNativeFeedback } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight, faEllipsisH, faThumbsUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import { Color } from '@theme/colors';
import he from 'he';
import CMText from '@components/CMText';
import FastImage from 'react-native-fast-image';
import TouchableDebounce from '@components/TouchableDebounce';
import CMTextInput from '@components/CMTextInput';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import { useDispatch, useSelector } from 'react-redux';
import { loadFile, replaceHtml } from '@utils/helpers';
import Constant from '@utils/constants';
import { screenHeight, screenWidth } from '@utils/platforms';
import DocumentPicker from 'react-native-document-picker';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import { uploadFile } from '@services/lms/upload.api';
import IconMessage from '@assets/icons/message-text.svg';
import IconSmile from '@assets/icons/mood-smile.svg';
import IconImageUpload from '@assets/icons/image-upload.svg';
import IconSendMessage from '@assets/icons/send-message.svg';
import { deleteClassTopic, updateClassTopic, updateLike } from "../../../services/lmsclasstopic.api.js";
import BottomAddClassTopic from "../../../component/BottomAddClassTopic/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PLACEHOLDER = {
  en: {
    comment: 'Comment'
  },
  vn: {
    comment: 'Thảo luận'
  }
};
const HeaderTopicDetail = props => {
  const {
    classTopicInfo,
    contentInfo,
    data,
    onPostComment,
    handleBack,
    type,
    onHandleGetData,
    commentEdit,
    handleCancel
  } = props;
  const languageLocal = useSelector(state => state.global.language);
  const [comment, setComment] = useState('');
  const [isEmojiComment, setIsEmojiComment] = useState(false);
  const [title, setTitle] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [listFileUploaded, setListFileUploaded] = useState();
  const [isShowAction, setIsShowAction] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [topicInfo, setTopicInfo] = useState();
  const [isEditComment, setIsEditComment] = useState();
  const [size, setSize] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let lengthMax = 45;
    if (contentInfo) {
      lengthMax = 20;
      let newTitle = contentInfo?.title ?? '';
      if (newTitle.length > lengthMax) {
        newTitle = `${newTitle.slice(0, lengthMax)}...`;
      }
      setContentTitle(newTitle);
    }
    if (classTopicInfo) {
      let newTitle = classTopicInfo?.title ?? '';
      if (newTitle.length > lengthMax) {
        newTitle = `${newTitle.slice(0, lengthMax)}...`;
      }
      setTitle(newTitle);
    }
    setTopicInfo(classTopicInfo);
    if (commentEdit) {
      setComment(commentEdit);
      setIsEditComment(true);
    }
  }, [commentEdit]);
  const onHandleBack = (index = 0) => {
    handleBack(type, index);
  };
  const postComment = () => {
    const model = {
      comment,
      fileId: listFileUploaded?.fileName
    };
    onPostComment(model);
    setComment('');
    setIsEmojiComment(false);
    setListFileUploaded();
    setIsEditComment(false);
  };
  const updateLikeTopic = async id => {
    if (id) {
      const response = await updateLike(id);
      if (response?.status) {
        onHandleGetData();
      }
    }
  };
  const handleSetCommentEmoji = emoji => {
    let newComment = comment;
    newComment += ` ${emoji}`;
    setComment(newComment);
  };
  const getFileUpload = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: Constant.presentationStyle
      });
      const lstFile = [];
      if (response && response.length > 0) {
        response.forEach(e => {
          if (e.type === 'image/jpeg') {
            lstFile.push({
              uri: e.uri,
              type: e.type,
              name: e.name
            });
          }
        });
      }
      if (lstFile.length > 0) {
        const formData = new FormData();
        lstFile.forEach(e => {
          formData.append('files', e);
        });
        const responseUpload = await uploadFile(formData);
        if (responseUpload?.success) {
          if (responseUpload?.data && responseUpload?.data.length > 0) {
            const model = {
              fileName: responseUpload?.data[0].fileName
            };
            setListFileUploaded(model);
          }
        } else {
          // Sau se thong bao tai day
        }
      } else {
        dispatch(updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-title-dialog-warn',
          keyMessage: 'text-warning-allow-file-upload',
          contentMessage: '',
          isShowCancel: false,
          isShowSubmit: false
        }));
      }
    } catch {
      // handle error here
    }
  };
  const handleEdit = () => {
    setIsShowAction(false);
    setIsOpenModal(true);
  };
  const handleDelete = async () => {
    setIsShowAction(false);
    const response = await deleteClassTopic(topicInfo?.id);
    if (response?.status) {
      onHandleBack();
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
    item: topicInfo
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
        const newTopicInfo = {
          ...topicInfo,
          content: response?.data?.content,
          title: response?.data?.title
        };
        setTopicInfo(newTopicInfo);
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
  const RenderAction = useCallback(() => /*#__PURE__*/_jsxs(View, {
    style: styles.boxActions,
    children: [/*#__PURE__*/_jsx(TouchableNativeFeedback, {
      onPress: () => {
        handleEdit();
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
  }));
  const onCancelChange = () => {
    setComment('');
    setIsEditComment(false);
    handleCancel();
  };
  const onLayout = useCallback(event => {
    const {
      width,
      height
    } = event.nativeEvent.layout;
    setSize({
      width,
      height
    });
  }, []);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.header,
      children: [/*#__PURE__*/_jsx(TouchableDebounce, {
        onPress: () => {
          onHandleBack();
        },
        children: contentInfo ? /*#__PURE__*/_jsx(CMText, {
          i18nKey: "text-class-topic-content",
          style: styles.textHeader
        }) : /*#__PURE__*/_jsx(CMText, {
          i18nKey: "text-class-topic-general",
          style: styles.textHeader
        })
      }), contentInfo && /*#__PURE__*/_jsxs(TouchableDebounce, {
        style: styles.header,
        onPress: () => {
          onHandleBack(1);
        },
        children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
          icon: faAngleRight,
          style: styles.iconFaAngleRight,
          size: 10
        }), /*#__PURE__*/_jsx(CMText, {
          title: contentTitle,
          style: styles.textHeader
        })]
      }), /*#__PURE__*/_jsx(FontAwesomeIcon, {
        icon: faAngleRight,
        style: styles.iconFaAngleRight,
        size: 10
      }), /*#__PURE__*/_jsx(CMText, {
        title: title,
        style: styles.textHeader
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.boxTopic,
      children: [/*#__PURE__*/_jsx(View, {
        style: {
          marginBottom: vertical(8)
        },
        children: /*#__PURE__*/_jsx(CMText, {
          title: topicInfo?.title,
          style: styles.title
        })
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.boxItem,
        children: [classTopicInfo?.avatar ? /*#__PURE__*/_jsx(FastImage, {
          source: {
            uri: loadFile(classTopicInfo?.avatar)
          },
          resizeMode: "contain",
          style: styles.avatarProfile
        }) : /*#__PURE__*/_jsx(FastImage, {
          source: require('@assets/img/avatar-detail.png'),
          resizeMode: "contain",
          style: styles.avatarProfile
        }), /*#__PURE__*/_jsxs(View, {
          children: [/*#__PURE__*/_jsx(CMText, {
            title: classTopicInfo?.displayName,
            style: styles.displayName
          }), /*#__PURE__*/_jsxs(View, {
            style: [styles.boxItem, {
              marginLeft: horizontal(4)
            }],
            children: [/*#__PURE__*/_jsx(CMText, {
              title: classTopicInfo?.createdDateString ?? '',
              style: styles.textTime
            }), /*#__PURE__*/_jsx(View, {
              style: styles.dot
            }), /*#__PURE__*/_jsx(CMText, {
              title: (data?.totalComment ?? 0).toString(),
              style: styles.textTime
            }), /*#__PURE__*/_jsx(CMText, {
              i18nKey: "text-comment",
              style: styles.textTime
            })]
          })]
        }), data?.isCreated && /*#__PURE__*/_jsx(View, {
          style: styles.actions,
          children: /*#__PURE__*/_jsx(TouchableDebounce, {
            onPress: () => {
              setIsShowAction(!isShowAction);
            },
            children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
              icon: faEllipsisH
            })
          })
        })]
      }), /*#__PURE__*/_jsx(View, {
        style: styles.topicContent,
        children: /*#__PURE__*/_jsx(CMText, {
          title: `${he.decode(replaceHtml(topicInfo?.content ?? ''))}`,
          style: styles.textContent
        })
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.topicAction,
        children: [/*#__PURE__*/_jsxs(View, {
          style: styles.boxItemInfo,
          children: [/*#__PURE__*/_jsxs(View, {
            style: styles.boxItemAction,
            children: [/*#__PURE__*/_jsx(CMText, {
              title: (data?.totalLike ?? 0).toString(),
              style: styles.textTime
            }), /*#__PURE__*/_jsx(CMText, {
              i18nKey: "text-total-like",
              style: styles.textTime
            })]
          }), /*#__PURE__*/_jsxs(View, {
            style: styles.boxItemAction,
            children: [/*#__PURE__*/_jsx(CMText, {
              title: (data?.totalComment ?? 0).toString(),
              style: styles.textTime
            }), /*#__PURE__*/_jsx(CMText, {
              i18nKey: "text-comment",
              style: styles.textTime
            })]
          })]
        }), /*#__PURE__*/_jsxs(View, {
          style: styles.boxItemInfo,
          children: [/*#__PURE__*/_jsxs(TouchableDebounce, {
            style: styles.boxItemAction,
            onPress: () => {
              updateLikeTopic(data?.id);
            },
            children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
              icon: faThumbsUp,
              style: [styles.iconAction, data?.isLiked === true && {
                color: Color.base_color
              }],
              size: 24
            }), /*#__PURE__*/_jsx(CMText, {
              i18nKey: "text-like",
              style: styles.displayName
            })]
          }), /*#__PURE__*/_jsxs(View, {
            style: styles.boxItemAction,
            children: [/*#__PURE__*/_jsx(IconMessage, {
              width: 24,
              height: 24
            }), /*#__PURE__*/_jsx(CMText, {
              i18nKey: "text-comments",
              style: styles.displayName
            })]
          })]
        }), /*#__PURE__*/_jsxs(View, {
          style: styles.boxAllAction,
          children: [listFileUploaded && /*#__PURE__*/_jsxs(View, {
            children: [/*#__PURE__*/_jsx(FastImage, {
              source: {
                uri: loadFile(listFileUploaded?.fileName)
              },
              resizeMode: "contain",
              style: styles.imageFileUpload
            }), /*#__PURE__*/_jsx(TouchableDebounce, {
              onPress: () => {
                setListFileUploaded();
              },
              style: styles.deleteImage,
              children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
                icon: faTimesCircle,
                size: 24
              })
            })]
          }), /*#__PURE__*/_jsxs(View, {
            children: [/*#__PURE__*/_jsx(CMTextInput, {
              placeholder: languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.vn.comment : PLACEHOLDER.en.comment,
              returnKeyType: "next",
              onSubmitEditing: () => {
                postComment();
              },
              blurOnSubmit: false,
              onChangeText: comment => {
                setComment(comment);
              },
              value: comment,
              textInputStyle: [styles.textInputComment, {
                paddingRight: size?.width
              }]
            }), /*#__PURE__*/_jsxs(View, {
              style: styles.boxActionInput,
              onLayout: onLayout,
              children: [isEditComment && /*#__PURE__*/_jsx(TouchableDebounce, {
                onPress: () => {
                  onCancelChange();
                },
                children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
                  size: 20,
                  style: [styles.iconUserAction, {
                    marginTop: vertical(3)
                  }],
                  icon: faTimesCircle
                })
              }), /*#__PURE__*/_jsx(TouchableDebounce, {
                onPress: () => {
                  setIsEmojiComment(!isEmojiComment);
                },
                children: /*#__PURE__*/_jsx(IconSmile, {
                  width: 24,
                  height: 24,
                  style: styles.iconUserAction
                })
              }), /*#__PURE__*/_jsx(TouchableDebounce, {
                onPress: () => {
                  getFileUpload();
                },
                children: /*#__PURE__*/_jsx(IconImageUpload, {
                  width: 24,
                  height: 24,
                  style: styles.iconUserAction
                })
              }), /*#__PURE__*/_jsx(TouchableDebounce, {
                onPress: () => {
                  postComment();
                },
                children: /*#__PURE__*/_jsx(IconSendMessage, {
                  width: 24,
                  height: 24,
                  style: styles.iconUserAction
                })
              })]
            })]
          }), isEmojiComment && /*#__PURE__*/_jsx(ScrollView, {
            style: {
              height: screenHeight * 0.3
            },
            scrollEnabled: true,
            nestedScrollEnabled: true,
            showsVerticalScrollIndicator: false,
            children: /*#__PURE__*/_jsx(EmojiSelector, {
              onEmojiSelected: emoji => handleSetCommentEmoji(emoji),
              showSearchBar: false,
              showTabs: false,
              category: Categories.emotion,
              showSectionTitles: false,
              style: styles.boxEmoji,
              columns: 8
            })
          })]
        })]
      }), isShowAction && /*#__PURE__*/_jsx(RenderAction, {})]
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
    flexDirection: 'row',
    position: 'relative',
    zIndex: 0
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
    marginTop: vertical(2),
    backgroundColor: Color.white,
    marginRight: vertical(5)
  },
  contentContainerStyle: {
    backgroundColor: Color.white
  },
  // style cho binh luan
  comment: {
    marginTop: vertical(16),
    marginLeft: horizontal(24)
  },
  commentContent: {
    marginTop: vertical(4)
  },
  textContent: {
    fontFamily: fonts.medium,
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
  boxActionInput: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 7.5,
    backgroundColor: Color.white,
    height: 41,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    paddingVertical: vertical(5)
  },
  boxAllAction: {
    position: 'relative'
  },
  boxEmoji: {
    // position: "absolute",
    bottom: 0
  },
  imageFileUpload: {
    width: screenWidth,
    height: 100
  },
  deleteImage: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  actions: {
    marginLeft: 'auto',
    position: 'relative'
  },
  boxActions: {
    position: 'absolute',
    right: 2,
    top: 60,
    width: screenWidth * 0.3,
    borderRadius: 10,
    backgroundColor: Color.white,
    elevation: 1,
    borderWidth: 1,
    borderColor: Color.color_bg_tab_view,
    shadowColor: Color.gray,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    flex: 1,
    zIndex: 1
  },
  textAction: {
    fontFamily: fonts.regular,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: Color.text_color_hover,
    marginRight: vertical(5),
    padding: 5
  }
});
export default HeaderTopicDetail;
//# sourceMappingURL=HeaderTopicDetail.js.map