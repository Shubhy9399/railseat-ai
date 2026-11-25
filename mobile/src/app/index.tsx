import { useEffect, useRef } from "react";

import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import {
  TrainFront,
  Box,
  Sparkles,
  Ticket,
  ArrowRight,
} from "lucide-react-native";

import GradientButton from "../components/GradientButton";
import FeatureCard from "../components/FeatureCard";

import { Colors, Spacing, FontSize, FontWeight } from "../theme";

export default function Index() {
  const router = useRouter();

  // Entrance animation values
  const opacity = useRef(new Animated.Value(0)).current;

  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => animation.stop();
  }, [opacity, translateY]);

  return (
    <View style={styles.container}>
      {/* Cinematic background */}
      <ImageBackground
        source={require("../../assets/images/train-hero.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            Colors.background,
            "transparent",
            "rgba(5, 13, 25, 0.3)",
            Colors.background,
          ]}
          locations={[0, 0.25, 0.65, 1]}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity,
                transform: [{ translateY }],
              },
            ]}
          >
            {/* Brand */}
            <View style={styles.brand}>
              <TrainFront size={56} color={Colors.primary} strokeWidth={1.8} />

              <Text style={styles.logo}>
                RailSeat <Text style={styles.logoAccent}>AI</Text>
              </Text>

              <Text style={styles.tagline}>The future of railway travel</Text>
            </View>

            {/* Space for train artwork */}
            <View style={styles.heroSpace} />

            {/* Main content */}
            <View style={styles.details}>
              <Text style={styles.heading}>
                Your journey begins{"\n"}
                before you board.
              </Text>

              <Text style={styles.description}>
                Explore train interiors, choose your preferred berth and travel
                smarter with AI.
              </Text>

              {/* Feature cards */}
              <View style={styles.features}>
                <FeatureCard
                  icon={<Box size={28} color={Colors.primary} />}
                  title="Explore in 3D"
                />

                <FeatureCard
                  icon={<Sparkles size={28} color={Colors.primary} />}
                  title="AI Seat Advice"
                />

                <FeatureCard
                  icon={<Ticket size={28} color={Colors.primary} />}
                  title="Smart Booking"
                />
              </View>

              {/* Get Started */}
              <GradientButton
                title="Get Started"
                onPress={() => router.push("./home")}
                icon={<ArrowRight size={24} color={Colors.background} />}
              />

              <Text style={styles.footer}>A smarter way to travel.</Text>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "65%",
  },

  safeArea: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    padding: Spacing.xl,
  },

  content: {
    flex: 1,
  },

  brand: {
    alignItems: "center",
    gap: Spacing.sm,
    paddingTop: Spacing.lg,
  },

  logo: {
    color: Colors.white,
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extraBold,
    fontStyle: "italic",
  },

  logoAccent: {
    color: Colors.primary,
  },

  tagline: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    textAlign: "center",
  },

  heroSpace: {
    flex: 1,
    minHeight: 200,
  },

  details: {
    gap: Spacing.xl,
  },

  heading: {
    color: Colors.white,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    textAlign: "center",
    lineHeight: 40,
  },

  description: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    textAlign: "center",
    lineHeight: 24,
  },

  features: {
    flexDirection: "row",
    gap: Spacing.sm,
  },

  footer: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    textAlign: "center",
    paddingBottom: Spacing.sm,
  },
});
