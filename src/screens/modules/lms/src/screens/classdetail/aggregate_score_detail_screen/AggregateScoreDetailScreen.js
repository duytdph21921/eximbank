/* eslint-disable react-hooks/exhaustive-deps */
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import globalStyles from '@theme/globalStyles';
import CMText from '@components/CMText';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import { useDispatch } from 'react-redux';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import {
  getMarkDetail,
  getMarkExerciseDetail,
} from '../../../services/lmsclassuserlearning.api';

const AggregateScoreDetailScreen = (props) => {
  const { navigation, route } = props;
  const contentDetailData = route?.params?.contentDetail;
  const classContentId = route?.params?.classContentId;
  const classId = route?.params?.classId;
  const isExercise = route?.params?.isExercise;
  const [contentDetail, setContentDetail] = useState(contentDetailData);
  const isMounteRef = useRef(false);
  const dispatch = useDispatch();
  const renderHeaderTitle = () => (
    <CMText
      i18nKey="text-header-result-study-detail"
      style={globalStyles.titleScreen}
    />
  );
  const renderHeaderRight = () => <View />;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, [navigation]);

  const funcGetMatkDetail = async () => {
    const response = await getMarkDetail(classId, classContentId);
    if (response?.status && isMounteRef.current && response?.data) {
      setContentDetail(response?.data);
    }
  };
  const funcGetMarkExerciseDetail = async () => {
    const response = await getMarkExerciseDetail(classId, classContentId);
    if (response?.status && response?.data && isMounteRef.current) {
      setContentDetail(response?.data);
    }
  };
  useEffect(() => {
    dispatch(updateLoadingAction(true));
    isMounteRef.current = true;
    if (!isExercise) {
      funcGetMatkDetail();
    } else {
      funcGetMarkExerciseDetail();
    }
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        scrollEnabled
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.flexInfoDetail}>
          <CMText i18nKey="text-min-score" style={styles.textTitle} />
          <View style={styles.flexRow}>
            <CMText
              title={`${contentDetail?.minScoreText ?? ''} `}
              style={styles.textDetail}
            />
            {contentDetail?.minScoreType ? (
              <CMText
                title={contentDetail?.minScoreType}
                style={styles.textDetail}
              />
            ) : (
              <CMText i18nKey="text-time-minute" style={styles.textDetail} />
            )}
          </View>
        </View>
        <View style={styles.flexInfoDetail}>
          <CMText
            i18nKey="text-study-state-required"
            style={styles.textTitle}
          />
          <CMText
            title={contentDetail?.requiredText}
            style={styles.textDetail}
          />
        </View>
        <View style={styles.flexInfoDetail}>
          <CMText i18nKey="text-mark-weight-score" style={styles.textTitle} />
          <CMText
            title={`${contentDetail?.markText}/${contentDetail?.weightScore}`}
            style={styles.textDetail}
          />
        </View>
        <View style={styles.flexInfoDetail}>
          <CMText i18nKey="text-total-learn-time" style={styles.textTitle} />
          <View style={styles.flexRow}>
            <CMText
              title={`${contentDetail?.totalLearnTime.toString()} `}
              style={styles.textDetail}
            />
            <CMText i18nKey="text-time-minute" style={styles.textDetail} />
          </View>
        </View>
        <View style={styles.flexInfoDetail}>
          <CMText i18nKey="text-total-view" style={styles.textTitle} />
          <CMText
            title={contentDetail?.totalView.toString()}
            style={styles.textDetail}
          />
        </View>
        <View style={styles.flexInfoDetail}>
          <CMText i18nKey="text-status-finish" style={styles.textTitleStatus} />
          <View
            style={[
              styles.textDetailStatus,
              {
                backgroundColor:
                  contentDetail?.status === 1
                    ? Color.color_pass
                    : Color.color_text_progress_bar,
              },
            ]}
          >
            <CMText
              title={contentDetail?.statusName}
              style={styles.textDetailWhite}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  flexInfoDetail: {
    flexDirection: 'row',
    paddingVertical: vertical(12),
    paddingHorizontal: horizontal(24),
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
  },
  textTitle: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
  },
  textTitleStatus: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
    marginTop: 8,
  },
  textDetail: {
    fontFamily: fonts.bold,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20.4,
    color: Color.text_color,
  },
  textDetailWhite: {
    fontFamily: fonts.bold,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    color: Color.white,
  },
  textDetailStatus: {
    fontFamily: fonts.bold,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20.4,
    paddingHorizontal: horizontal(12),
    paddingVertical: vertical(8),
    borderRadius: 100,
  },
});
export default AggregateScoreDetailScreen;
