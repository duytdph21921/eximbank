import { createStackNavigator } from '@react-navigation/stack';
import Constant from '@utils/constants';
import useDefaultConfig from '@hooks/useDefaultConfig';
import { View } from 'react-native';
import ClassDetailScreen from './screens/classdetail/ClassDetailScreen';
import StudyScreen from './screens/StudyScreen';
import EducationProgramDetailScreen from './screens/education_program_detail/EducationProgramDetailScreen';
import SurveyScreen from './screens/classdetail/survey/SurveyScreen';
import SurveyDetailScreen from './screens/classdetail/survey_detail/SurveyDetailScreen';
import SurveyResultScreen from './screens/classdetail/survey_result/SurveyResultScreen';
import SurveyResultDetailScreen from './screens/classdetail/survey_result_detail/SurveyResultDetailScreen';
import HistoryAccessScreen from './screens/classdetail/history_access_screen/HistoryAccessScreen';
import AggregateScoreScreen from './screens/classdetail/aggregate_score_screeen/AggregateScoreScreen';
import VideoMediaScreen from './screens/classdetail/video_media_screen/VideoMediaScreen';
import MyTestInClassInforScreen from './screens/my_test/MyTestInClassInforScreen';
import MyTestQuestionInClassScreen from './screens/my_test_question_in_class/MyTestQuestionInClassScreen';
import MyTestResultInClassScreen from './screens/my_test_result_in_class/MyTestResultInClassScreen';
import ViewContentScreen from './screens/classdetail/content/ViewContentScreen';
import AggregateScoreDetailScreen from './screens/classdetail/aggregate_score_detail_screen/AggregateScoreDetailScreen';
import EducationProgramClassDetailScreen from './screens/education_program_detail/class/EducationProgramClassDetailScreen';

const Lms = createStackNavigator();
const renderHeaderLeft = () => <View />;
export const LmsStack = (props) => {
  const defaultConfig = useDefaultConfig(props);
  return (
    <Lms.Navigator
      initialRouteName={Constant.STUDY_SCREEN}
      screenOptions={defaultConfig}
    >
      <Lms.Screen
        name={Constant.STUDY_SCREEN}
        component={StudyScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerLeft: renderHeaderLeft,
        }}
      />
      <Lms.Screen
        name={Constant.CLASS_DETAIL_SCREEN}
        component={ClassDetailScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <Lms.Screen
        name={Constant.EDU_PROGRAM_DETAIL_SCREEN}
        component={EducationProgramDetailScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <Lms.Screen
        name={Constant.SURVEY_SCREEN}
        component={SurveyScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <Lms.Screen
        name={Constant.SURVEY_DETAIL_SCREEN}
        component={SurveyDetailScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <Lms.Screen
        name={Constant.SURVEY_RESULT_SCREEN}
        component={SurveyResultScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <Lms.Screen
        name={Constant.SURVEY_RESULT_DETAIL_SCREEN}
        component={SurveyResultDetailScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <Lms.Screen
        name={Constant.HISTORY_ACCESS_SCREEN}
        component={HistoryAccessScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <Lms.Screen
        name={Constant.AGGREGATE_SCORE_SCREEN}
        component={AggregateScoreScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <Lms.Screen
        name={Constant.VIDEO_MEDIA_SCREEN}
        component={VideoMediaScreen}
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
      />
      <Lms.Screen
        name={Constant.MY_TEST_IN_CLASS_INFORMATION_SCREEN}
        component={MyTestInClassInforScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <Lms.Screen
        name={Constant.MY_TEST_IN_CLASS_QUESTION_SCREEN}
        component={MyTestQuestionInClassScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <Lms.Screen
        name={Constant.MY_TEST_RESULT_IN_CLASS_SCREEN}
        component={MyTestResultInClassScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <Lms.Screen
        name={Constant.CLASS_CONTENT_VIEW_SCREEN}
        component={ViewContentScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
          headerLeft: renderHeaderLeft,
        }}
      />
      <Lms.Screen
        name={Constant.DETAIL_LEARNING_RESULT_SCREEN}
        component={AggregateScoreDetailScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
      <Lms.Screen
        name={Constant.EDU_CLASS_DETAIL_SCREEN}
        component={EducationProgramClassDetailScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
        }}
      />
    </Lms.Navigator>
  );
};
