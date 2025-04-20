/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import CMText from '@components/CMText';
import BackHeader from '@components/BackHeader';
import globalStyles from '@theme/globalStyles';
import TouchableDebounce from '@components/TouchableDebounce';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import Constant from '@utils/constants';
import fonts from '@assets/value/fonts';
import { getContentCategoryOnSearchScreen } from '@services/lms/lmscontentcategory.api';
import { updateLoadingAction } from '@store/reducers/globalSlice';

const DocumentCategoryScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [listContentCategory, setListContentCategory] = useState([]);
  const isMounteRef = useRef(false);
  const modelCategory = {
    offset: 0,
    limit: 9999,
    keyword: '',
  };

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText i18nKey="text-content-category" style={globalStyles.titleScreen} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);

  const funcGetContentCategoryOnSearchScreen = async () => {
    const response = await getContentCategoryOnSearchScreen(modelCategory);
    if (response?.status && isMounteRef.current) {
      setListContentCategory(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetContentCategoryOnSearchScreen();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const onBack = () => {
    navigation.goBack();
  };
  const gotoSearchClassByCategory = (contentCategory) => {
    navigation.navigate(Constant.SEARCH_CONTENT_BY_CATEGORY, {
      contentCategory,
    });
  };
  return (
    <View style={styles.container}>
      <CMText
        style={styles.textTotalCategory}
        title={`Có tất cả ${listContentCategory.length} danh mục`}
      />
      <View style={styles.boxListContentCategory}>
        {listContentCategory &&
          listContentCategory.map((item, index) => (
            <TouchableDebounce
              key={`${index + 1}`}
              style={styles.btnCategory}
              onPress={() => gotoSearchClassByCategory(item)}
            >
              <CMText style={styles.textCategory} title={item?.title} />
            </TouchableDebounce>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  btnCategory: {
    borderRadius: 100,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(8),
    borderWidth: 1,
    borderColor: Color.color_width_featured_class,
    backgroundColor: Color.color_bg_progress_bar,
    marginRight: horizontal(8),
    marginBottom: vertical(8),
  },
  textTotalCategory: {
    paddingHorizontal: horizontal(24),
    marginTop: vertical(24),
    fontFamily: fonts.semi,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 23.8,
    color: Color.text_color_hover,
  },
  boxListContentCategory: {
    paddingHorizontal: horizontal(24),
    marginTop: vertical(12),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textCategory: {
    fontFamily: fonts.semi,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 20.4,
  },
});
export default DocumentCategoryScreen;
