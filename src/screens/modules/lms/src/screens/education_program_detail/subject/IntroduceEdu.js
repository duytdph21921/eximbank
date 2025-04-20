/* eslint-disable react-hooks/exhaustive-deps */
import he from 'he';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconSubject from '@assets/icons/icon_subject.svg';
import IconWatch from '@assets/icons/icon_watch.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import { Color } from '@theme/colors';
import { replaceHtml } from '@utils/helpers';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { getById } from '../../../services/lmstraining.api';

const IMAGE_WIDTH = screenWidth - horizontal(24 * 2);
const IMAGE_HEIGHT = (IMAGE_WIDTH * 150) / 327;

const IntroduceEdu = (props) => {
  const dispatch = useDispatch();
  const { params } = props;
  const isMounteRef = useRef(false);
  const [dataInfoEduProgram, setDataInfoEduProgram] = useState({
    description: '',
  });
  const id = params?.id;

  const funcGetById = async () => {
    const response = await getById(id);
    if (response?.status && isMounteRef.current) {
      setDataInfoEduProgram(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetById();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <CustomImage
        style={styles.viewImage}
        source={dataInfoEduProgram?.avatar}
      />
      <CMText
        title={dataInfoEduProgram?.title}
        style={styles.textTitle}
        numberOfLines={3}
      />
      <View style={styles.viewDate}>
        {(dataInfoEduProgram?.startDate !== '' ||
          dataInfoEduProgram?.endDate !== '') && (
          <IconWatch width={18} height={18} />
        )}
        <CMText
          title={`${dataInfoEduProgram?.startDate ?? ''}${
            dataInfoEduProgram?.endDate
              ? ` - ${dataInfoEduProgram?.endDate}`
              : ''
          }`}
          style={styles.textTime}
          numberOfLines={2}
        />
      </View>
      <View style={styles.viewDate}>
        <IconSubject width={18} height={18} />
        <CMText
          title={`${dataInfoEduProgram?.numSubject} `}
          style={styles.textTime}
        >
          <CMText i18nKey="text-subject" style={styles.textTime} />
        </CMText>
      </View>
      <View style={styles.viewLine} />
      <View style={{ flex: 1 }}>
        <ScrollView
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <CMText
            title={`${he.decode(
              replaceHtml(dataInfoEduProgram?.description ?? '')
            )}`}
            style={styles.textContent}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontal(20),
  },
  viewImage: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    borderRadius: 16,
  },
  textTitle: {
    fontWeight: '700',
    marginTop: vertical(20),
    fontFamily: fonts.regular,
    lineHeight: textSize(35),
    fontSize: textSize(20),
  },
  viewDate: {
    flexDirection: 'row',
    marginTop: vertical(20),
  },
  textTime: {
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: horizontal(10),
    fontFamily: fonts.regular,
    lineHeight: 20.4,
  },
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26.4,
  },
  viewLine: {
    height: vertical(10),
    backgroundColor: Color.color_bg_tab_view,
    marginVertical: vertical(24),
  },
});
export default IntroduceEdu;
