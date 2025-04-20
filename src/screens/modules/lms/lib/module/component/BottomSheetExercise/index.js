"use strict";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, View, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS, screenHeight, screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconCancel from '@assets/icons/icon_cancel.svg';
import IconFilter from '@assets/icons/icon_file.svg';
import IconUpload from '@assets/icons/icon_upload.svg';
import CMTextInput from '@components/CMTextInput';
import { Color } from '@theme/colors';
import { checkListEmpty, fileType } from '@utils/helpers';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import { uploadFile } from '@services/lms/upload.api';
import CMText from '@components/CMText';
import RenderViewTitle from '@components/RenderViewTitle';
import TouchableDebounce from '@components/TouchableDebounce';
import { hasNotch } from 'react-native-device-info';
import fonts from '@assets/value/fonts';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { submitContent } from "../../services/lmsclassuserexercise.api.js";
import { viewDetailExercise } from "../../services/lmsclassexercise.api.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PLACEHOLDER = {
  en: {
    placeholder: 'Enter content'
  },
  vn: {
    placeholder: 'Nhập nội dung'
  }
};
const RenderItemFile = ({
  item,
  index,
  onHandleRemoveFile
}) => /*#__PURE__*/_jsxs(View, {
  style: styles.viewItem,
  children: [/*#__PURE__*/_jsxs(View, {
    style: styles.viewContent,
    children: [/*#__PURE__*/_jsx(IconFilter, {
      width: 20,
      height: 20
    }), /*#__PURE__*/_jsx(CMText, {
      style: styles.titleFile,
      title: item?.fileName
    })]
  }), /*#__PURE__*/_jsx(TouchableDebounce, {
    onPress: () => {
      onHandleRemoveFile(index);
    },
    style: styles.buttonRemoveFile,
    children: /*#__PURE__*/_jsx(FontAwesomeIcon, {
      icon: faXmark
    })
  })]
});
const BottomSheetExercise = props => {
  const dispatch = useDispatch();
  const {
    isOpenModal,
    closeModal,
    handleApplyOnPress,
    idExercise
  } = props;
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const languageLocal = useSelector(state => state.global.language);
  const appColor = useSelector(state => state.global.appColor);
  const [enterContent, setEnterContent] = useState('');
  const [dataUpload, setDataUpload] = useState([]);
  const [viewHeight, setViewHeight] = useState(0);
  const [messageError, setMessageError] = useState();
  useEffect(() => {
    if (isOpenModal) {
      translateY.value = withTiming(0, {
        duration: 500
      }, () => {
        opacity.value = withTiming(1, {
          duration: 300
        });
      });
    } else {
      opacity.value = withTiming(0, {
        duration: 300
      }, () => {
        translateY.value = withTiming(screenHeight, {
          duration: 500
        });
      });
    }
  }, []);
  const translationStyles = useAnimatedStyle(() => ({
    transform: [{
      translateY: translateY.value
    }]
  }));
  const funcViewDetailExercise = async () => {
    const response = await viewDetailExercise(idExercise);
    if (response?.status && response?.data) {
      setEnterContent(response?.data?.content);
      if (response?.data?.fileId != null) {
        const lstFileId = response?.data?.fileId?.split(',');
        let dataFiles = dataUpload;
        lstFileId.forEach(e => {
          if (e) {
            const typeFile = fileType(e);
            const model = {
              fileName: e,
              fileType: typeFile
            };
            dataFiles = [model, ...dataFiles];
          }
        });
        setDataUpload(dataFiles);
      }
    }
  };
  useEffect(() => {
    funcViewDetailExercise();
  }, []);
  const opacityStyles = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));
  const onHandleApply = async () => {
    // id bài tập
    // content nội dung nhập
    let newFileId = '';
    if (dataUpload.length > 0) {
      newFileId = dataUpload.map(item => item.fileName).join(',');
    }
    const params = {
      classExerciseId: idExercise,
      content: enterContent,
      fileId: newFileId
    };
    const response = await submitContent(params);
    const dialogParams = {
      isShowModalWarn: true,
      isSigout: false,
      titleHeader: '',
      isShowCancel: false,
      isShowSubmit: false,
      keyCancel: 'text-button-submit'
    };
    if (response?.status) {
      dispatch(updateShowDialogWarnAction({
        ...dialogParams,
        keyHeader: 'text-tab-notification',
        keyMessage: 'text-submit-success-exercise',
        isShowCancel: true
      }));
    } else {
      dispatch(updateShowDialogWarnAction({
        ...dialogParams,
        keyHeader: 'text-title-dialog-warn',
        keyMessage: response?.message || 'text-action-false'
      }));
    }
    // if (response?.status) {
    //   dispatch(
    //     updateShowDialogWarnAction({
    //       isShowModalWarn: true,
    //       isSigout: false,
    //       titleHeader: '',
    //       keyHeader: 'text-tab-notification',
    //       keyMessage: 'text-submit-success-exercise',
    //       isShowCancel: true,
    //       isShowSubmit: false,
    //       keyCancel: 'text-button-submit',
    //     }),
    //   );
    // } else {
    //   if (response?.message) {
    //     dispatch(
    //       updateShowDialogWarnAction({
    //         isShowModalWarn: true,
    //         isSigout: false,
    //         titleHeader: '',
    //         keyHeader: 'text-title-dialog-warn',
    //         contentMessage: response?.message,
    //         isShowCancel: false,
    //         isShowSubmit: false,
    //         keyCancel: 'text-button-submit',
    //       }),
    //     );
    //   } else {
    //     dispatch(
    //       updateShowDialogWarnAction({
    //         isShowModalWarn: true,
    //         isSigout: false,
    //         titleHeader: '',
    //         keyHeader: 'text-title-dialog-warn',
    //         keyMessage: 'text-action-false',
    //         isShowCancel: false,
    //         isShowSubmit: false,
    //         keyCancel: 'text-button-submit',
    //       }),
    //     );
    //   }
    // }
    // callback reload data
    // checkDataCallBack();
  };
  const checkDataCallBack = () => {
    handleApplyOnPress();
    closeModal();
  };
  const getFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: Constant.presentationStyle
      });
      const formData = new FormData();
      formData.append('files', {
        uri: response[0].uri,
        type: response[0].type,
        name: response[0].name
      });
      // Xu ly cho loading tai day
      // call api uploadFile
      const responseUpload = await uploadFile(formData);
      if (responseUpload?.success) {
        let dataUploadNew = [...dataUpload];
        if (responseUpload?.data && responseUpload?.data.length > 0) {
          responseUpload?.data.forEach(e => {
            const typeFile = fileType(e.fileName);
            const model = {
              fileName: e.fileName,
              fileType: typeFile
            };
            dataUploadNew = [model, ...dataUploadNew];
          });
          setDataUpload(dataUploadNew);
        }
      } else if (responseUpload?.message) {
        setMessageError(responseUpload?.message);
        setTimeout(() => {
          setMessageError(null);
        }, 2000);
      }
    } catch (err) {
      // handle code here
    }
  };
  const onViewLayout = event => {
    const {
      height
    } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  /**
   * Xoá item file trong mảng.
   * @param {*} index
   */
  const onHandleRemoveFile = index => {
    const dataUploadNew = [...dataUpload];
    if (index >= 0) {
      dataUploadNew.splice(index, 1);
      setDataUpload(dataUploadNew);
    }
  };
  return /*#__PURE__*/_jsx(KeyboardAvoidingView, {
    style: styles.container,
    keyboardVerticalOffset: isIOS && hasNotch() ? 0 : 10,
    behavior: isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/_jsx(Modal, {
      supportedOrientations: ['portrait', 'landscape'],
      animationType: "fade",
      transparent: true,
      visible: isOpenModal,
      children: /*#__PURE__*/_jsxs(Animated.View, {
        style: [styles.viewButtonSheet, translationStyles],
        children: [/*#__PURE__*/_jsx(Animated.View, {
          style: [{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#0000004D'
          }, opacityStyles]
        }), /*#__PURE__*/_jsxs(TouchableDebounce, {
          style: {
            ...StyleSheet.absoluteFillObject
          },
          activeOpacity: 1,
          children: [/*#__PURE__*/_jsx(TouchableDebounce, {
            style: [styles.btnCancel, {
              bottom: viewHeight + vertical(10)
            }],
            onPress: closeModal,
            children: /*#__PURE__*/_jsx(IconCancel, {
              width: 24,
              height: 24
            })
          }), /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
            children: /*#__PURE__*/_jsx(View, {
              style: [styles.buttonSheet],
              onLayout: onViewLayout,
              children: /*#__PURE__*/_jsx(ScrollView, {
                scrollEnabled: true,
                bounces: false,
                showsVerticalScrollIndicator: false,
                style: styles.scrollView,
                children: /*#__PURE__*/_jsxs(TouchableDebounce, {
                  activeOpacity: 1,
                  children: [/*#__PURE__*/_jsx(RenderViewTitle, {
                    i18keyContext: "submit",
                    type: 1
                  }), /*#__PURE__*/_jsx(CMTextInput, {
                    textInputStyle: styles.textInput,
                    maxLength: 1000,
                    multiline: true,
                    placeholder: languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.vn.placeholder : PLACEHOLDER.en.placeholder,
                    onChangeText: enterContent => setEnterContent(enterContent),
                    value: enterContent
                  }), /*#__PURE__*/_jsxs(TouchableDebounce, {
                    onPress: getFile,
                    style: styles.block,
                    children: [/*#__PURE__*/_jsx(View, {
                      style: styles.viewIcon,
                      children: /*#__PURE__*/_jsx(IconUpload, {
                        width: 20,
                        height: 20
                      })
                    }), /*#__PURE__*/_jsx(CMText, {
                      style: styles.textUpfile,
                      i18nKey: "text-button-click-here-upload-file"
                    })]
                  }), checkListEmpty(dataUpload) && dataUpload.map((item, index) => /*#__PURE__*/_jsx(RenderItemFile, {
                    item: item,
                    index: index,
                    onHandleRemoveFile: onHandleRemoveFile
                  }, item.fileName)), messageError && /*#__PURE__*/_jsx(CMText, {
                    style: styles.textErrorMessage,
                    title: messageError ?? ''
                  }), /*#__PURE__*/_jsx(TouchableDebounce, {
                    style: [styles.btnApply, {
                      backgroundColor: appColor?.base_color
                    }],
                    onPress: () => {
                      checkDataCallBack();
                      onHandleApply();
                    },
                    children: /*#__PURE__*/_jsx(CMText, {
                      i18nKey: "submit",
                      style: styles.textBtnApply
                    })
                  })]
                })
              })
            })
          })]
        })]
      })
    })
  });
};
const styles = StyleSheet.create({
  viewButtonSheet: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: vertical(14),
    maxHeight: screenHeight * 0.7
  },
  btnCancel: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vertical(14),
    paddingHorizontal: vertical(14)
  },
  textTitle: {
    fontSize: textSize(20),
    color: Color.text_color,
    fontWeight: '700',
    lineHeight: 28
  },
  textDelete: {
    fontWeight: '400',
    color: Color.base_color,
    fontSize: textSize(12)
  },
  viewDots: {
    paddingHorizontal: horizontal(15)
  },
  btnApply: {
    backgroundColor: Color.base_color,
    height: 56,
    marginHorizontal: horizontal(14),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vertical(16),
    marginBottom: vertical(5)
  },
  textBtnApply: {
    fontSize: textSize(16),
    fontWeight: '700',
    color: Color.white
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    height: 240,
    textAlignVertical: 'top',
    paddingVertical: isIOS ? vertical(15) : vertical(5)
  },
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Color.color_bg_tab_view,
    borderWidth: 1,
    borderColor: Color.color_gray_bm,
    marginTop: vertical(16),
    marginHorizontal: horizontal(18),
    height: vertical(100)
  },
  viewIcon: {
    alignItems: 'center',
    padding: vertical(10)
  },
  titleFile: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: textSize(12),
    color: Color.color_check_answer,
    paddingHorizontal: horizontal(5),
    flexWrap: 'wrap'
  },
  iconFile: {
    marginLeft: 20,
    marginTop: 5
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: horizontal(18),
    flex: 1
  },
  textUpfile: {
    fontSize: textSize(14),
    fontWeight: '400',
    fontFamily: fonts.medium
  },
  viewContent: {
    flexDirection: 'row',
    width: screenWidth - 100
  },
  textErrorMessage: {
    fontSize: textSize(14),
    fontWeight: '400',
    fontFamily: fonts.medium,
    color: Color.red,
    marginTop: vertical(16),
    marginHorizontal: horizontal(18)
  },
  buttonRemoveFile: {
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1
  }
});
export default BottomSheetExercise;
//# sourceMappingURL=index.js.map