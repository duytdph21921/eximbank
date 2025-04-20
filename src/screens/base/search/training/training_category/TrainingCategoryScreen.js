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
import { getTrainingCategoryOnSearchScreen } from '@services/lms/lmstrainingcategorytree.api';
import { updateLoadingAction } from '@store/reducers/globalSlice';

const TrainingCategoryScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [listTrainingCategory, setListTrainingCategory] = useState([]);
  const isMounteRef = useRef(false);
  const modelCategory = {
    offset: 0,
    limit: 9999,
    keyword: '',
  };

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText
      i18nKey="text-title-screeb-all-training"
      style={globalStyles.titleScreen}
      numberOfLines={1}
    />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);

  const funcGetTrainingCategoryOnSearchScreen = async () => {
    const response = await getTrainingCategoryOnSearchScreen(modelCategory);
    if (response?.status && isMounteRef.current) {
      setListTrainingCategory(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetTrainingCategoryOnSearchScreen();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const onBack = () => {
    navigation.goBack();
  };

  const goToSearchTrainingByCategory = (trainingCategory) => {
    navigation.navigate(Constant.SEARCH_TRAINING_BY_CATEGORY_SCREEN, {
      trainingCategory,
    });
  };

  return (
    <View style={styles.container}>
      <CMText style={styles.textTotalCategory} i18nKey="text-have-everything">
        <CMText style={styles.textTotalCategory} title={`${listTrainingCategory.length}`} />
        <CMText style={styles.textTotalCategory} i18nKey="text-directory" />
      </CMText>
      <View style={styles.boxListClassCategory}>
        {listTrainingCategory &&
          listTrainingCategory.map((item, index) => (
            <TouchableDebounce
              key={`${index + 1}`}
              style={styles.btnCategory}
              onPress={() => goToSearchTrainingByCategory(item)}
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
  boxListClassCategory: {
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
export default TrainingCategoryScreen;
