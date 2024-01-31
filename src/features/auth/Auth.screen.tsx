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
  console.log('control---> ', JSON.stringify(control))

  render++;

  const renderError = (field: string, secondaryMessage: string) => {
    return (
      <View style={{ height: errors[field] ? HEIGHT_ERROR : HEIGHT_NOT_ERROR }}>
        {errors[field]?.type === "required"
        ? <Text style={styles.error}>Заполните поле</Text>
        : errors[field]?.type === "pattern"
          ? <Text style={styles.error}>{secondaryMessage}</Text>
          : null}
      </View>
    );
  };

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
          prompt={"Имя"}
          required={true}
          // pattern={/^[а-яА-ЯёЁ]+$/} // TODO return
          pattern={/^[a-zA-Z]+$/}
          textStyle={errors?.firstName
            ? { borderColor: Colors.Error, backgroundColor: Colors.BackError }
            : watch("firstName")
              ? { borderColor: Colors.Gray, backgroundColor: Colors.GrayLL }
                : {}
          }
          placeholderTextColor={errors?.firstName ? Colors.Error : Colors.GrayM}
        />
        {renderError("firstName", "Требуется имя.")}
        <CustomTextInput
          control={control}
          name="lastName"
          placeholder="Ваша фамилия"
          prompt={"Фамилия"}
          pattern={/^[а-яА-ЯёЁ]+$/}
        />
        {renderError("lastName", "Требуется фамилия.")}
        <CustomTextInput
          control={control}
          name="phone"
          required={true}
          placeholder='Телефон'
          prompt={"Телефон"}
          rules={{ required: true, pattern: /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/ }}
          textStyle={errors?.phone
            ? { borderColor: Colors.Error, backgroundColor: Colors.BackError }
            : watch("phone")
              ? { borderColor: Colors.Gray, backgroundColor: Colors.GrayLL }
                : {}
          }
          placeholderTextColor={errors?.phone ? Colors.Error : Colors.GrayM}
        />
        {renderError("phone", "Требуется номер телефона.")}
        <CustomTextInput
          control={control}
          name="email"
          rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
          placeholder="E-mail"
          prompt={"E-mail"}
          textStyle={errors?.email
            ? { borderColor: Colors.Error, backgroundColor: Colors.BackError }
            : watch("email")
              ? { borderColor: Colors.Gray, backgroundColor: Colors.GrayLL }
                : {}
          }
          placeholderTextColor={errors?.email ? Colors.Error : Colors.GrayM}
        />
        {renderError("email", "Требуется электронная почта.")}
        <CustomTextInput
          control={control}
          name="number"
          placeholder="Укажите количество помещений"
          rules={{ required: true, pattern: /^[0-9]+$/ }}
          keyboardType="number-pad"
          textStyle={errors?.number
            ? { borderColor: Colors.Error, backgroundColor: Colors.BackError }
            : watch("number")
              ? { borderColor: Colors.Gray, backgroundColor: Colors.GrayLL }
                : {}
          }
          placeholderTextColor={errors?.number ? Colors.Error : Colors.GrayM}
        />
        {renderError("number", "Вводить только цифры.")}
        <Button
          title={watch("number")
            ? `Забронировать ${getNoun(Number(getValues("number")), 'помещение', 'помещения', 'помещений')}`
            : 'Забронировать'
          }
          onPress={handleSubmit(onSubmit)}
          width={343}
          height={56}
          disabled={!watch(["firstName", "phone", "email", "number"])}
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
