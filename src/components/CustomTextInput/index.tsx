import React from 'react';
import { KeyboardTypeOptions, StyleSheet, TextInput, TextStyle } from 'react-native';
import { Control, useController, FieldValues, RegisterOptions } from "react-hook-form";
import Colors from '~/styles/colors';

const CustomTextInput: React.FC<{
  name: string,
  control: Control<FieldValues>,
  placeholder?: string,
  required?: boolean,
  pattern?: RegExp,
  textStyle?: TextStyle,
  keyboardType?: KeyboardTypeOptions,
  rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined,
}> = ({
  name,
  control,
  required,
  pattern,
  textStyle,
  rules,
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
    <TextInput
      {...props}
      value={value}
      onChangeText={onChange}
      style={[styles.input, textStyle]}
      ref={ref}
      textAlign="left"
    />
  );
}

CustomTextInput.defaultProps = {
  required: false,
  keyboardType: 'default',
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: Colors.Gray,
    height: 56,
    padding: 16,
  },
});

export default CustomTextInput;
  