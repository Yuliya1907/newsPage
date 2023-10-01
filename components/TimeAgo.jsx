import React from 'react';
import {View, Text} from 'react-native';
import {formatDistanceToNow} from 'date-fns';

export default function TimeAgo({timestamp}) {
  const formattedTimeAgo = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });

  return (
    <View>
      <Text>{formattedTimeAgo}</Text>
    </View>
  );
}
