/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';
import IconMark from '@assets/icons/icon_mark_a.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import Constant from '@utils/constants';
import { useDispatch } from 'react-redux';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { getMarkInfomation } from '../../../services/lmsclassuserlearning.api';
import { styles } from './AggregateScoreScreen.styles';

/**
 * Render item aggregate score.
 */

const ItemAggregate = ({ item, navigation, classId }) => (
  <TouchableDebounce
    style={styles.viewItemAggregate}
    onPress={() => {
      navigation.navigate(Constant.DETAIL_LEARNING_RESULT_SCREEN, {
        contentDetail: item,
        classId,
        classContentId: item?.id,
        isExercise: item.isExercise,
      });
    }}
  >
    <View style={styles.viewIcon}>
      {item?.markText != null && item?.markText !== '' ? (
        <CMText title={`${item?.markText}`} style={styles.textScoreRequired} />
      ) : (
        <IconMark width={24} height={24} />
      )}
    </View>
    <View style={styles.viewContent}>
      <CMText title={item?.title ?? ''} style={styles.textTitle} />
      <View style={styles.viewScore}>
        {item?.markText != null && item?.markText !== '' && (
          <>
            <CMText title={`${item?.markText}`} style={styles.textScore}>
              <CMText i18nKey="text-score" style={styles.textScore} />
            </CMText>
            <View style={styles.viewVertical} />
          </>
        )}
        <CMText i18nKey="text-weight" style={styles.textScore}>
          <CMText title={`${item?.weightScore}`} style={styles.textScore} />
        </CMText>
      </View>
      <TouchableDebounce
        style={[
          styles.btnState,
          {
            backgroundColor:
              item?.status === 1
                ? Color.color_pass
                : Color.color_text_progress_bar,
          },
        ]}
      >
        <CMText title={item?.statusName} style={styles.textStatus} />
      </TouchableDebounce>
    </View>
  </TouchableDebounce>
);

const AggregateScoreScreen = (props) => {
  const { navigation, route } = props;
  const isRefreshing = false;
  const [listAggregate, setListAggregate] = useState([]);

  const isMounteRef = useRef(false);
  const dispatch = useDispatch();
  const classId = route?.params?.classId;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText
      i18nKey="text-header-aggegate-score"
      style={globalStyles.titleScreen}
    />
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, [navigation]);

  const funcGetMarkInfomation = async () => {
    const response = await getMarkInfomation(classId);
    if (response?.status && response?.data && isMounteRef.current) {
      setListAggregate(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetMarkInfomation();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  /**
   * handle refresh list notification.
   */
  const onRefresh = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        data={listAggregate}
        renderItem={({ item, index }) => (
          <ItemAggregate
            item={item}
            index={index}
            navigation={navigation}
            classId={classId}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AggregateScoreScreen;
