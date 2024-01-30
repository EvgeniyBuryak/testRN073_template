import React from 'react';
import { StyleSheet, Text, Pressable, ViewStyle } from 'react-native';
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
    <Pressable
      disabled={disabled}
      style={({pressed}) => [
        {
          backgroundColor: disabled
              ? Colors.White
              : pressed
                ? Colors.PressedLoading
                : Colors.Default
        },
        styles.button, { width, height }, stylesView
      ]}
      onPress={onPress}
    >
      <Text style={
        [styles.buttonTitle, {
          color: disabled
              ? Colors.GrayL
              : Colors.White,
          fontSize,
        }
        ]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.Default,
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
  backgroundColor: Colors.Default,
  titleColor: '#fff',
  disabled: false,
  stylesView: {},
}

export default Button;
