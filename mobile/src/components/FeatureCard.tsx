import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

import GlassCard from "./GlassCard";
import { Colors, FontSize, FontWeight, Spacing } from "../theme";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
}

export default function FeatureCard({ icon, title }: FeatureCardProps) {
  return (
    <GlassCard style={styles.card}>
      {icon}

      <Text style={styles.title}>{title}</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
    gap: Spacing.sm,
    minHeight: 100,
  },

  title: {
    color: Colors.text,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    textAlign: "center",
  },
});
