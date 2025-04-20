/* eslint-disable global-require */
import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import Constant from '@utils/constants';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import IconFilter from '@assets/icons/icon_filter.svg';
import { useSelector } from 'react-redux';
import fonts from '@assets/value/fonts';
import { horizontal, vertical } from '@utils/scales';
import { isTablet, screenWidth } from '@utils/platforms';
import CMTextInput from '@components/CMTextInput';
import FastImage from 'react-native-fast-image';
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
const RenderItemCategory = ({ item, index, gotoSearchContent }) => (
  <TouchableDebounce style={styles.btnCategory} key={index} onPress={() => gotoSearchContent(item)}>
    <CMText style={styles.textCategory} title={item.title} />
  </TouchableDebounce>
);
const HeaderSearchExamComponent = (props) => {
  const languageLocal = useSelector((state) => state.global.language);

  const { navigation, listContentCategory, countContent, onPressFilter, onSearch } = props;
  const [search, setSearch] = useState('');
  const onHandleChangeKeyword = (keyword) => {
    onSearch(keyword);
  };
  const gotoSearchContent = (contentCategory) => {
    navigation.navigate(Constant.SEARCH_CONTENT_BY_CATEGORY_EXAM, {
      contentCategory,
    });
  };
  const gotoContentCategoryScreen = () => {
    navigation.navigate(Constant.CONTENT_CATEGORY_EXAM_SCREEN);
  };
  return (
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
        <CMText style={styles.textTitleBox2} i18nKey="text-search-exam" />
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
        />
      </FastImage>
      {listContentCategory?.length > 0 && (
        <View style={styles.mg_bt_20}>
          <View style={[styles.viewClassFilter, styles.mg_bt_20]}>
            <View style={styles.viewTextClass}>
              <CMText i18nKey="text-content-exam" style={styles.textClass} />
              <CMText
                title={` (${listContentCategory?.length})`}
                style={[styles.textClass, { color: Color.color_text_progress_bar }]}
              />
            </View>
            <TouchableDebounce onPress={() => gotoContentCategoryScreen()}>
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
          <View style={{ marginRight: -24 }}>
            <FlatList
              nestedScrollEnable
              data={listContentCategory}
              renderItem={({ item, index }) => (
                <RenderItemCategory
                  item={item}
                  index={index}
                  gotoSearchContent={gotoSearchContent}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingStart: horizontal(24),
              }}
            />
          </View>
        </View>
      )}
      <View style={[styles.viewClassFilter, styles.mg_bt_20]}>
        <View style={styles.viewTextClass}>
          <CMText i18nKey="text-tab-exam" style={styles.textClass} />
          <CMText
            title={` (${countContent})`}
            style={[styles.textClass, { color: Color.color_text_progress_bar }]}
          />
        </View>
        <TouchableDebounce onPress={onPressFilter}>
          <IconFilter width={24} height={24} />
        </TouchableDebounce>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: horizontal(24),
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
    letterSpacing: 0.3,
    color: Color.white,
    marginBottom: 5,
  },
  textTitleBox2: {
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0.2,
    color: Color.white,
    marginBottom: 20,
  },
  textViewMore: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20.4,
    letterSpacing: 0.2,
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
    letterSpacing: 0.2,
  },
  mg_bt_20: {
    marginBottom: vertical(20),
  },
});

export default HeaderSearchExamComponent;
