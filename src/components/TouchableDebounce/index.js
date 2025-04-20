/* eslint-disable react/function-component-definition */
import React from 'react';
import { TouchableOpacity } from 'react-native';
// import _ from "lodash";
// const _ = require('lodash');
import debounce from 'lodash/debounce';

// TouchableDebounce.propTypes = {
//   onPress: PropTypes.func,
//   style: ViewPropTypes.style,
//   handleFirstTap: PropTypes.func,
//   debounceTime: PropTypes.number,
// };

// TouchableDebounce.defaultProps = {
//   style: {},
//   handleFirstTap: () => null,
//   debounceTime: 500,
// };

export default function TouchableDebounce({ ...props }) {
  const onPressFunc = () => {
    if (props.onPress) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      {...props}
      onPress={debounce(onPressFunc, 500, {
        leading: true,
        trailing: false,
      })}
    >
      {props.children}
    </TouchableOpacity>
  );
}
