/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TabNavigation } from '@navigations/UserStack/TabNavigation';
import useDefaultConfig from '@hooks/useDefaultConfig';
import Constant from '@utils/constants';
import { ProfileStack } from '@navigations/UserStack/ProfileStack';
import NotificationScreen from '@base/notifications/NotificationScreen';
import NotificationDetailScreen from '@base/notifications/NotificationDetailScreen';
import ClassCategoryScreen from '@base/search/class/class_category/ClassCategoryScreen';
import SearchClassByCategoryScreen from '@base/search/class/search_class_by_category/SearchClassByCategoryScreen';
import DocumentCategoryScreen from '@base/search/document/document_category/DocumentCategoryScreen';
import ExamCategoryScreen from '@base/search/exam/exam_category/ExamCategoryScreen';
import SearchContentByCategoryScreen from '@base/search/document/search_content_by_category/SearchContentByCategoryScreen';
import SearchExamByCategoryScreen from '@base/search/exam/search_exam_by_category/SearchExamByCategoryScreen';
import DocumentDetailScreen from '@base/search/document/document_detail/DocumentDetailScreen';
import ExamDetailScreen from '@base/search/exam/exam_detail/ExamDetailScreen';
import DocumentViewScreen from '@base/search/document/document_detail/DocumentViewScreen';
import TrainingCategoryScreen from '@base/search/training/training_category/TrainingCategoryScreen';
import SearchTrainingByCategoryScreen from '@base/search/training/search_training_by_category/SearchTrainingByCategoryScreen';
import TrainingDetailSreen from '@base/search/training/training_detail/TrainingDetailSreen';
import TrainingDetailSubjectScreen from '@base/search/training/training_detail_subject/TrainingDetailSubjectScreen';
import QRCodeScreen from '@base/qrcode_screen/QRCodeScreen';
import { FrequentlyQuestionScreen, TermScreen, HelpCenterScreen, FrequentlyQuestionCloneScreen, SupportCenterScreen } from 'module-account';
import DocumentShareScreen from '@base/search/document/document_share/DocumentShareScreen';
import ClassSearchDetailScreen from '@base/search/class/class_detail/ClassSearchDetailScreen';
import ExamInformation from '@base/search/exam/exam_detail/ExamInformation';

const User = createStackNavigator();
export const UserStack = (props) => {
  const defaultConfig = useDefaultConfig(props);
  return (
    <User.Navigator screenOptions={defaultConfig}>
      <User.Screen
        name={Constant.BOTTOM_TAB}
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <User.Screen
        name={Constant.PROFILE_STACK}
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
      <User.Screen
        name={Constant.SEARCH_CLASS_DETAIL}
        component={ClassSearchDetailScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.NOTIFICATION_DETAIL_SCREEN}
        component={NotificationDetailScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <User.Screen
        name={Constant.CLASS_CATEGORY_SCREEN}
        component={ClassCategoryScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.SEARCH_CLASS_BY_CATEGORY}
        component={SearchClassByCategoryScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.CONTENT_CATEGORY_SCREEN}
        component={DocumentCategoryScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.CONTENT_CATEGORY_EXAM_SCREEN}
        component={ExamCategoryScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.SEARCH_CONTENT_BY_CATEGORY}
        component={SearchContentByCategoryScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.SEARCH_CONTENT_BY_CATEGORY_EXAM}
        component={SearchExamByCategoryScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.SEARCH_CONTENT_DETAIL}
        component={DocumentDetailScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.SEARCH_EXAM_DETAIL}
        component={ExamDetailScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.CONTENT_VIEW_DETAIL}
        component={DocumentViewScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.SEARCH_TRAINING_CATEGORY_SCREEN}
        component={TrainingCategoryScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.SEARCH_TRAINING_BY_CATEGORY_SCREEN}
        component={SearchTrainingByCategoryScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.SEARCH_TRAINING_DETAIL_SCREEN}
        component={TrainingDetailSreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.SEARCH_TRAINING_DETAIL_SUBJECT_SCREEN}
        component={TrainingDetailSubjectScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />

      <User.Screen
        name={Constant.EXAM_INFORMATION_SCREEN}
        component={ExamInformation}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.QRCODE_SCREEN}
        component={QRCodeScreen}
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
      />
      <User.Screen
        name={Constant.TERM_SCREEN}
        component={TermScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <User.Screen
        name={Constant.HELP_CENTER_SCREEN}
        component={HelpCenterScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <User.Screen
        name={Constant.FREQUENTLY_QUESTION_SCREEN}
        component={FrequentlyQuestionScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <User.Screen
        name={Constant.SEARCH_CONTENT_SHARE}
        component={DocumentShareScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <User.Screen
        name={Constant.SUPPORT_CENTER_SCREEN}
        component={SupportCenterScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />

      <User.Screen
        name={Constant.FREQUENTLY_ASKED_QUESTIONS}
        component={FrequentlyQuestionCloneScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
    </User.Navigator>
  );
};
