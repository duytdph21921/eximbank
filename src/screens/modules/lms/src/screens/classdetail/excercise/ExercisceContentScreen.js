import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import IconFilter from '@assets/icons/icon_file.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import TouchableDebounce from '@components/TouchableDebounce';

const ExercisceContentScreen = (props) => {
  const { dataContent, dataArrayUrlExercise } = props;
  return (
    <View style={styles.boxList}>
      <View style={styles.boxItem}>
        <View>
          <CMText
            style={styles.title}
            i18nKey="text-tab-content-of-assignment"
          />
          <ScrollView
            scrollEnabled
            bounces={false}
            showsVerticalScrollIndicator
            style={styles.divided}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.container}>
                <TouchableDebounce activeOpacity={1}>
                  {dataArrayUrlExercise.map((value) => (
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
              <CMText style={styles.content} title={dataContent?.content} />
            </TouchableDebounce>
          </ScrollView>
        </View>
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
    marginVertical: vertical(20),
  },
  boxItem: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: Color.white,
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
    marginVertical: 10,
  },
  boxListClass: {
    flexDirection: 'row',
    columnGap: 8,
    justifyContent: 'space-between',
  },
  boxClassItem: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: Color.white,
    marginBottom: vertical(16),
    overflow: 'hidden',
  },
  titleFile: {
    fontSize: 16,
    marginLeft: 5,
    borderRadius: 8,
    marginBottom: 12,
    // shadowColor: Color.black,
    color: Color.color_check_answer,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 1,
    // backgroundColor: Color.transparents,
  },
  scrollView: {
    maxHeight: 120,
  },
  viewItem: {
    flexDirection: 'row',
    marginTop: vertical(5),
    flexWrap: 'wrap',
  },
});
export default React.memo(ExercisceContentScreen);
