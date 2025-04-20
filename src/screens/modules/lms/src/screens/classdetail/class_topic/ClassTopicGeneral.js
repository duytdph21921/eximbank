/* eslint-disable global-require */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { horizontal, vertical } from '@utils/scales';
import CMTextInput from '@components/CMTextInput';
import { isTablet, screenHeight, screenWidth } from '@utils/platforms';
import { Color } from '@theme/colors';
import Constant from '@utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import CMText from '@components/CMText';
import fonts from '@assets/value/fonts';
import { calculatorTime, loadFile } from '@utils/helpers';
import FastImage from 'react-native-fast-image';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TouchableDebounce from '@components/TouchableDebounce';
import {
  updateLoadingAction,
  updateShowDialogWarnAction,
} from '@store/reducers/globalSlice';
import { postClassTopic, searchFr } from '../../../services/lmsclasstopic.api';
import BottomAddClassTopic from '../../../component/BottomAddClassTopic';
import ViewClassTopicEmpty from './ViewClassTopicEmpty';
import ClassTopicDetail from './ClassTopicDetail';

const ITEM_WIDTH_SLIDE = screenWidth - horizontal(24 * 2);
const ITEM_HEIGHT_SLIDE = isTablet
  ? (ITEM_WIDTH_SLIDE * 140) / 327
  : (ITEM_WIDTH_SLIDE * 162) / 327;

