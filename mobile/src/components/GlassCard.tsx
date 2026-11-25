import { ReactNode } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";

import { Colors, Radius, Spacing } from "../theme";

interface GlassCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function GlassCard({ children, style }: GlassCardProps) {
  return (
    <BlurView intensity={20} tint="dark" style={[styles.container, style]}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    overflow: "hidden",
  },
});
