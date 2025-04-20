/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import React, { useLayoutEffect, useState, useCallback } from 'react';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import Constant from '@utils/constants';
import globalStyles from '@theme/globalStyles';
import fonts from '@assets/value/fonts';
import { horizontal, vertical } from '@utils/scales';
import CMTextInput from '@components/CMTextInput';
import { useDispatch, useSelector } from 'react-redux';
import TouchableDebounce from '@components/TouchableDebounce';
import { isTablet, screenHeight, screenWidth } from '@utils/platforms';
import { checkListEmpty } from '@utils/helpers';
import { Color } from '@theme/colors';
import { getUserShareContent, updateShare } from '@services/lms/lmscontent.api';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import BottomSheetViewUserShareContent from '@/screens/base/components/BottomSheetViewUserShareContent';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';

const PLACEHOLDER = {
  en: {
    placeholder: 'Enter the account or name of the person you want to share with',
  },
  vn: {
    placeholder: 'Nhập tài khoản hoặc tên người cần chia sẻ',
  },
};
const RenderUserShare = ({ item, index, listData, handleActionAddOrMinusUser }) => (
  <View>
    <View style={styles.itemSearch}>
      <View>
        <View>
          <CMText title={`${item?.username} - ${item?.displayName}`} style={styles.label} />
        </View>
        <View style={styles.itemSearch}>
          <CMText i18nKey="text-department-name" style={styles.title} />
          <CMText title={`: ${item?.organizeTrainingName}`} style={styles.title} />
        </View>
      </View>
      <View style={styles.itemView}>
        {listData.find((x) => x.username === item.username) != null ? (
          <TouchableDebounce onPress={() => handleActionAddOrMinusUser(0, item)}>
            <FontAwesomeIcon icon={faMinusCircle} style={styles.iconMinus} size={20} />
          </TouchableDebounce>
        ) : (
          <TouchableDebounce onPress={() => handleActionAddOrMinusUser(1, item)}>
            <FontAwesomeIcon icon={faPlusCircle} style={styles.iconPlus} size={20} />
          </TouchableDebounce>
        )}
      </View>
    </View>
    <View style={styles.line} />
  </View>
);
const DocumentShareScreen = (props) => {
  const { navigation, route } = props;
  const languageLocal = useSelector((state) => state.global.language);
  const contentDetail = route?.params?.item;
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [listData, setListData] = useState([]);
  const [listShare, setListShare] = useState('');
  const [listDataSearch, setListDataSearch] = useState([]);
  const [totalSearch, setTotalSearch] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [isSearch, setIsSearch] = useState();
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [model, setModel] = useState({
    offset,
    limit,
    keyword: search,
  });
  const onBack = () => {
    navigation.navigate(Constant.SEARCH_CONTENT_DETAIL, {
      contentDetail,
      dataBack: Math.random().toString(36).slice(2, 7),
    });
    return true;
  };

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText i18nKey="text-share-document" style={globalStyles.titleScreen} numberOfLines={2} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);
  const onHandleChangeKeyword = async (newModel, isLoadContinue = false) => {
    const response = await getUserShareContent(newModel);
    if (response?.status) {
      setTotalSearch(response?.metaData?.totalRecord ?? 0);
      if (isLoadContinue) {
        setOffset(offset + limit);
        setListDataSearch([...listDataSearch, ...(response?.data ?? [])]);
      } else {
        setListDataSearch(response?.data);
      }
    }
  };
  const handleActionAddOrMinusUser = (type, item) => {
    let newListShareString = '';
    if (type === 1) {
      let newListData = [...listData];
      const check = listData.find((x) => x.userId === item?.userId);
      if (check == null) {
        newListData = [item, ...newListData];
        const newListShare = [];
        newListData.forEach((e) => {
          newListShare.push(e.username);
        });
        newListShareString = newListShare.join(', ');
        newListShareString = `${newListShareString.slice(0, 30)}...`;
        setListData(newListData);
        setListShare(newListShareString);
        setTotal(newListData?.length);
      }
    } else {
      let newListData = [...listData];
      const check = newListData.find((x) => x.userId === item?.userId);
      if (check != null || check !== undefined) {
        newListData = newListData.filter((x) => x.userId !== item?.userId);
        const newListShare = [];
        newListData.forEach((e) => {
          newListShare.push(e.username);
        });
        newListShareString = newListShare.join(', ');
        newListShareString = `${newListShareString.slice(0, 30)}...`;
        setListData(newListData);
        setListShare(newListShareString);
        setTotal(newListData?.length);
      }
    }
  };
  const RenderBottomSheetExercise = useCallback(
    () => (
      <BottomSheetViewUserShareContent
        isOpenModal={isOpenModal}
        listData={listData}
        handleShareOnPress={() => {
          handleShare();
        }}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        handleChangeUserShare={(data) => {
          handleChangeUserShare(data);
        }}
      />
    ),
    [isOpenModal],
  );

  const handleShare = async () => {
    if (listData != null && listData.length > 0) {
      const listUsernameShare = [];
      listData.forEach((e) => {
        listUsernameShare.push(e.username);
      });
      const model = {
        contentId: contentDetail?.id,
        userNameShare: listUsernameShare,
      };
      const response = await updateShare(model);
      if (response?.status) {
        dispatch(
          updateShowDialogWarnAction({
            isShowModalWarn: true,
            isSigout: false,
            titleHeader: '',
            keyHeader: 'text-tab-notification',
            keyMessage: 'text-success-action',
            contentMessage: '',
            isShowCancel: false,
            isShowSubmit: false,
          }),
        );
        setTimeout(() => {
          navigation.navigate(Constant.SEARCH_CONTENT_DETAIL, {
            contentDetail,
            dataBack: Math.random().toString(36).slice(2, 7),
          });
        }, 1000);
      } else {
        dispatch(
          updateShowDialogWarnAction({
            isShowModalWarn: true,
            isSigout: false,
            titleHeader: '',
            keyHeader: 'text-tab-notification',
            keyMessage: 'text-internal-error',
            contentMessage: '',
            isShowCancel: false,
            isShowSubmit: false,
          }),
        );
      }
    } else {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-tab-notification',
          keyMessage: 'text-user-share-empty',
          contentMessage: '',
          isShowCancel: true,
          isShowSubmit: false,
        }),
      );
    }
  };
  const handleChangeUserShare = (data) => {
    const newListData = [...data];
    const newListShare = [];
    let newListShareString = '';
    newListData.forEach((e) => {
      newListShare.push(e.username);
    });
    newListShareString = newListShare.join(', ');
    newListShareString = `${newListShareString.slice(0, 30)}...`;
    setListData(newListData);
    setListShare(newListShareString);
    setTotal(newListData?.length);
  };
  /**
   * Load more.
   */
  const handleLoadMore = () => {
    if (!isLoadMore && !this.onEndReachedCalledDuringMomentum && listData?.length < totalSearch) {
      setLoadMore(true);
      const newModel = { ...model, offset: offset + limit };
      onHandleChangeKeyword(newModel, true);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxView}>
        <CMText i18nKey="text-upload-document" style={styles.label} />
        <CMText title={`: ${contentDetail?.title}`} style={styles.title} />
      </View>
      <View style={styles.boxView}>
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
            setIsSearch(false);
          }}
          textInputStyle={styles.textInput}
          isSearch
          onSubmitEditing={() => {
            const newModel = {
              ...model,
              keyword: search?.trim(),
              offset: 0,
              limit: 20,
            };
            setOffset(0);
            setModel(newModel);
            onHandleChangeKeyword(newModel);
            setIsSearch(true);
          }}
          onSubmitSearch={() => {
            const newModel = {
              ...model,
              keyword: search?.trim(),
              offset: 0,
              limit: 20,
            };
            setOffset(0);
            setModel(newModel);
            onHandleChangeKeyword(newModel);
            setIsSearch(true);
          }}
        />
      </View>
      <View style={styles.boxView}>
        <CMText i18nKey="text-send-to" style={styles.label} />
        <CMText title={total.toString()} style={styles.label} />
        <CMText i18nKey="text-people" style={styles.label} />
      </View>
      {total > 0 && (
        <View style={styles.boxViewDetail}>
          <CMText title={listShare} style={styles.title} />
          <TouchableDebounce
            onPress={() => {
              setIsOpenModal(true);
            }}
          >
            <CMText i18nKey="text-header-mark-detail" style={styles.textShare} />
          </TouchableDebounce>
        </View>
      )}
      {checkListEmpty(listDataSearch) && (
        <View style={styles.boxSearch}>
          <CMText i18nKey="text-suggestions" style={styles.suggestLabel} />
          <FlatList
            onEndReached={() => {
              handleLoadMore();
            }}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            onEndReachedThreshold={0.01}
            keyExtractor={(item, index) => index.toString()}
            data={listDataSearch}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RenderUserShare
                item={item}
                index={index}
                listData={listData}
                handleActionAddOrMinusUser={handleActionAddOrMinusUser}
              />
            )}
            numColumns={1}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
      )}
      {isSearch && (!listDataSearch || listDataSearch.length === 0) && (
        <View style={styles.boxView}>
          <CMText i18nKey="text-not-found-account" style={styles.textNotFoundUser} />
        </View>
      )}
      <TouchableDebounce onPress={() => handleShare()} style={styles.btnShare}>
        <CMText i18nKey="text-share" style={styles.textBtn} />
      </TouchableDebounce>
      <RenderBottomSheetExercise />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  boxView: {
    flexDirection: 'row',
    marginHorizontal: horizontal(20),
    marginTop: vertical(20),
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: '400',
  },
  textInput: {
    width: '100%',
    borderWidth: 0,
  },
  textShare: {
    textDecorationLine: 'underline',
  },
  boxViewDetail: {
    flexDirection: 'row',
    marginHorizontal: horizontal(20),
    marginTop: vertical(20),
    justifyContent: 'space-between',
  },
  boxSearch: {
    marginHorizontal: horizontal(20),
    marginTop: vertical(20),
    height: screenHeight * 0.5,
  },
  itemSearch: {
    flexDirection: 'row',
    marginTop: vertical(10),
  },
  boxItemSearch: {
    marginTop: vertical(15),
  },
  line: {
    height: 1,
    backgroundColor: Color.color_width_featured_class,
    marginTop: vertical(5),
  },
  itemView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  iconPlus: {
    color: Color.base_color,
  },
  iconMinus: {
    color: Color.red,
  },
  suggestLabel: {
    fontFamily: fonts.bold,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: vertical(20),
  },
  btnShare: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    width: screenWidth - horizontal(24 * 2),
    height: isTablet ? 65 : 56,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(10),
    borderRadius: 100,
    backgroundColor: Color.base_color,
    marginTop: 8,
  },
  textBtn: {
    textAlign: 'center',
    color: Color.white,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
  },
  textNotFoundUser: {
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

export default DocumentShareScreen;
