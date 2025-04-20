/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import IconExerciseClass from '@assets/icons/icon_exercise_class.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { horizontal } from '@utils/scales';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { replaceHtml, downloadFile } from '@utils/helpers';
import globalStyles from '@theme/globalStyles';
import he from 'he';
import { frGetByClassId } from '../../../services/lmsclassexercise.api';
import BottomSheetSeeComments from '../../../component/BottomSheetSeeComments';
import BottomSheetExercise from '../../../component/BottomSheetExercise';

const ExerciseScreen = (props) => {
  const { classInfo, index } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalComment, setIsOpenModalComment] = useState(false);
  const [dataExercise, setDataExercise] = useState([]);
  const [idExercise, setIdExercise] = useState(0);
  const [isRefreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const isMounteRef = useRef(false);
  const params = {
    submitStatus: -1,
    timeLineStatus: -1,
    classId: classInfo?.id,
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (isMounteRef.current) {
      dispatch(updateLoadingAction(true));
      getData();
      dispatch(updateLoadingAction(false));
    }

    return () => {
      isMounteRef.current = false;
    };
  }, [index]);

  const getData = async () => {
    const response = await frGetByClassId(params);
    if (response?.status && isMounteRef.current) {
      setDataExercise(response?.data);
    }
  };
  const RenderBottomSheetSeeComments = useCallback(
    () => (
      <BottomSheetSeeComments
        isOpenModalComment={isOpenModalComment}
        idExercise={idExercise}
        closeModal={() => {
          setIsOpenModalComment(false);
        }}
      />
    ),
    [isOpenModalComment]
  );
  const RenderBottomSheetExercise = useCallback(
    () => (
      <BottomSheetExercise
        isOpenModal={isOpenModal}
        idExercise={idExercise}
        handleApplyOnPress={() => {
          getData();
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
      />
    ),
    [isOpenModal]
  );
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  });
  const onUpdateExtend = (itemExtend) => {
    setDataExercise((prevData) =>
      prevData.map((item) => {
        if (item?.id === itemExtend?.id) {
          return {
            ...item,
            isExtend: !item.isExtend,
          };
        }
        return item;
      })
    );
  };
  const renderKey18n = (item) => {
    if (
      item?.isExerciseEnd === false &&
      item?.isExerciseNotStart === false &&
      item?.submitStatus === 0
    ) {
      return 'text-button-submit-exam';
    }
    if (
      item?.isExerciseEnd === false &&
      item?.isExerciseNotStart === false &&
      item?.submitStatus === 1
    ) {
      return 'text-button-resubmit';
    }
    if (item?.isExerciseNotStart === true && item?.submitStatus !== 2) {
      return 'text-class-not-time-to-submit-exam';
    }
    if (item?.isExerciseEnd === true && item?.submitStatus !== 2) {
      return 'text-button-finished';
    }
    if (item?.submitStatus === 2) {
      return 'text-button-viewComment';
    }
    return '';
  };
  const renderItemExercise = (item, index) => (
    <View style={styles.classInfo} key={index}>
      <View style={styles.block}>
        <View style={{ flex: 0.1 }}>
          <View style={styles.boxNumber}>
            <CMText style={styles.textNumber} title={`${index + 1}`} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.boxContent}>
            <View style={styles.header}>
              <View style={{ flex: 0.7 }}>
                {item?.submitStatus === 0 ? (
                  <CMText
                    style={styles.headerNotSubmitText}
                    i18nKey="text-button-not-yet-submitted"
                  />
                ) : (
                  <CMText
                    style={styles.headerSubmitText}
                    i18nKey="text-button-submitted"
                  />
                )}
                <CMText style={styles.description} title={item?.title} />
              </View>
              <View style={{ flex: 0.2 }}>
                {item?.mark ? (
                  <CMText
                    style={styles.scoreText}
                    title={`${item?.mark ?? 0} `}
                  >
                    <CMText
                      style={styles.scoreText}
                      i18nKey="text_mark_score"
                    />
                  </CMText>
                ) : null}

                {item?.isExerciseEnd === false &&
                item?.isExerciseNotStart === false &&
                item?.submitStatus === 1 ? (
                  <CMText
                    style={styles.waitingText}
                    i18nKey="text-class-waiting-for-scoring"
                  />
                ) : null}

                {item?.fileId && (
                  <TouchableDebounce
                    onPress={() => downloadFile(item?.fileId, dispatch)}
                  >
                    <IconExerciseClass
                      style={styles.iconAttach}
                      width={18}
                      height={18}
                    />
                    <CMText
                      style={styles.buttonText}
                      i18nKey="text-button-download"
                    />
                  </TouchableDebounce>
                )}
              </View>
            </View>
            {item?.isExtend === true && (
              // <RenderHTML
              //   contentWidth={screenWidth - horizontal(2 * 20)}
              //   source={{
              //     html: item?.desciption ?? "",
              //   }}
              //   //tagsStyles={mixedStyle}
              // />
              <CMText
                title={`${he.decode(replaceHtml(item?.description ?? ''))} `}
                style={globalStyles.textNomal}
              />
            )}
            <TouchableDebounce
              onPress={() => {
                onUpdateExtend(item);
              }}
            >
              {item?.isExtend === true ? (
                <View style={styles.expandView}>
                  <CMText
                    style={styles.extend}
                    i18nKey="text-tabar-label-collapse"
                  />
                  <FontAwesomeIcon style={styles.extend} icon={faChevronUp} />
                </View>
              ) : (
                <View style={styles.expandView}>
                  <CMText style={styles.extend} i18nKey="text-button-expand" />
                  <FontAwesomeIcon style={styles.extend} icon={faChevronDown} />
                </View>
              )}
            </TouchableDebounce>
            <View style={styles.divided} />
            <CMText style={styles.deadline} i18nKey="text-button-expiry-date">
              <CMText style={styles.deadline} title={`: ${item?.endDate} `} />
            </CMText>
            <TouchableDebounce
              onPress={() => {
                setIdExercise(item?.id);
                if (
                  item?.isExerciseEnd === false &&
                  item?.isExerciseNotStart === false &&
                  (item?.submitStatus === 0 || item?.submitStatus === 1)
                ) {
                  setIsOpenModal(true);
                }
                // if (item?.isExerciseNotStart === true) {
                // }
                // if (item?.isExerciseEnd === true) {
                // }
                if (item?.submitStatus === 2) {
                  setIsOpenModalComment(true);
                }
              }}
            >
              <CMText
                style={styles.btnViewComment}
                i18nKey={renderKey18n(item)}
              />
            </TouchableDebounce>
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
        data={dataExercise}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => renderItemExercise(item, index)}
        numColumns={1}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <RenderBottomSheetSeeComments />
      <RenderBottomSheetExercise />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  classInfo: {
    padding: 20,
    backgroundColor: Color.white,
  },

  block: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.white,
    borderColor: Color.color_width_featured_class,
    borderWidth: 1,
    borderRadius: 18,
    padding: 10,
    shadowColor: Color.black,
    elevation: 1,
  },
  boxContent: {
    paddingHorizontal: 10,
  },
  boxNumber: {
    width: 25,
    height: 25,
    backgroundColor: Color.color_width_featured_class,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  headerAndContent: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerSubmitText: {
    color: Color.color_pass,
    fontSize: 12,
    fontFamily: fonts.bold,
    fontWeight: '600',
    lineHeight: 20.4,
  },
  headerNotSubmitText: {
    color: Color.color_yellow_NotSubmit_exercise,
    fontSize: 12,
    fontFamily: fonts.bold,
    fontWeight: '600',
    lineHeight: 20.4,
  },
  headerPointPaidText: {
    color: Color.base_color,
    fontSize: 12,
    fontFamily: fonts.bold,
    fontWeight: '600',
    lineHeight: 20.4,
  },
  textNumber: {
    fontFamily: fonts.semi,
    fontWeight: '600',
    fontSize: 12,
    color: Color.text_color,
    paddingVertical: 3,
    textAlign: 'center',
  },
  pointsContainer: {
    borderRadius: 10,
  },
  scoreText: {
    fontSize: 12,
    lineHeight: 20.4,
    fontWeight: '700',
    color: Color.red,
    fontFamily: fonts.bold,
    marginLeft: 15,
  },
  waitingText: {
    fontSize: 12,
    lineHeight: 20.4,
    fontWeight: '700',
    fontFamily: fonts.bold,
    color: Color.base_color,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.bold,
    fontWeight: '600',
    lineHeight: 23.8,
    marginBottom: 8,
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginTop: 30,
  },
  buttonText: {
    color: Color.color_border_answer,
    fontFamily: fonts.medium,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 15,
  },
  iconAttach: {
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 25,
  },
  iconDown: {
    marginLeft: 10,
  },
  btnViewComment: {
    backgroundColor: Color.white,
    width: 170,
    borderColor: Color.color_text_progress_bar,
    borderWidth: 1,
    borderRadius: 25,
    textAlign: 'center',
    padding: 12,
    fontSize: 14,
    fontFamily: fonts.bold,
    fontWeight: '700',
    lineHeight: 20.4,
    marginVertical: 10,
  },
  extend: {
    fontSize: 12,
    fontFamily: fonts.regular,
    fontWeight: '400',
    lineHeight: 20.4,
    color: Color.text_color_hover,
    marginVertical: 5,
    marginRight: horizontal(5),
  },
  deadline: {
    fontSize: 12,
    fontFamily: fonts.regular,
    fontWeight: '400',
    lineHeight: 20.4,
    color: Color.text_color_hover,
    marginVertical: 10,
  },
  divided: {
    borderTopColor: Color.cl_background_guest,
    borderTopWidth: 0.5,
    marginVertical: 5,
  },
  expandView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ExerciseScreen;
