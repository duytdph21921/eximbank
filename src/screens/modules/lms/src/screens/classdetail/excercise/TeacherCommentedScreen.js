import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import IconFilter from '@assets/icons/icon_file.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import TouchableDebounce from '@components/TouchableDebounce';
import { screenHeight } from '@utils/platforms';

const TeacherCommentedScreen = (props) => {
  const { teacherComment, dataArrayUrlTeacherComment } = props;
  return (
    <View style={styles.boxList}>
      <View style={styles.boxItem}>
        <TouchableDebounce activeOpacity={1}>
          <CMText
            style={styles.title}
            i18nKey="text-button-exercise-comments"
          />
          {teacherComment?.mark && (
            <CMText style={styles.score} i18nKey="text_mark_score">
              <CMText
                style={styles.score}
                title={`: ${teacherComment?.mark ?? 0} `}
              >
                <CMText style={styles.score} i18nKey="text-button-score" />
              </CMText>
            </CMText>
          )}
          <ScrollView
            scrollEnabled
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={styles.divided}
          >
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.container}>
                  <TouchableDebounce activeOpacity={1}>
                    {dataArrayUrlTeacherComment.map((value) => (
                      <View key={value} style={styles.viewItem}>
                        <IconFilter
                          style={styles.iconFile}
                          width={20}
                          height={20}
                        />
                        <CMText
                          title={value.split('/').pop()}
                          style={styles.titleFile}
                        />
                      </View>
                    ))}
                  </TouchableDebounce>
                </View>
              </View>
              <TouchableDebounce activeOpacity={1}>
                <CMText
                  style={styles.content}
                  title={teacherComment?.comment}
                />
              </TouchableDebounce>
            </View>
          </ScrollView>
        </TouchableDebounce>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: vertical(20),
  },
  contentBox: {
    paddingHorizontal: horizontal(20),
  },
  boxList: {
    flexDirection: 'column',
    columnGap: 16,
    justifyContent: 'space-between',
  },
  divided: {
    borderTopColor: Color.color_width_featured_class,
    borderTopWidth: 1,
    height: screenHeight / 4,
  },
  boxItem: {
    borderRadius: 16,
    padding: 16,
    color: Color.white,
    marginBottom: vertical(16),
  },
  dateTime: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
    marginBottom: vertical(4),
  },
  title: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 23.8,
    marginBottom: vertical(4),
  },
  content: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
    color: Color.text_color_hover,
  },
  boxListClass: {
    flexDirection: 'row',
    columnGap: 8,
    justifyContent: 'space-between',
  },
  boxClassItem: {
    borderRadius: 16,
    padding: 16,
    color: Color.white,
    marginBottom: vertical(16),
    overflow: 'hidden',
  },
  titleFile: {
    paddingVertical: 7,
    fontSize: 16,
    color: Color.color_check_answer,
    marginLeft: 5,
  },
  score: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 23.8,
    color: Color.color_not_pass,
    marginVertical: 15,
  },
  scrollView: {
    maxHeight: 120,
  },
  viewItem: {
    flexDirection: 'row',
    marginTop: vertical(5),
  },
});
export default React.memo(TeacherCommentedScreen);
