import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import IconFilter from '@assets/icons/icon_filter.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import CMTextInput from '@components/CMTextInput';

const PLACEHOLDER = {
  en: {
    placeholder: 'Enter keyword',
  },
  vn: {
    placeholder: 'Nhập từ khoá tìm kiếm',
  },
};
const HeaderSearchDocumentByCategoryComponent = (props) => {
  const languageLocal = useSelector((state) => state.global.language);
  const { listContentCategory, countContent, onPressFilter, onSearch, onHandleChangeCategory } =
    props;
  const [search, setSearch] = useState('');
  const onHandleChangeKeyword = (keyword) => {
    onSearch(keyword);
  };
  const gotoSearchContent = (contentCategory) => {
    onHandleChangeCategory(contentCategory);
  };
  const renderItemCategory = (item, index) => (
    <TouchableDebounce
      style={styles.btnCategory}
      key={index}
      onPress={() => gotoSearchContent(item)}
    >
      <CMText style={styles.textCategory} title={item.title} />
    </TouchableDebounce>
  );
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: vertical(24) }}>
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
      </View>
      {listContentCategory?.length > 0 && (
        <View style={[styles.mg_bt_20, { marginRight: -24 }]}>
          <View style={[styles.viewClassFilter, styles.mg_bt_20]}>
            <View style={styles.viewTextClass}>
              <CMText i18nKey="text-content-category" style={styles.textClass} />
              <CMText
                title={` (${listContentCategory?.length})`}
                style={[styles.textClass, { color: Color.color_text_progress_bar }]}
              />
            </View>
          </View>
          <View>
            <FlatList
              data={listContentCategory}
              renderItem={({ item, index }) => renderItemCategory(item, index)}
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
          <CMText i18nKey="text-tab-document" style={styles.textClass} />
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
    width: screenWidth - horizontal(24 * 2),
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: vertical(24),
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
  },
  textTitleBox1: {
    fontFamily: fonts.medium,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
    color: Color.white,
    marginBottom: 5,
  },
  textTitleBox2: {
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27,
    color: Color.white,
    marginBottom: 20,
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
  },
});

export default HeaderSearchDocumentByCategoryComponent;
