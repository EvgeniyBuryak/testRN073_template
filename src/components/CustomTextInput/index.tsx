import React from 'react';
import { StyleSheet, TextInput, TextStyle, Text, View } from 'react-native';
import { Control, useController, FieldValues, RegisterOptions } from "react-hook-form";
import Colors from '~/styles/colors';

type TextInputCustomProps =  TextInput & {
  textStyle?: TextStyle,
  name: string,
  control: Control<FieldValues>,
  required?: boolean,
  pattern?: RegExp,
  rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined,
  prompt?: string,
};

const TextInputCustom: React.FC<TextInputCustomProps> = ({
  name,
  control,
  required,
  pattern,
  textStyle,
  rules,
  prompt,
  ...props
}) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
    rules: rules || { required, pattern }
  });
  const { value, onChange, ref } = field;
  return (
    <View style={[styles.input, textStyle,
      { lineHeight: 56, padding: 6 }
    ]}>
      {prompt?.length && value?.length ? (
        <Text style={styles.prompt}>
          {prompt}
        </Text>
      ) : null}
        <TextInput
          {...props}
          value={value}
          onChangeText={onChange}
          style={
            prompt?.length && value?.length
            ? styles.text
            : {
              padding: 10
            }
          }
          ref={ref}
          textAlign="left"
        />
    </View>
  );
}

TextInputCustom.defaultProps = {
  required: false,
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 4,
    color: Colors.GrayD,
    borderColor: Colors.Gray,
    backgroundColor: Colors.Gray,
    height: 56,
    padding: 16,
  },
  prompt: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.GrayM,
    lineHeight: 16,
    paddingLeft: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.GrayD,
    lineHeight: 24,
    paddingLeft: 8,
    position: "relative",
    top: -8,
  },
});

export default TextInputCustom;
  