import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { View, StyleSheet} from 'react-native';
/*
export interface StarViewProps {
  style?: StyleProp<ViewStyle>;
  stars: number;
  size?: number;
  fullIcon?: string;
  halfIcon?: string;
  emptyIcon?: string;
}
*/

export default function StarView({
  style = undefined,
  stars,
  size = 15,
  iconSet = 'MaterialCommunityIcons',
  fullIcon = 'star',
  fullIconColor = "#ffd27d",
  halfIcon = 'star-half',
  halfIconColor = "#ffd27d",
  emptyIcon = 'star-outline',
  emptyIconColor = "#f0f0f0",
  passRef,
  ...passThroughProps
}) {
  let Icon = ({...props}) => <View {...props}></View>;
  
  const viewStyle = useMemo(() => [styles.row, style], [style]);
  const renderIcons = useCallback(

    (_stars, _size, icons = [], emptyStars = 5) => {
      if (typeof stars !== 'number') return null;
      if (typeof _size !== 'number') return null;

      if (_stars > 5) _stars = 5;
      if (_stars >= 1) {
        // 1 - 5
        icons.push(<Icon name={fullIcon} size={_size} key={`star-full${_stars}`} color={fullIconColor} />);
        return renderIcons(_stars - 1, _size, icons, emptyStars - 1);
      } else if (_stars >= 0.5) {
        // 0 - 1
        icons.push(<Icon name={halfIcon} size={_size} key={`star-half${_stars}`} color={halfIconColor} />);
        return renderIcons(_stars - 1, _size, icons, emptyStars - 1);
      }
      if (emptyStars > 0) {
        icons.push(<Icon name={emptyIcon} size={_size} key={`star-empty${emptyStars}`} color={emptyIconColor} />);
        return renderIcons(_stars, _size, icons, emptyStars - 1);
      }
      // 0
      return icons;
    },
    [emptyIcon, fullIcon, halfIcon, Icon],
  );

  useEffect(() => {
    Icon = ({...props}) => <View {...props}></View>;
  }, [iconSet]);

  if (stars == null || typeof stars !== 'number') return null;

  const icons = renderIcons(stars, size);
  return <View ref={passRef} style={viewStyle} {...passThroughProps}>{icons}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 1,
  },
});
