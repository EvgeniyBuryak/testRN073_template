import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Colors from 'colors';

interface IButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  titleColor?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  stylesView?: ViewStyle;
}

const Button: React.FC<IButtonProps> = ({
  title,
  onPress,
  disabled,
  backgroundColor,
  titleColor,
  width,
  height,
  fontSize,
  stylesView,
}: IButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, { backgroundColor, width, height }, stylesView]}
      onPress={onPress}
    >
      <Text style={[styles.buttonTitle, { color: titleColor, fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.Base // TODO change
  },
  buttonTitle: {
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.01,
  },
});

Button.defaultProps = {
  backgroundColor: Colors.Base, // TODO change
  titleColor: '#fff',
  disabled: false,
  stylesView: {},
}

export default Button;
