import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import Colors from "colors";

interface IStartScreenProps {}

const StartScreen: React.FC<IStartScreenProps> = (props: IStartScreenProps) => {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}></Text>
        <ActivityIndicator size='large' color={Colors.Base} />
      </View>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.Title,
  }
});

export default StartScreen;
