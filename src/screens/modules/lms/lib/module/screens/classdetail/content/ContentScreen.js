"use strict";

/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, View } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { GetTypeContent } from '@utils/helpers';
import TreeViewCustom from '@components/TreeViewCustom';
import { Color } from '@theme/colors';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import { frUserJoinClassNew } from "../../../services/lmsclass.api.js";
import { frGetByClassId, frUserCanViewNew } from "../../../services/lmsclasscontent.api.js";
import { jsx as _jsx } from "react/jsx-runtime";
const ContentScreen = props => {
  const {
    classInfo,
    navigation,
    index,
    setIndex
  } = props;
  const [classContents, setClassContent] = useState([]);
  const [classUserInfo, setClassUser] = useState();
  const dispatch = useDispatch();
  const isMounteRef = useRef(false);
  const getData = async () => {
    const model = {
      classId: classInfo?.id
    };
    if (index === 1) {
      const response = await frGetByClassId(model);
      if (response?.status) {
        setClassContent(response?.data);
      }
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    getData();
    return () => {
      isMounteRef.current = false;
    };
  }, [index]);
  const funcFrUserJoinClassNew = async () => {
    const response = await frUserJoinClassNew(classInfo?.id);
    if (response?.status && response?.data && isMounteRef.current) {
      setClassUser(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (index === 1 && classInfo?.id) {
      funcFrUserJoinClassNew();
    }
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const onViewClassContent = async content => {
    if (classInfo?.isNotStartClass) {
      dispatch(updateShowDialogWarnAction({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-title-dialog-warn',
        keyMessage: 'text-warning-class-not-start',
        contentMessage: '',
        keyCancel: 'text-close',
        isShowCancel: true,
        isShowSubmit: false
      }));
      return;
    }
    const response = await frUserCanViewNew(classUserInfo?.id, content?.id);
    if (response?.status && response?.data) {
      if (content?.typeId === GetTypeContent.survey) {
        navigation.navigate(Constant.SURVEY_SCREEN, {
          content,
          classId: classInfo.id,
          learningId: response?.data?.userLearning?.id,
          classInfo
        });
      } else if (content?.typeId === GetTypeContent.test) {
        navigation.navigate(Constant.MY_TEST_IN_CLASS_INFORMATION_SCREEN, {
          content,
          classUserId: classUserInfo?.id,
          classId: classInfo.id,
          learningId: response?.data?.userLearning?.id,
          classInfo
        });
      } else if (content?.typeId === GetTypeContent.exercise) {
        // navigation.navigate(Constant.CLASS_DETAIL_SCREEN, {
        //   id: classInfo.id,
        //   indexTab: 2,
        // });
        setIndex(2);
      } else {
        navigation.navigate(Constant.CLASS_CONTENT_VIEW_SCREEN, {
          classId: classInfo.id,
          content,
          classUser: classUserInfo,
          learning: response?.data?.userLearning,
          classInfo
        });
      }
    } else {
      dispatch(updateShowDialogWarnAction({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-title-dialog-warn',
        keyMessage: 'text-class-content-not-learn',
        contentMessage: '',
        keyCancel: 'text-close',
        isShowCancel: true,
        isShowSubmit: false
      }));
    }
  };
  // useFocusEffect(
  //   useCallback(() => {
  //     getData();
  //   }, [])
  // );
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(TreeViewCustom, {
      data: classContents,
      childrenKey: "childs",
      onViewClassContent: onViewClassContent
    })
  });
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.red,
    flex: 1
  }
});
export default ContentScreen;
//# sourceMappingURL=ContentScreen.js.map