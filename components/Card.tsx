import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Colors from "../constants/colors";

export interface CardProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const Card = ({ style, children }: CardProps) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: Colors.ternary,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    width: "90%",
    minHeight: 50,
  },
});

export default Card;
