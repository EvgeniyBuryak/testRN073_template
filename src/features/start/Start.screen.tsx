import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import Colors from "colors";
import { receiveOfferSpecial, setAuthorizationStatus } from "~/features/auth/Auth.slice";
import { useDispatch, useSelector } from "react-redux";

interface IStartScreenProps {}

const StartScreen: React.FC<IStartScreenProps> = (props: IStartScreenProps) => {
  // const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setAuthorizationStatus(false));
      // dispatch(receiveOfferSpecial());
      console.log('123--->')
    }, 3000);
  }, []);

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
