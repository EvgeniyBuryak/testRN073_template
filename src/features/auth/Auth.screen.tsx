import React, { useCallback, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import Button from '~/components/Button';
import { receiveOfferSpecial, sendFrontTest } from "./Auth.slice";
import { useDispatch, useSelector } from "react-redux";
import Colors from "~/styles/colors";
import CustomTextInput from "~/components/CustomTextInput";
import { getNoun } from "~/utils/getNoun";
import { getTimesOfDay, getHours } from "~/utils/getTime";

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
    setFocus,
    setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<FormInputs>({
    mode: "onBlur",
  });
  // const offerSpecial = useSelector((state) => state.auth.offerSpecial); // get array images
  const resultFrontTest = useSelector((state) => state.auth.resultFrontTest);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(receiveOfferSpecial());
  }, [dispatch]);

  const onSubmit = (data: any) => {
    data.time = getHours();
    dispatch(sendFrontTest(data));
    console.log('data--->', JSON.stringify(data));
    // Alert.alert(JSON.stringify(resultFrontTest));
  };

  const receiveAllPtoho = useCallback((data: TOfferSpecial[]) => data.map(item => {
    return {
      id_attachments: item.id,
      filename: item.title,
      content: `https:${item?.mobile}`,
    }
  }), []);

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
  console.log('resultFrontTest--->', JSON.stringify(resultFrontTest));

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
        <Text style={styles.title}>{getTimesOfDay()}</Text>
        <Text style={styles.description}>Для бронирования помещений заполните форму</Text>
      </View>
      <View style={styles.section}>
        <CustomTextInput
          control={control}
          name="firstName"
          placeholder="Ваше имя"
          prompt={"Имя"}
          // pattern={/^[а-яА-ЯёЁ]+$/} // TODO return
          rules={{ required: true, pattern: /^[a-zA-Z]+$/ }}
          textStyle={errors?.firstName
            ? { borderColor: Colors.Error, backgroundColor: Colors.BackError }
            : watch("firstName")
              ? { borderColor: Colors.Gray, backgroundColor: Colors.GrayLL }
              : {}
          }
          placeholderTextColor={errors?.firstName ? Colors.Error : Colors.GrayM}
          onSubmitEditing={() => {
            setFocus("lastName");
          }}
        />
        {renderError("firstName", "Требуется имя.")}
        <CustomTextInput
          control={control}
          name="lastName"
          placeholder="Ваша фамилия"
          prompt={"Фамилия"}
          // pattern={/^[а-яА-ЯёЁ]+$/} // TODO return
          rules={{ required: true, pattern: /^[a-zA-Z]+$/ }}
          textStyle={errors?.lastName
            ? { borderColor: Colors.Error, backgroundColor: Colors.BackError }
            : watch("lastName")
              ? { borderColor: Colors.Gray, backgroundColor: Colors.GrayLL }
              : {}
          }
          onSubmitEditing={() => {
            setFocus("phone");
          }}
        />
        {renderError("lastName", "Требуется фамилия.")}
        <CustomTextInput
          control={control}
          name="phone"
          placeholder='Телефон'
          prompt={"Телефон"}
          rules={{ required: true, pattern: /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/ }} // prompt: +7 (999) 111-22-33
          textStyle={errors?.phone
            ? { borderColor: Colors.Error, backgroundColor: Colors.BackError }
            : watch("phone")
              ? { borderColor: Colors.Gray, backgroundColor: Colors.GrayLL }
              : {}
          }
          placeholderTextColor={errors?.phone ? Colors.Error : Colors.GrayM}
          onSubmitEditing={() => {
            setFocus("mail");
          }}
        />
        {renderError("phone", "Требуется номер телефона.")}
        <CustomTextInput
          control={control}
          name="mail"
          rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
          placeholder="E-mail"
          prompt={"E-mail"}
          textStyle={errors?.mail
            ? { borderColor: Colors.Error, backgroundColor: Colors.BackError }
            : watch("mail")
              ? { borderColor: Colors.Gray, backgroundColor: Colors.GrayLL }
              : {}
          }
          placeholderTextColor={errors?.mail ? Colors.Error : Colors.GrayM}
          onSubmitEditing={() => {
            setFocus("flatsCount");
          }}
          
        />
        {renderError("mail", "Требуется электронная почта.")}
        <CustomTextInput
          control={control}
          name="flatsCount"
          placeholder="Укажите количество помещений"
          rules={{ required: true, pattern: /^[0-9]+$/ }}
          keyboardType="number-pad"
          textStyle={errors?.flatsCount
            ? { borderColor: Colors.Error, backgroundColor: Colors.BackError }
            : watch("flatsCount")
              ? { borderColor: Colors.Gray, backgroundColor: Colors.GrayLL }
              : {}
          }
          placeholderTextColor={errors?.flatsCount ? Colors.Error : Colors.GrayM}
        />
        {renderError("flatsCount", "Вводить только цифры.")}
        <Button
          title={watch("flatsCount")
            ? `Забронировать ${getNoun(Number(getValues("flatsCount")), 'помещение', 'помещения', 'помещений')}`
            : 'Забронировать'
          }
          onPress={handleSubmit(onSubmit)}
          width={343}
          height={56}
          disabled={!watch(["firstName", "phone", "mail", "flatsCount"] && isLoading)}
          loading={isLoading}
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
    backgroundColor: Colors.GrayLL,
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
