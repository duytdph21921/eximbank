/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import TreeViewCustom from '@components/TreeViewCustom';
import { useDispatch } from 'react-redux';
import { frGetByClassId } from '@services/lms/lmsclasscontent.api';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import fonts from '@assets/value/fonts';
import { isTablet, screenWidth } from '@utils/platforms';
import { updateLoadingAction } from '@store/reducers/globalSlice';

const ClassContentDetail = (props) => {
  const { classId, classInfo, handelJoinClass, handelUnRegisterClass } = props;
  const [classContents, setClassContent] = useState([]);
  const dispatch = useDispatch();
  const isMounteRef = useRef(false);

  const funcFrGetByClassId = async () => {
    const model = {
      isViewResult: true,
      classId,
    };
    const response = await frGetByClassId(model);
    if (response?.status && isMounteRef.current) {
      setClassContent(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcFrGetByClassId();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const getNotificationKey = (status) => {
    switch (status) {
      case 3:
        return 'text-class-has-limit-user';
      case 4:
        return 'text-class-has-limit-register';
      case 5:
        return 'text-class-not-time-to-register-yet';
      case 6:
        return 'text-class-registration-not-allowed';
      case 8:
        return 'text-classes-are-pending-approval';
      default:
        return '';
    }
  };

  const getStatusClassKey = (status) => {
    switch (status) {
      case 1:
        return 'text-class-has-not-started-yet';
      case 2:
        return 'text-class-has-limit-ended';
      default:
        return '';
    }
  };

  const renderTextNotificationClass = () => (
    <CMText style={styles.textWarning} i18nKey={getNotificationKey(classInfo?.statusRegister)} />
  );

  const renderTextStatusClass = () => (
    <CMText style={styles.textWarning} i18nKey={getStatusClassKey(classInfo?.statusClass)} />
  );

  const onJoinClass = (status) => {
    handelJoinClass(status);
  };
  const onUnRegisterClass = (status) => {
    handelUnRegisterClass(status);
  };
  return (
    <>
      <TreeViewCustom data={classContents} childrenKey="childs" isViewResult />
      <View style={styles.viewButtonClass}>
        {(classInfo?.statusRegister === 2 || classInfo?.statusRegister === 1) && (
          <TouchableDebounce
            onPress={() => {
              onJoinClass(classInfo?.statusRegister);
            }}
            style={[
              styles.btnLearn,
              {
                backgroundColor: Color.base_color,
              },
            ]}
          >
            <CMText style={styles.textLearn} i18nKey="text-register-class" />
          </TouchableDebounce>
        )}
        {classInfo?.statusRegister === 7 && classInfo?.statusClass === 3 && (
          <TouchableDebounce
            onPress={() => {
              onJoinClass(classInfo?.statusRegister);
            }}
            style={[
              styles.btnLearn,
              {
                backgroundColor: Color.base_color,
              },
            ]}
          >
            <CMText style={styles.textLearn} i18nKey="text-join-class" />
          </TouchableDebounce>
        )}
        {classInfo?.statusRegister !== 1 &&
          classInfo?.statusRegister !== 2 &&
          classInfo?.statusRegister !== 7 &&
          renderTextNotificationClass()}
        {classInfo?.statusRegister !== 1 &&
          classInfo?.statusRegister !== 2 &&
          classInfo?.statusClass !== 3 &&
          renderTextStatusClass()}
        {classInfo?.statusRegister === 8 && (
          <TouchableDebounce
            onPress={() => {
              onUnRegisterClass(classInfo?.statusRegister);
            }}
            style={[
              styles.btnLearn,
              {
                backgroundColor: Color.base_color,
              },
            ]}
          >
            <CMText style={styles.textLearn} i18nKey="text-classes-cancel-registration" />
          </TouchableDebounce>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  btnLearn: {
    width: screenWidth - horizontal(24 * 2),
    height: isTablet ? 65 : 56,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(10),
    borderRadius: 100,
    backgroundColor: Color.base_color,
    marginTop: 8,
  },
  textLearn: {
    textAlign: 'center',
    color: Color.white,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
  },
  textWarning: {
    textAlign: 'center',
    color: Color.red,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
  },
  viewButtonClass: {
    height: 56,
    borderRadius: 100,
    marginTop: vertical(30),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vertical(30),
  },
});
export default ClassContentDetail;
