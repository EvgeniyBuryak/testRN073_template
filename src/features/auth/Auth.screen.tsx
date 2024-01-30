import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Control, useController, useForm, Controller, FieldValues } from "react-hook-form";
import Button from '~/components/Button';
import { receiveOfferSpecial, sendFrontTest } from "./Auth.slice";
import { useDispatch, useSelector } from "react-redux";
import Colors from "~/styles/colors";

interface IAuthScreenProps {}

let render = 0;

const Input: React.FC<{
  name: string,
  control: Control<FieldValues>,
  placeholder?: string,
  required?: boolean,
  pattern?: RegExp,
}> = ({
  control,
  placeholder,
  required,
  pattern,
  ...props
}) => {
  // const { field } = useController({
    // control,
    // defaultValue: '',
    // name,
    // rules: { required, pattern }
  // });
  return (
    <>
    <Controller
      {...props}
      control={control}
      rules={{ required, pattern }}
      render={({ field: { value, onChange, ref }}) => (
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles.input}
          ref={ref}
          placeholder={placeholder}
        />
      )}
    />
    </>
  );
}

const AuthScreen: React.FC<IAuthScreenProps> = (props: IAuthScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      number: "",
    },
  });
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
      <View style={styles.top}>
        <Text style={styles.title}>Добрый вечер</Text>
        <Text style={styles.description}>Для бронирования помещений заполните форму</Text>
      </View>
      <View style={styles.section}>
        <Input
          control={control}
          name="firstName"
          placeholder="Ваше имя"
          required={true}
          pattern={/[а-яА-ЯёЁ]{1}/}
        />
        {errors.firstName && <Text>Требуется имя.</Text>}
        <Input
          control={control}
          name="lastName"
          placeholder="Ваша фамилия"
          pattern={/[а-яА-ЯёЁ]/}
        />
        <Input
          control={control}
          name="phone"
          required={true}
          placeholder='Телефон'
        />
        {errors.phone && <p>Требуется номер телефона.</p>}
        <Input
          control={control}
          name="email"
          required={true}
          placeholder="E-mail"
        />
        {errors.email && <p>Требуется почта.</p>}
        <Input
          control={control}
          name="number"
          required={true}
          placeholder="Укажите количество помещений"
        />
        {errors.number && <p>Введите количество</p>}
        <Button
          title="Забронировать"
          onPress={handleSubmit(onSubmit)}
          width={343}
          height={56}
        />
      </View>
      <Text>Render: {render}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    margin: 16,
  },
  top: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: 178,
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 42,
    color: Colors.Black,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.Black,
  },
  input: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: Colors.Gray,
    height: 56,
  },
  section: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: 456,
  },
});

export default AuthScreen;