const PLACEHOLDER = {
  en: {
    placeholder: 'Enter keyword',
  },
  vn: {
    placeholder: 'Nhập từ khoá tìm kiếm',
  },
};
const ClassTopicGeneral = (props) => {
  const { classInfo } = props;
  const [search, setSearch] = useState('');
  const languageLocal = useSelector((state) => state.global.language);
  const [listData, setListData] = useState([]);
  const [total, setTotal] = useState(0);
  const offset = 0;
  const [limit] = useState(20);
  const [isLoadMore, setLoadMore] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isViewDetail, setIsViewDetail] = useState(false);
  const [classTopicInfo, setClassTopicInfo] = useState();
  const [model, setModel] = useState({
    offset,
    limit,
    keyword: search,
    classId: classInfo?.id,
  });
  const dispatch = useDispatch();
  const isMounteRef = useRef(false);
  const onHandleChangeKeyword = (keyword) => {
    setSearch(keyword);
    const newMode = { ...model, keyword };
    setModel(newMode);
    getData(newMode);
  };

  const funcSearchFr = async (params) => {
    const response = await searchFr(params);
    if (response?.status && isMounteRef.current) {
      setListData(response?.data);
      setTotal(response?.metaData?.totalRecord ?? 0);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (isMounteRef.current) {
      dispatch(updateLoadingAction(true));
      funcSearchFr(model);
      dispatch(updateLoadingAction(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const getData = (params) => {
    funcSearchFr(params);
  };
  const handleLoadMore = () => {
    if (
      !isLoadMore &&
      !this.onEndReachedCalledDuringMomentum &&
      listData.length < total
    ) {
      setLoadMore(true);
      // getData(newModel);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
  const renderItemClassTopic = (item) => (
    <TouchableOpacity
      style={styles.boxTopic}
      onPress={() => {
        viewDetailTopic(item);
      }}
    >
      <View style={{ marginBottom: vertical(8) }}>
        <CMText title={item?.title} style={styles.title} />
      </View>
      <View style={styles.boxItem}>
        {item?.avatar ? (
          <FastImage
            source={{ uri: loadFile(item?.avatar) }}
            resizeMode="contain"
            style={styles.avatarProfile}
          />
        ) : (
          <FastImage
            source={require('@assets/img/avatar-detail.png')}
            resizeMode="contain"
            style={styles.avatarProfile}
          />
        )}

        <CMText title={item?.displayName} style={styles.displayName} />
        {item?.createdDate && (
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.dot} />
            <CMText
              title={calculatorTime(item?.createdDate, languageLocal)}
              style={styles.textTime}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
  const RenderBottomAddClassTopic = useCallback(
    () => (
      <BottomAddClassTopic
        isOpenModal={isOpenModal}
        handleSubmitTopic={(event) => {
          handleSubmitTopic(event);
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
      />
    ),
    [isOpenModal]
  );
  const handleSubmitTopic = useCallback(async (item) => {
    // Check data truoc khi day len
    if (
      !item?.title ||
      !item?.content ||
      item?.title === '' ||
      item?.content === ''
    ) {
      setTimeout(() => {
        dispatch(
          updateShowDialogWarnAction({
            isShowModalWarn: true,
            isSigout: false,
            titleHeader: '',
            keyHeader: 'text-title-dialog-warn',
            keyMessage: 'text-notify-tb21',
            contentMessage: '',
            isShowCancel: true,
            isShowSubmit: false,
            keyCancel: 'text-close',
          })
        );
      }, 500);
    } else {
      // Call api đẩy dữ liệu lên
      const modelAdd = {
        classId: classInfo?.id,
        content: item?.content,
        title: item?.title,
        itemId: Constant.GUIDEMPTY,
      };
      const response = await postClassTopic(modelAdd);
      if (response?.status) {
        setSearch('');
        const newModel = { ...model, keyword: '' };
        setModel(newModel);
        getData(newModel);
      } else {
        dispatch(
          updateShowDialogWarnAction({
            isShowModalWarn: true,
            isSigout: false,
            titleHeader: '',
            keyHeader: 'text-title-dialog-warn',
            keyMessage: 'text-internal-error',
            contentMessage: '',
            isShowCancel: true,
            isShowSubmit: false,
            keyCancel: 'text-close',
          })
        );
      }
    }
  });
  const viewDetailTopic = (item) => {
    setClassTopicInfo(item);
    setIsViewDetail(true);
  };
  const handleBack = (type) => {
    if (type === 1) {
      setIsViewDetail(false);
      const newModel = {
        ...model,
        offset: 0,
        limit: 20,
        keyword: '',
        classId: classInfo?.id,
      };
      setModel(newModel);
      getData(newModel);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isViewDetail === false ? (
        <View style={{ flex: 1 }}>
          <View>
            <CMTextInput
              placeholder={
                languageLocal === Constant.LANGUAGE_VN
                  ? PLACEHOLDER.vn.placeholder
                  : PLACEHOLDER.en.placeholder
              }
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(search) => {
                setSearch(search?.trim());
              }}
              textInputStyle={styles.textInput}
              isSearch
              onSubmitEditing={() => {
                onHandleChangeKeyword(search?.trim());
              }}
              onSubmitSearch={() => {
                onHandleChangeKeyword(search?.trim());
              }}
            />
          </View>
          <View style={styles.boxParent}>
            <FlatList
              onEndReached={() => {
                handleLoadMore();
              }}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              keyExtractor={(item, index) => index.toString()}
              data={listData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                renderItemClassTopic(item, index)
              }
              contentContainerStyle={styles.contentContainerStyle}
              ListEmptyComponent={
                <ViewClassTopicEmpty
                  onPressExplore={() => {
                    // gotoSearchClass();
                  }}
                />
              }
            />
          </View>
          <View style={styles.viewBtnAdd}>
            <TouchableDebounce
              style={[
                styles.btnAddTopic,
                {
                  backgroundColor: Color.base_color,
                },
              ]}
              onPress={() => {
                setIsOpenModal(true);
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={styles.iconPlus} />
            </TouchableDebounce>
          </View>
          <RenderBottomAddClassTopic />
        </View>
      ) : (
        <ClassTopicDetail
          type={1}
          classTopicInfo={classTopicInfo}
          classInfo={classInfo}
          handleBack={(type) => {
            handleBack(type);
          }}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontal(20),
    position: 'relative',
  },
  textInput: {
    width: screenWidth - horizontal(20 * 2),
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: isTablet ? ITEM_HEIGHT_SLIDE * 0.2 : 1,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20.4,
  },
  avatarProfile: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  boxItem: {
    flexDirection: 'row',
  },
  displayName: {
    fontFamily: fonts.regular,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: horizontal(4),
  },
  boxTopic: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Color.color_width_featured_class,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(16),
    width: screenWidth - horizontal(20) * 2,
    marginTop: vertical(16),
  },
  boxParent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight * 0.6,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: Color.text_color_hover,
    marginHorizontal: horizontal(8),
    marginVertical: vertical(4),
  },
  textTime: {
    fontFamily: fonts.regular,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    color: Color.text_color_hover,
  },
  btnAddTopic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  iconPlus: {
    fontSize: 20,
    color: Color.white,
  },
  viewBtnAdd: {
    position: 'absolute',
    bottom: 50,
    right: 10,
    alignSelf: 'flex-end',
  },
});
export default ClassTopicGeneral;
