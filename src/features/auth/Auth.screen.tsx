import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import Button from '~/components/Button';
import { receiveOfferSpecial, sendFrontTest } from "./Auth.slice";
import { useDispatch, useSelector } from "react-redux";
import Colors from "~/styles/colors";
import CustomTextInput from "~/components/CustomTextInput";
import { getNoun } from "~/utils/getNoun";

interface IAuthScreenProps {}

let render = 0;
const HEIGHT_ERROR = 38;
const HEIGHT_NOT_ERROR = 24;

const AuthScreen: React.FC<IAuthScreenProps> = (props: IAuthScreenProps) => {
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<FormInputs>();

  const onSubmit = (data: any) => Alert.alert(JSON.stringify(data));
  const dispatch = useDispatch();
  const [isPress, setIsPress] = useState(false);
  const offerSpecial = useSelector((state) => state.auth.offerSpecial);

  useEffect(() => {
    dispatch(receiveOfferSpecial());
    console.log('123--->', offerSpecial);
  }, []);

  const watchButton = watch("number");

  // useEffect(() => {
  //   const subscription = watch((data) => {
  //     console.log(data);
  //   })

  //   return () => {
  //     subscription.unsubscribe();
  //   }
  // }, [watch]);

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
        <View style={{ height: errors?.firstName ? HEIGHT_ERROR : HEIGHT_NOT_ERROR }}>
          {errors?.firstName?.type === "required"
          ? <Text style={styles.error}>Заполните поле</Text>
          : errors?.firstName?.type === "pattern"
            ? <Text style={styles.error}>Требуется имя.</Text>
            : null}
        </View>
        <CustomTextInput
          control={control}
          name="lastName"
          placeholder="Ваша фамилия"
          pattern={/[а-яА-ЯёЁ]/}
        />
        <View style={{ height: errors?.lastName ? HEIGHT_ERROR : HEIGHT_NOT_ERROR }}></View>
        <CustomTextInput
          control={control}
          name="phone"
          required={true}
          placeholder='Телефон'
          rules={{ required: true, pattern: /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/ }}
        />
        <View style={{ height: errors?.phone ? HEIGHT_ERROR : HEIGHT_NOT_ERROR }}>
          {errors?.phone?.type === "required"
          ? <Text style={styles.error}>Заполните поле</Text>
          : errors?.phone?.type === "pattern"
            ? <Text style={styles.error}>Требуется номер телефона.</Text>
            : null}
        </View>
        <CustomTextInput
          control={control}
          name="email"
          rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
          placeholder="E-mail"
        />
        <View style={{ height: errors?.email ? HEIGHT_ERROR : HEIGHT_NOT_ERROR }}>
          {errors?.email?.type === "required"
          ? <Text style={styles.error}>Заполните поле</Text>
          : errors?.email?.type === "pattern"
            ? <Text style={styles.error}>Требуется электронная почта.</Text>
            : null}
        </View>
        <CustomTextInput
          control={control}
          name="number"
          placeholder="Укажите количество помещений"
          rules={{ required: true, pattern: /^[0-9]+$/ }}
          keyboardType="number-pad"
        />
        <View style={{ height: errors?.number ? HEIGHT_ERROR : HEIGHT_NOT_ERROR }}>
          {errors?.number?.type === "required"
            ? <Text style={styles.error}>Заполните поле</Text>
            : errors?.number?.type === "pattern"
              ? <Text style={styles.error}>Только цифры</Text>
              : null}
        </View>
        <Button
          title={watchButton
            ? `Забронировать ${getNoun(Number(getValues("number")), 'помещение', 'помещения', 'помещений')}`
            : 'Забронировать'
          }
          onPress={handleSubmit(onSubmit)}
          width={343}
          height={56}
          disabled={!watchButton}
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
  },
  error: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
    textAlign: 'right',
    color: Colors.Error,
    position: 'relative',
    top: 4,
  },
});

export default AuthScreen;
