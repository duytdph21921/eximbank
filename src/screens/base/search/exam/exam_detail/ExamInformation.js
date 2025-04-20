/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import TouchableDebounce from '@components/TouchableDebounce';
import { screenWidth } from '@utils/platforms';
import Constant from '@utils/constants';
import { useDispatch } from 'react-redux';
import { updateLoadingAction, updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import BackHeader from '@components/BackHeader';
import { registorTestForm } from '@services/test/testregistoruser.api';
import { getById } from '@services/test/testregistortestform.api';
import globalStyles from '@theme/globalStyles';

const ItemInfor = ({ item }) => (
  <View style={styles.viewItem}>
    <CMText i18nKey={item?.keyI18n} style={styles.textTitle} />
    <CMText title={`${item?.value}`} style={styles.textResult} />
  </View>
);

const ExamInformation = (props) => {
  const { navigation, route } = props;
  const registorTestFormInfo = route?.params;
  const [dataListExam, setDataListExam] = useState();
  const [currentTestStatus, setCurrentTestStatus] = useState(0);
  const isMounteRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    loadData();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const listData = [
    {
      keyI18n: 'text-number-of-questions',
      value: dataListExam?.questionNum ?? '',
    },
    {
      keyI18n: 'text-time-to-do-homework',
      value: `${dataListExam?.timeTest ?? ''} phút`,
    },
    {
      keyI18n: 'text-start-time',
      value: dataListExam?.startDate ?? '',
    },
    {
      keyI18n: 'text-end-time',
      value: dataListExam?.endDate ?? '',
    },
    {
      keyI18n: 'text-how-to-get-points',
      value: dataListExam?.resultTypeName ?? '',
    },
    {
      keyI18n: 'text-maximum-number-of-attempts',
      value: dataListExam?.testCount ?? '',
    },
    {
      keyI18n: 'text-number-of-times-you-have-done-the-test',
      value: dataListExam?.testedCount ?? '',
    },
  ];

  const loadData = async () => {
    const response = await getById(registorTestFormInfo?.id);
    if (response?.status && isMounteRef.current) {
      setDataListExam(response?.data);
      setCurrentTestStatus(response?.data?.currentTestStatus);
    }
  };

  const onHandleRegisterExam = async (id) => {
    if (currentTestStatus === Constant.MY_TEST_STATUS.register) {
      const response = await registorTestForm(id);
      if (response) {
        if (isMounteRef.current) {
          dispatch(
            updateShowDialogWarnAction({
              isShowModalWarn: true,
              isSigout: false,
              titleHeader: '',
              keyHeader: 'text-tab-notification',
              keyMessage: '',
              contentMessage: response?.message,
              isShowCancel: false,
              isShowSubmit: false,
            }),
          );
          loadData();
        }
      }
    } else if (currentTestStatus === Constant.MY_TEST_STATUS.goingOn) {
      // navigate màn chi tiêt thi ngoài
      navigation.navigate(Constant.MY_TEST_INFORMATION_SCREEN, { id });
    } else if (currentTestStatus === Constant.MY_TEST_STATUS.continuteDoing) {
      // navigate màn chi tiêt thi ngoài
      navigation.navigate(Constant.MY_TEST_INFORMATION_SCREEN, { id });
    }
  };
  const onBack = () => {
    navigation.goBack();
  };

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText i18nKey="text-exam-information" style={globalStyles.titleScreen} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);

  const btnColor = () => {
    switch (currentTestStatus) {
      case Constant.MY_TEST_STATUS.notStart:
        return Color.white;
      case Constant.MY_TEST_STATUS.finished:
        return Color.white;
      case Constant.MY_TEST_STATUS.overLimit:
        return Color.cl_border_text_input;
      case Constant.MY_TEST_STATUS.notRegister:
        return Color.white;
      default:
        return Color.base_color;
    }
  };
  const testStatus = () => {
    switch (currentTestStatus) {
      case Constant.MY_TEST_STATUS.notStart:
        return 'text-not-yet-started';
      case Constant.MY_TEST_STATUS.goingOn:
        return 'text-do-the-assignment';
      case Constant.MY_TEST_STATUS.continuteDoing:
        return 'text-continue-assignment';
      case Constant.MY_TEST_STATUS.finished:
        return 'text-end-assignment';
      case Constant.MY_TEST_STATUS.overLimit:
        return 'text-exceeded-number-assignment';
      case Constant.MY_TEST_STATUS.register:
        return 'sigup-button';
      case Constant.MY_TEST_STATUS.notRegister:
        return 'text-not-registered';
      default:
        return '';
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.white }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <CMText title={`${dataListExam?.title}`} style={styles.titleExam} />
        {listData.map((item, index) => (
          <ItemInfor key={`${index + 1}`} item={item} />
        ))}
      </ScrollView>

      <TouchableDebounce
        disabled={
          currentTestStatus === Constant.MY_TEST_STATUS.notStart ||
          currentTestStatus === Constant.MY_TEST_STATUS.finished ||
          currentTestStatus === Constant.MY_TEST_STATUS.overLimit ||
          currentTestStatus === Constant.MY_TEST_STATUS.notRegister
        }
        style={[
          styles.btnEnterExam,
          {
            backgroundColor: btnColor(),
          },
        ]}
        onPress={() => onHandleRegisterExam(dataListExam?.id)}
      >
        <CMText
          i18nKey={testStatus()}
          style={[
            styles.textEnterExam,
            {
              color:
                currentTestStatus === Constant.MY_TEST_STATUS.notStart ||
                currentTestStatus === Constant.MY_TEST_STATUS.finished ||
                currentTestStatus === Constant.MY_TEST_STATUS.notRegister
                  ? Color.base_color
                  : Color.white,
            },
          ]}
        />
      </TouchableDebounce>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleExam: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 44.8,
    paddingHorizontal: horizontal(15),
    margin: vertical(15),
  },
  viewItem: {
    flex: 1,
    flexDirection: 'column',
    height: 56,
    borderWidth: 1,
    borderColor: Color.white,
    borderBottomColor: Color.color_width_featured_class,
    margin: vertical(12),
    paddingHorizontal: horizontal(15),
    alignItems: 'flex-start',
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
  },
  textResult: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20.4,
  },
  btnEnterExam: {
    height: 56,
    borderRadius: 100,
    marginTop: vertical(30),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.base_color,
    width: screenWidth - horizontal(15 * 2),
    marginBottom: vertical(30),
  },
  btnEnterOverLimitExam: {
    height: 56,
    borderRadius: 100,
    marginTop: vertical(30),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.cl_border_text_input,
    width: screenWidth - horizontal(15 * 2),
    marginBottom: vertical(30),
  },
  textEnterExam: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    color: Color.white,
  },
  textWarning: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 26.4,
    color: Color.color_not_pass,
    marginVertical: vertical(30),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExamInformation;
