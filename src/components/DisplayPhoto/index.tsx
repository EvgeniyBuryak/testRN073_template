import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import Colors from '~/styles/colors';

interface IDisplayPhotoProps {
  data: TOverviewPhoto[];
}

const DisplayPhoto = (props: IDisplayPhotoProps) => {
  const selfImageViewer = (data: TOverviewPhoto[]) => {
    return (
      <ImageViewer
        style={{ flex: 1 }}
        imageUrls={
         data?.reduce((acc: IImageInfo[], curr) => {
            return [...acc, {
              url: curr.content,
              width: Dimensions.get('screen').width,
            }]
         }, [])
        }
        // renderFooter={(currIndex) => (
        //   <View style={{ padding: 10 }}>
        //     <Text style={styles.footerText}>{data[currIndex].filename}</Text>
        //   </View>
        // )}
      />
    );
  };

  return (
    <View style={styles.screenContainer}>
      {selfImageViewer(props.data)}
    </View>
  );
};


const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    width: '100%',
  },
  footerText: {
    color: Colors.Gray,
    fontSize: 18,
    backgroundColor: Colors.Black,
  },
});

export default DisplayPhoto;
