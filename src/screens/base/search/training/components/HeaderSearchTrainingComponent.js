/* eslint-disable global-require */
import React, { useState } from 'react';
import { FlatList, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { isTablet, screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import IconFilter from '@assets/icons/icon_filter.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CMTextInput from '@components/CMTextInput';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { changeColor } from '@utils/helpers';

const PLACEHOLDER = {
  en: {
    placeholder: 'Enter keyword',
  },
  vn: {
    placeholder: 'Nhập từ khoá tìm kiếm',
  },
};
const ITEM_WIDTH_SLIDE = screenWidth - horizontal(24 * 2);
const ITEM_HEIGHT_SLIDE = isTablet
  ? (ITEM_WIDTH_SLIDE * 140) / 327
  : (ITEM_WIDTH_SLIDE * 162) / 327;

const RenderItemCategory = ({ item, index, goToSearchTrainingByCategory }) => (
  <TouchableDebounce
    style={styles.btnCategory}
    key={index}
    onPress={() => goToSearchTrainingByCategory(item)}
  >
    <CMText style={styles.textCategory} title={item.title} />
  </TouchableDebounce>
);
const HeaderSearchTrainingComponent = (props) => {
  const { navigation, countTraining, onPressFilter, listTrainingCategory, onSearch } = props;
  const languageLocal = useSelector((state) => state.global.language);

  const [search, setSearch] = useState('');
  const onHandleChangeKeyword = (keyword) => {
    onSearch(keyword);
  };

  const goToTrainingCategoryScreen = () => {
    navigation.navigate(Constant.SEARCH_TRAINING_CATEGORY_SCREEN);
  };
  const goToSearchTrainingByCategory = (classCategory) => {
    navigation.navigate(Constant.SEARCH_TRAINING_BY_CATEGORY_SCREEN, {
      trainingCategory: classCategory,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <FastImage
          source={require('@assets/other/bg_class_search.png')}
          resizeMode={FastImage.resizeMode.stretch}
          style={[
            styles.bgHeader,
            {
              backgroundColor: changeColor(Color.base_color, 0.7),
            },
          ]}
        >
          <CMText style={styles.textTitleBox1} i18nKey="text-tabar-label-search" />
          <CMText style={styles.textTitleBox2} i18nKey="text-tab-edu-programer" />
          <CMTextInput
            placeholder={
              languageLocal === Constant.LANGUAGE_VN
                ? PLACEHOLDER.vn.placeholder
                : PLACEHOLDER.en.placeholder
            }
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(search) => {
              setSearch(search?.trim());
            }}
            textInputStyle={styles.textInput}
            isSearch
            onSubmitEditing={() => {
              onHandleChangeKeyword(search?.trim());
            }}
            onSubmitSearch={() => {
              onHandleChangeKeyword(search?.trim());
            }}
            heightMin
            maxLength={200}
          />
        </FastImage>
        {listTrainingCategory?.length > 0 && (
          <View style={styles.mg_bt_20}>
            <View style={[styles.viewClassFilter, styles.mg_bt_20]}>
              <CMText i18nKey="text-title-screeb-all-training" style={styles.textClass}>
                <CMText
                  title={` (${listTrainingCategory?.length})`}
                  style={[styles.textClass, { color: Color.color_text_progress_bar }]}
                />
              </CMText>
              <TouchableDebounce onPress={() => goToTrainingCategoryScreen()}>
                <CMText
                  i18nKey="text-title-show-all"
                  style={[
                    styles.textViewMore,
                    {
                      color: Color.base_color,
                    },
                  ]}
                />
              </TouchableDebounce>
            </View>
            <FlatList
              data={listTrainingCategory}
              renderItem={({ item, index }) => (
                <RenderItemCategory
                  item={item}
                  index={index}
                  goToSearchTrainingByCategory={goToSearchTrainingByCategory}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled
              contentContainerStyle={{
                paddingStart: horizontal(24),
              }}
            />
          </View>
        )}
        <View style={[styles.viewClassFilter, styles.mg_bt_20]}>
          <CMText i18nKey="text-tab-edu-programer" style={styles.textClass}>
            <CMText
              title={` (${countTraining})`}
              style={[styles.textClass, { color: Color.color_text_progress_bar }]}
            />
          </CMText>
          <TouchableDebounce onPress={onPressFilter}>
            <IconFilter width={24} height={24} />
          </TouchableDebounce>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  textInput: {
    width: screenWidth - horizontal(24 * 4),
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: isTablet ? ITEM_HEIGHT_SLIDE * 0.2 : 1,
    borderWidth: 0,
  },
  viewClassFilter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: horizontal(24),
  },
  viewTextClass: {
    flexDirection: 'row',
  },
  textClass: {
    fontSize: 18,
    fontWeight: '700',
  },
  bgHeader: {
    padding: 24,
    marginBottom: 20,
    marginVertical: isTablet ? 48 : 24,
    borderRadius: 8,
    width: ITEM_WIDTH_SLIDE,
    height: ITEM_HEIGHT_SLIDE,
    alignSelf: 'center',
  },
  textTitleBox1: {
    fontFamily: fonts.medium,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
    color: Color.white,
    marginBottom: 5,
    width: screenWidth - horizontal(24 * 4),
    alignSelf: 'center',
    marginTop: isTablet ? vertical(20) : 1,
  },
  textTitleBox2: {
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27,
    color: Color.white,
    marginBottom: 20,
    width: screenWidth - horizontal(24 * 4),
    alignSelf: 'center',
  },
  textViewMore: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20.4,
    color: Color.base_color,
  },
  btnCategory: {
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(8),
    borderRadius: 100,
    backgroundColor: Color.color_bg_progress_bar,
    borderWidth: 1,
    borderColor: Color.color_width_featured_class,
    marginRight: vertical(8),
  },
  textCategory: {
    fontFamily: fonts.semi,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 20.4,
  },
  mg_bt_20: {
    marginBottom: vertical(20),
    marginTop: isTablet ? vertical(10) : vertical(1),
  },
});

export default HeaderSearchTrainingComponent;
