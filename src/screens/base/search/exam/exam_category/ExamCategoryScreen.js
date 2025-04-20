/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';
import { searchRegistorCategory } from '@services/test/testregistorcategory.api';
import { updateLoadingAction } from '@store/reducers/globalSlice';

const ExamCategoryScreen = (props) => {
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
    <CMText i18nKey="text-content-exam" style={globalStyles.titleScreen} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);

  const funcSearchRegistorCategory = async () => {
    const response = await searchRegistorCategory(modelCategory);
    if (response?.status && isMounteRef.current) {
      setListContentCategory(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcSearchRegistorCategory();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const onBack = () => {
    navigation.goBack();
  };
  const gotoSearchClassByCategory = (contentCategory) => {
    navigation.navigate(Constant.SEARCH_CONTENT_BY_CATEGORY_EXAM, {
      contentCategory,
    });
  };
  return (
    <View style={styles.container}>
      <CMText style={styles.textTotalCategory} i18nKey="text-have-everything">
        <CMText style={styles.textTotalCategory} title={` ${listContentCategory.length} `} />
        <CMText style={styles.textTotalCategory} i18nKey="category" />
      </CMText>
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
    letterSpacing: 0.3,
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
    letterSpacing: 0.2,
  },
});
export default ExamCategoryScreen;
