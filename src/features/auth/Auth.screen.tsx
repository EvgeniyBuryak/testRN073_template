import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import Button from '~/components/Button';
import { receiveOfferSpecial, sendFrontTest } from "./Auth.slice";
import { useDispatch, useSelector } from "react-redux";
import Colors from "~/styles/colors";
import CustomTextInput from "~/components/CustomTextInput";

interface IAuthScreenProps {}

let render = 0;

const AuthScreen: React.FC<IAuthScreenProps> = (props: IAuthScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm();

  const onSubmit = (data: any) => Alert.alert(JSON.stringify(data));
  const dispatch = useDispatch();
  const offerSpecial = useSelector((state) => state.auth.offerSpecial);

  useEffect(() => {
    dispatch(receiveOfferSpecial());
    console.log('456--->', offerSpecial);
  }, []);

  // console.log('isDirty---> ', isDirty)
  // console.log('dirtyFields---> ', dirtyFields)
  console.log('errors---> ', JSON.stringify(errors))

  render++;

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Добрый вечер</Text>
        <Text style={styles.description}>Для бронирования помещений заполните форму</Text>
      </View>
      <View style={styles.section}>
        <CustomTextInput
          control={control}
          name="firstName"
          placeholder="Ваше имя"
          // required={true} // TODO return
          pattern={/[а-яА-ЯёЁ]{1}/}
          textStyle={control._defaultValues.firstName?.length <= 0 ? { backgroundColor: Colors.GrayL } : {}}
        />
        {errors.firstName?.type === "required"
        ? <Text>Заполните поле</Text>
        : errors.firstName?.type === "pattern"
          ? <Text>Требуется имя.</Text>
          : null}
        <CustomTextInput
          control={control}
          name="lastName"
          placeholder="Ваша фамилия"
          pattern={/[а-яА-ЯёЁ]/}
        />
        <CustomTextInput
          control={control}
          name="phone"
          required={true}
          placeholder='Телефон'
          rules={{ required: true, pattern: /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/ }}
        />
        {errors.phone?.type === "required"
        ? <Text>Заполните поле</Text>
        : errors.phone?.type === "pattern"
          ? <Text>Требуется номер телефона.</Text>
          : null}
        <CustomTextInput
          control={control}
          name="email"
          rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
          placeholder="E-mail"
        />
        {errors.email?.type === "required"
        ? <Text>Заполните поле</Text>
        : errors.email?.type === "pattern"
          ? <Text>Требуется электронная почта.</Text>
          : null}
        <CustomTextInput
          control={control}
          name="number"
          placeholder="Укажите количество помещений"
          rules={{ required: true, pattern: /^[0-9]+$/ }}
          keyboardType="number-pad"
        />
        {errors.number?.type === "required"
          ? <Text>Заполните поле</Text>
          : errors.number?.type === "pattern"
            ? <Text>Только цифры</Text>
            : null}
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
  section: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: 456,
  },
});

export default AuthScreen;
