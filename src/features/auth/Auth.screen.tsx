import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Control, useController, useForm } from "react-hook-form";
import Button from '~/components/Button';
import { receiveOfferSpecial, sendFrontTest } from "./Auth.slice";
import { useDispatch, useSelector } from "react-redux";

interface IAuthScreenProps {}

let render = 0;

const Input: React.FC<{ name: string, control: Control }> = ({ name, control }) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });
  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      style={styles.input}
    />
  );
}

const AuthScreen: React.FC<IAuthScreenProps> = (props: IAuthScreenProps) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => Alert.alert(JSON.stringify(data));
  const dispatch = useDispatch();
  const offerSpecial = useSelector((state) => state.auth.offerSpecial);

  useEffect(() => {
    dispatch(receiveOfferSpecial());
    console.log('456--->', offerSpecial);
  }, []);

  render++;

  return (
    <View style={styles.container}>
      <Text >First name</Text>
      <Input name="firstName" control={control} />
      <Text>Second name</Text>
      <Input name="lastName" control={control} />
      <Text>Render: {render}</Text>
      <Button
        title="Забронировать"
        onPress={handleSubmit(onSubmit)}
        width={343}
        height={56}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {

  },
});

export default AuthScreen;
