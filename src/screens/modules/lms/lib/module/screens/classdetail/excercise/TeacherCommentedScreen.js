"use strict";

import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import IconFilter from '@assets/icons/icon_file.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import TouchableDebounce from '@components/TouchableDebounce';
import { screenHeight } from '@utils/platforms';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TeacherCommentedScreen = props => {
  const {
    teacherComment,
    dataArrayUrlTeacherComment
  } = props;
  return /*#__PURE__*/_jsx(View, {
    style: styles.boxList,
    children: /*#__PURE__*/_jsx(View, {
      style: styles.boxItem,
      children: /*#__PURE__*/_jsxs(TouchableDebounce, {
        activeOpacity: 1,
        children: [/*#__PURE__*/_jsx(CMText, {
          style: styles.title,
          i18nKey: "text-button-exercise-comments"
        }), teacherComment?.mark && /*#__PURE__*/_jsx(CMText, {
          style: styles.score,
          i18nKey: "text_mark_score",
          children: /*#__PURE__*/_jsx(CMText, {
            style: styles.score,
            title: `: ${teacherComment?.mark ?? 0} `,
            children: /*#__PURE__*/_jsx(CMText, {
              style: styles.score,
              i18nKey: "text-button-score"
            })
          })
        }), /*#__PURE__*/_jsx(ScrollView, {
          scrollEnabled: true,
          bounces: false,
          showsVerticalScrollIndicator: false,
          style: styles.divided,
          children: /*#__PURE__*/_jsxs(View, {
            children: [/*#__PURE__*/_jsx(View, {
              style: {
                flexDirection: 'row'
              },
              children: /*#__PURE__*/_jsx(View, {
                style: styles.container,
                children: /*#__PURE__*/_jsx(TouchableDebounce, {
                  activeOpacity: 1,
                  children: dataArrayUrlTeacherComment.map(value => /*#__PURE__*/_jsxs(View, {
                    style: styles.viewItem,
                    children: [/*#__PURE__*/_jsx(IconFilter, {
                      style: styles.iconFile,
                      width: 20,
                      height: 20
                    }), /*#__PURE__*/_jsx(CMText, {
                      title: value.split('/').pop(),
                      style: styles.titleFile
                    })]
                  }, value))
                })
              })
            }), /*#__PURE__*/_jsx(TouchableDebounce, {
              activeOpacity: 1,
              children: /*#__PURE__*/_jsx(CMText, {
                style: styles.content,
                title: teacherComment?.comment
              })
            })]
          })
        })]
      })
    })
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: vertical(20)
  },
  contentBox: {
    paddingHorizontal: horizontal(20)
  },
  boxList: {
    flexDirection: 'column',
    columnGap: 16,
    justifyContent: 'space-between'
  },
  divided: {
    borderTopColor: Color.color_width_featured_class,
    borderTopWidth: 1,
    height: screenHeight / 4
  },
  boxItem: {
    borderRadius: 16,
    padding: 16,
    color: Color.white,
    marginBottom: vertical(16)
  },
  dateTime: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
    marginBottom: vertical(4)
  },
  title: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 23.8,
    marginBottom: vertical(4)
  },
  content: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
    color: Color.text_color_hover
  },
  boxListClass: {
    flexDirection: 'row',
    columnGap: 8,
    justifyContent: 'space-between'
  },
  boxClassItem: {
    borderRadius: 16,
    padding: 16,
    color: Color.white,
    marginBottom: vertical(16),
    overflow: 'hidden'
  },
  titleFile: {
    paddingVertical: 7,
    fontSize: 16,
    color: Color.color_check_answer,
    marginLeft: 5
  },
  score: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 23.8,
    color: Color.color_not_pass,
    marginVertical: 15
  },
  scrollView: {
    maxHeight: 120
  },
  viewItem: {
    flexDirection: 'row',
    marginTop: vertical(5)
  }
});
export default /*#__PURE__*/React.memo(TeacherCommentedScreen);
//# sourceMappingURL=TeacherCommentedScreen.js.map