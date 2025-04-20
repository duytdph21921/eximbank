import React from 'react';
import TreeViewCustom from '@components/TreeViewCustom';
import Constant from '@utils/constants';

const TabDetailResult = (props) => {
  const { dataDetailResult, navigation, classInfo } = props;

  /**
   * On handle click item detail.
   * @param {*} content
   */
  const onViewClassContent = (content) => {
    navigation.navigate(Constant.DETAIL_LEARNING_RESULT_SCREEN, {
      classId: classInfo?.id,
      classContentId: content?.id,
      isLoadNew: true,
    });
  };

  return (
    <TreeViewCustom
      data={dataDetailResult}
      childrenKey="childs"
      onViewClassContent={onViewClassContent}
    />
  );
};

export default TabDetailResult;
