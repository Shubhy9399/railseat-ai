import { ReactNode, useRef } from "react";

import {
  Animated,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

import { Colors, Radius, Spacing, FontSize, FontWeight } from "../theme";

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function GradientButton({
  title,
  onPress,
  icon,
  loading = false,
  disabled = false,
  style,
}: GradientButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const isDisabled = disabled || loading;

  const animateScale = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  const handlePress = () => {
    if (isDisabled) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    onPress();
  };

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ scale }],
          opacity: isDisabled ? 0.5 : 1,
        },
      ]}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={() => animateScale(0.96)}
        onPressOut={() => animateScale(1)}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{
          disabled: isDisabled,
          busy: loading,
        }}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          {loading ? (
            <ActivityIndicator color={Colors.background} />
          ) : (
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>

              {icon}
            </View>
          )}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: Radius.xl,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
  },

  title: {
    color: Colors.background,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
});
