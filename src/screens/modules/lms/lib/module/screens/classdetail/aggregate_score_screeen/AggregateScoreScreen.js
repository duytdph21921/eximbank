"use strict";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';
import IconMark from '@assets/icons/icon_mark_a.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import Constant from '@utils/constants';
import { useDispatch } from 'react-redux';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { getMarkInfomation } from "../../../services/lmsclassuserlearning.api.js";
import { styles } from "./AggregateScoreScreen.styles.js";

/**
 * Render item aggregate score.
 */
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const ItemAggregate = ({
  item,
  navigation,
  classId
}) => /*#__PURE__*/_jsxs(TouchableDebounce, {
  style: styles.viewItemAggregate,
  onPress: () => {
    navigation.navigate(Constant.DETAIL_LEARNING_RESULT_SCREEN, {
      contentDetail: item,
      classId,
      classContentId: item?.id,
      isExercise: item.isExercise
    });
  },
  children: [/*#__PURE__*/_jsx(View, {
    style: styles.viewIcon,
    children: item?.markText != null && item?.markText !== '' ? /*#__PURE__*/_jsx(CMText, {
      title: `${item?.markText}`,
      style: styles.textScoreRequired
    }) : /*#__PURE__*/_jsx(IconMark, {
      width: 24,
      height: 24
    })
  }), /*#__PURE__*/_jsxs(View, {
    style: styles.viewContent,
    children: [/*#__PURE__*/_jsx(CMText, {
      title: item?.title ?? '',
      style: styles.textTitle
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.viewScore,
      children: [item?.markText != null && item?.markText !== '' && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(CMText, {
          title: `${item?.markText}`,
          style: styles.textScore,
          children: /*#__PURE__*/_jsx(CMText, {
            i18nKey: "text-score",
            style: styles.textScore
          })
        }), /*#__PURE__*/_jsx(View, {
          style: styles.viewVertical
        })]
      }), /*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-weight",
        style: styles.textScore,
        children: /*#__PURE__*/_jsx(CMText, {
          title: `${item?.weightScore}`,
          style: styles.textScore
        })
      })]
    }), /*#__PURE__*/_jsx(TouchableDebounce, {
      style: [styles.btnState, {
        backgroundColor: item?.status === 1 ? Color.color_pass : Color.color_text_progress_bar
      }],
      children: /*#__PURE__*/_jsx(CMText, {
        title: item?.statusName,
        style: styles.textStatus
      })
    })]
  })]
});
const AggregateScoreScreen = props => {
  const {
    navigation,
    route
  } = props;
  const isRefreshing = false;
  const [listAggregate, setListAggregate] = useState([]);
  const isMounteRef = useRef(false);
  const dispatch = useDispatch();
  const classId = route?.params?.classId;
  const renderHeaderRight = () => /*#__PURE__*/_jsx(View, {});
  const renderHeaderTitle = () => /*#__PURE__*/_jsx(CMText, {
    i18nKey: "text-header-aggegate-score",
    style: globalStyles.titleScreen
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, [navigation]);
  const funcGetMarkInfomation = async () => {
    const response = await getMarkInfomation(classId);
    if (response?.status && response?.data && isMounteRef.current) {
      setListAggregate(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetMarkInfomation();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  /**
   * handle refresh list notification.
   */
  const onRefresh = () => {};
  return /*#__PURE__*/_jsx(SafeAreaView, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(FlatList, {
      refreshControl: /*#__PURE__*/_jsx(RefreshControl, {
        refreshing: isRefreshing,
        onRefresh: onRefresh
      }),
      data: listAggregate,
      renderItem: ({
        item,
        index
      }) => /*#__PURE__*/_jsx(ItemAggregate, {
        item: item,
        index: index,
        navigation: navigation,
        classId: classId
      }),
      keyExtractor: (item, index) => index.toString(),
      showsVerticalScrollIndicator: false
    })
  });
};
export default AggregateScoreScreen;
//# sourceMappingURL=AggregateScoreScreen.js.map