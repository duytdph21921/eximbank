import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import { Switch } from 'react-native-switch';

const TYPE_DOTS = 1;
const TYPE_SWITCH = 2;

const ItemSwitchDots = (props) => {
  /**
   * textItem: Nội dung của text.
   * type: loại switch toggle hay là dots.
   * trạng thái on hay off.
   */
  const { type, status, i18nKeyContext, containerStyle, onPress } = props;
  const [on, setOn] = useState(status);

  /**
   * Handle onpress switch toggle.
   */
  const onPressSwitch = () => {
    setOn(!on);
    onPress(!on);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <CMText style={styles.textContext} i18nKey={i18nKeyContext} />
      {type === TYPE_DOTS ? (
        <TouchableDebounce
          onPress={onPressSwitch}
          style={[
            styles.btnDots,
            {
              borderWidth: on ? 7 : 1,
              borderColor: on ? Color.base_color : Color.color_uncheck_answer,
            },
          ]}
        />
      ) : (
        <Switch
          value={on}
          onValueChange={onPressSwitch}
          disabled={false}
          activeText="On"
          inActiveText="Off"
          circleSize={28}
          barHeight={28}
          circleBorderWidth={1}
          backgroundActive={Color.base_color}
          backgroundInactive={Color.color_width_featured_class}
          circleActiveColor={Color.white}
          circleInActiveColor={Color.white}
          // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
          // changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
          innerCircleStyle={styles.circleStyle} // style for inner animated circle for what you (may) be rendering inside the circle
          outerCircleStyle={styles.containerStyle} // style for outer animated circle
          renderActiveText={false}
          renderInActiveText={false}
          switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
          switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
          switchWidthMultiplier={1.8} // multiplied by the `circleSize` prop to calculate total width of the Switch
          switchBorderRadius={28} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: vertical(10),
  },
  containerStyle: {
    borderColor: Color.color_width_featured_class,
  },
  circleStyle: {
    borderColor: Color.color_width_featured_class,
  },
  textContext: {
    fontSize: 14,
    color: Color.text_color,
    fontWeight: '400',
  },
  btnDots: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    backgroundColor: Color.white,
  },
});

export default ItemSwitchDots;
