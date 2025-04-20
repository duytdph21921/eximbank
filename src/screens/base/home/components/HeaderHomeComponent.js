/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import Constant from '@utils/constants';
import { isIOS, isTablet, screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconCalenda from '@assets/other/icon_calendar.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { changeColor, checkListEmpty } from '@utils/helpers';
import CarouselHome from './CarouselHome';
import ViewSeeAll from './ViewSeeAll';

const WIDTH_ITEM_LIST = isTablet ? 230 : 200;
const HEIGHT_ITEM_LIST = (WIDTH_ITEM_LIST * 256) / 200;
const WIDTH_IMAGE = WIDTH_ITEM_LIST - horizontal(10 * 2);
const HEIGHT_IMAGE = (WIDTH_IMAGE * 106) / 168;
const HEIGHT_ITEM = isTablet ? 80 : 56;

const HeaderHomeComponent = (props) => {
  const {
    listSlideBanner,
    listIndexLearning,
    listMyClass,
    listMyTest,
    listFeaturedClassCategory,
    navigation,
  } = props;

  const listIndexLearningNew = listIndexLearning.filter((item) => item.isShow);
  let resultLearning;

  if (listIndexLearningNew.length > 8) {
    resultLearning = listIndexLearningNew
      .slice(0, 7)
      .concat({ title: 'All', code: 'ALL', isShow: true });
  } else {
    resultLearning = listIndexLearningNew.slice(0, 8);
  }

  const ItemIndexLearning = ({ item, index }) =>
    item?.isShow && (
      <View style={styles.viewItemIndexLearning}>
        <TouchableDebounce
          style={[
            styles.viewItem,
            {
              backgroundColor: changeColor(Color.base_color),
            },
          ]}
        >
          <CMText
            style={[
              styles.textContent,
              {
                color: Color.base_color,
              },
            ]}
            title={`${index + 1}`}
          />
        </TouchableDebounce>
        <CMText title={item?.title} style={styles.textItemIndexLearning} />
      </View>
    );
  /**
   *  View item Danh sách lớp học.
   * @param {*} param0
   * @returns
   */
  const ItemMyClass = ({ item, index }) => (
    <LinearGradient
      colors={[Color.color_home_background, Color.color_home_background, Color.white]}
      style={styles.linearGradientMyClass}
    >
      <TouchableDebounce
        style={styles.viewItemMyClass}
        onPress={() => {
          navigation.navigate(Constant.LEARNING_STACK, {
            screen: Constant.CLASS_DETAIL_SCREEN,
            params: {
              id: item?.id,
              indexTab: 1,
            },
          });
        }}
      >
        <CustomImage style={styles.imageItemClass} source={item?.avatar} />
        <CMText title={item?.title} style={styles.textTitleMyClass} numberOfLines={2} />
        <View style={styles.viewDateItem}>
          {(item?.startDate !== '' || item?.endDate !== '') && (
            <IconCalenda width={16} height={16} />
          )}
          <CMText
            title={`${item?.startDate ?? ''}${item?.endDate ? ` - ${item?.endDate}` : ''}`}
            style={styles.textDateMyClass}
          />
        </View>
        <Progress.Bar
          progress={(item?.totalPercentLearning ?? 0) / 100}
          width={WIDTH_IMAGE}
          style={styles.viewProgress}
          color={Color.color_progress_bar}
          borderWidth={0}
        />
        <CMText i18nKey="text-complete-survey" style={styles.textProgress}>
          <CMText title={` ${item?.totalPercentLearning}%`} style={styles.textProgress} />
        </CMText>
      </TouchableDebounce>
    </LinearGradient>
  );
  /**
   * View item bài thi của tôi.
   * @param {*} param0
   * @returns
   */
  const ItemExam = ({ item, index }) => (
    <LinearGradient
      colors={[Color.color_home_background, Color.color_home_background, Color.white]}
      style={styles.linearGradientExam}
    >
      <TouchableDebounce
        style={styles.viewItemExam}
        onPress={() => {
          const newItem = { ...item, callBack: false };
          navigation.navigate(Constant.TEST_STACK, {
            screen: Constant.MY_TEST_INFORMATION_SCREEN,
            params: newItem,
          });
        }}
      >
        <View
          style={[
            styles.viewTitleExam,
            {
              borderColor: Color.base_color,
            },
          ]}
        >
          <CMText style={styles.textTitleExam} title={item?.title} />
        </View>
        <CMText style={styles.textMark} i18nKey="text-title-mark">
          <CMText style={styles.textMark} title={`${item?.minMark} `} />
          <CMText style={styles.textMark} i18nKey="text-score" />
        </CMText>
        <CMText style={styles.textDateExam} title={`${item?.startDate} - ${item?.endDate}`} />
      </TouchableDebounce>
    </LinearGradient>
  );
  /**
   * View item danh mục lớp học nổi bật
   * @param {*} param0
   * @returns
   */
  const ItemFeaturedClass = ({ item, index }) => (
    <TouchableDebounce
      style={[
        styles.itemFeaturedClass,
        {
          marginRight: index + 1 === 5 ? horizontal(15) : 0,
        },
      ]}
      onPress={() => {
        navigation.navigate(Constant.SEARCH_CLASS_BY_CATEGORY, {
          classCategory: item,
        });
      }}
    >
      <CMText title={item?.title} style={styles.textFeaturedClass} />
    </TouchableDebounce>
  );
  return (
    <View style={styles.container}>
      <CarouselHome listSlideBanner={listSlideBanner} />
      {checkListEmpty(resultLearning) && (
        <View style={styles.viewListIndexLearning}>
          <FlatList
            data={resultLearning}
            renderItem={({ item, index }) => <ItemIndexLearning item={item} index={index} />}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={4}
            contentContainerStyle={{ flexDirection: 'row' }}
          />
        </View>
      )}
      {checkListEmpty(listMyClass) && (
        <View style={styles.boxMyClass}>
          <ViewSeeAll
            i18nKey="text-title-my-class"
            onPressSeeAll={() => {
              navigation.navigate(Constant.LEARNING_STACK, {
                screen: Constant.STUDY_SCREEN,
              });
            }}
          />
          <FlatList
            data={listMyClass}
            renderItem={({ item, index }) => <ItemMyClass item={item} index={index} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      {checkListEmpty(listMyTest) && (
        <View>
          <ViewSeeAll
            i18nKey="text-title-my-exam"
            onPressSeeAll={() => {
              navigation.navigate(Constant.TEST_STACK, {
                screen: Constant.MY_TEST_SCREEN,
              });
            }}
          />
          <FlatList
            data={listMyTest}
            renderItem={({ item, index }) => <ItemExam item={item} index={index} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      {checkListEmpty(listFeaturedClassCategory) && (
        <View>
          <ViewSeeAll
            i18nKey="text-list-featured-classes"
            onPressSeeAll={() => {
              navigation.navigate(Constant.USER_STACK, {
                screen: Constant.CLASS_CATEGORY_SCREEN,
              });
            }}
          />
          <FlatList
            data={listFeaturedClassCategory}
            renderItem={({ item, index }) => <ItemFeaturedClass item={item} index={index} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: vertical(15),
  },
  viewListIndexLearning: {
    flexDirection: 'row',
    marginHorizontal: horizontal(20),
  },
  viewItemIndexLearning: {
    marginBottom: vertical(10),
  },
  textItemIndexLearning: {
    fontSize: textSize(14),
    fontWeight: '500',
    color: Color.text_color,
    alignSelf: 'center',
  },
  linearGradientMyClass: {
    flex: 1,
    margin: horizontal(10),
    paddingTop: horizontal(10),
    borderRadius: 16,
  },
  viewItem: {
    backgroundColor: Color.color_bg_item_home,
    width: HEIGHT_ITEM,
    height: HEIGHT_ITEM,
    marginHorizontal: (screenWidth - HEIGHT_ITEM * 4 - horizontal(20 * 2)) / 8,
    borderRadius: HEIGHT_ITEM / 2,
    marginVertical: vertical(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    fontSize: textSize(18),
    fontWeight: '700',
    color: Color.base_color,
    textAlign: 'center',
    lineHeight: isIOS ? 0 : 18,
  },
  textContentType: {
    fontSize: textSize(12),
    fontWeight: '400',
    color: Color.color_text_item,
    alignSelf: 'center',
  },
  viewItemMyClass: {
    height: HEIGHT_ITEM_LIST,
    width: WIDTH_ITEM_LIST,
    flex: 1,
  },
  imageItemClass: {
    height: HEIGHT_IMAGE,
    width: WIDTH_IMAGE,
    alignSelf: 'center',
    borderRadius: 8,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizontal(20),
    paddingVertical: vertical(5),
  },
  textMyClass: {
    fontSize: textSize(18),
    fontWeight: '700',
    color: Color.text_color,
    lineHeight: textSize(20),
  },
  textSeeAll: {
    fontSize: 10,
    fontWeight: '400',
    color: Color.base_color,
  },
  textTitleMyClass: {
    marginHorizontal: (WIDTH_ITEM_LIST - WIDTH_IMAGE) / 2,
    fontSize: textSize(12),
    fontWeight: '700',
    color: Color.text_color,
    marginTop: vertical(10),
    height: vertical(35),
  },
  viewDateItem: {
    flexDirection: 'row',
    marginHorizontal: (WIDTH_ITEM_LIST - WIDTH_IMAGE) / 2,
    marginTop: vertical(5),
  },
  textDateMyClass: {
    fontSize: textSize(10),
    fontWeight: '400',
    color: Color.text_color,
    lineHeight: 16,
    paddingHorizontal: horizontal(5),
    fontFamily: fonts.regular,
  },
  viewProgress: {
    marginTop: vertical(10),
    backgroundColor: Color.color_bg_progress_bar,
    alignSelf: 'center',
  },
  textProgress: {
    fontSize: textSize(10),
    fontWeight: '600',
    color: Color.color_text_progress_bar,
    marginHorizontal: (WIDTH_ITEM_LIST - WIDTH_IMAGE) / 2,
    marginTop: vertical(5),
  },
  linearGradientExam: {
    flex: 1,
    margin: horizontal(10),
    paddingVertical: horizontal(10),
    borderRadius: 16,
  },
  viewItemExam: {
    width: isTablet ? screenWidth * 0.4 : screenWidth * 0.6,
  },
  viewTitleExam: {
    borderLeftWidth: isTablet ? 3 : 2,
    borderColor: Color.base_color,
    height: vertical(40),
  },
  textTitleExam: {
    fontSize: textSize(12),
    fontWeight: '700',
    color: Color.text_color,
    marginHorizontal: horizontal(15),
  },
  textMark: {
    fontSize: textSize(10),
    color: Color.text_color_hover,
    marginHorizontal: horizontal(15),
  },
  textDateExam: {
    fontSize: textSize(10),
    color: Color.text_color_hover,
    marginHorizontal: horizontal(15),
  },
  viewFeaturedClass: {
    flexDirection: 'row',
    marginHorizontal: horizontal(20),
  },
  itemFeaturedClass: {
    backgroundColor: Color.color_bg_featured_class,
    borderWidth: 1,
    borderColor: Color.color_width_featured_class,
    borderRadius: 100,
    paddingHorizontal: horizontal(25),
    marginLeft: horizontal(10),
    marginVertical: vertical(10),
  },
  textFeaturedClass: {
    fontSize: textSize(12),
    fontWeight: '600',
    color: Color.text_color,
    paddingVertical: isTablet ? vertical(10) : vertical(5),
  },
  boxMyClass: {
    marginTop: vertical(15),
  },
});
export default HeaderHomeComponent;
