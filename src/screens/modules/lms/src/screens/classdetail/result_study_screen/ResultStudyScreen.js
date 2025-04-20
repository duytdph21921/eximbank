/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import CustomTabView from '@components/CustomTabView';
import { Color } from '@theme/colors';
import Constant from '@utils/constants';
import { styles } from './ResultStudyScreen.styles';
import HeaderResult from './components/HeaderResult';
import TabOverViewResult from './components/TabOverViewResult';
import TabDetailResult from './components/TabDetailResult';
import { frGetByClassId } from '../../../services/lmsclasscontent.api';
import {
  getClassResultDashboard,
  getClassUserInfo,
} from '../../../services/lmsclassuserlearning.api';
import { frUserJoinClassNew } from '../../../services/lmsclass.api';

const ResultStudyScreen = (props) => {
  const { navigation, classInfo, classUser, index } = props;
  const [activeTab, setActiveTab] = useState(0);
  const isMounteRef = useRef(false);
  const [dataResultOverView, setDataResultOverView] = useState([]);
  const [dataDetailResult, setDataDetailResult] = useState([]);
  const [dataChart, setDataChart] = useState();
  const [classUserInfo, setClassUser] = useState();

  useEffect(() => {
    isMounteRef.current = true;
    if (index === 3) {
      getAllData();
    }
    return () => {
      isMounteRef.current = false;
    };
  }, [index]);
  const funcFrUserJoinClassNew = async () => {
    const response = await frUserJoinClassNew(classInfo?.id);
    if (response?.status && response?.data && isMounteRef.current) {
      setClassUser(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (index === 3 && classInfo?.id && !classInfo?.isCloseClass) {
      funcFrUserJoinClassNew();
    }
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const getAllData = async () => {
    const model = {
      classId: classInfo.id,
    };
    /**
     * Api kết quả chi tiết.
     */
    const response = await frGetByClassId(model);
    if (response?.status && response?.data && isMounteRef.current) {
      setDataDetailResult(response?.data);
    }
    /**
     * Api kết quả tổng quan.
     */
    const response2 = await getClassUserInfo(model.classId);
    if (response2?.status && response2?.data && isMounteRef.current) {
      setDataResultOverView(response2?.data);
    }
    /**
     * Api chart header.
     */
    const response3 = await getClassResultDashboard(model.classId);
    if (response3?.status && response3?.data && isMounteRef.current) {
      setDataChart(response3?.data);
    }
  };

  const renderRoute1 = () => (
    <TabOverViewResult
      dataResultOverView={dataResultOverView}
      onPressHistory={() => {
        navigation.navigate(Constant.HISTORY_ACCESS_SCREEN, {
          classUser: classUserInfo,
        });
      }}
    />
  );
  const renderRoute2 = () => (
    <TabDetailResult
      dataDetailResult={dataDetailResult}
      navigation={navigation}
      classInfo={classInfo}
      classUser={classUser}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <HeaderResult
        dataChart={dataChart}
        onHandleAggregate={() => {
          navigation.navigate(Constant.AGGREGATE_SCORE_SCREEN, {
            classId: classInfo?.id,
          });
        }}
      />
      <CustomTabView
        style={styles.tabBar}
        onIndexChange={(index) => setActiveTab(index)}
        firstRoute={renderRoute1}
        secondRoute={renderRoute2}
        routes={[
          { key: 'first', title: 'text-tab-overall-results' },
          { key: 'second', title: 'text-tab-result-detail' },
        ]}
        colorButtonTabActive={[
          Color.color_border_answer,
          Color.color_border_answer,
          Color.color_border_answer,
        ]}
      />
    </SafeAreaView>
  );
};

export default ResultStudyScreen;
