import 'package:flutter/material.dart';
import 'features/profile/settings_screen.dart';


import 'core/routes/app_routes.dart';
import 'core/theme/app_theme.dart';

import 'features/splash/splash_screen.dart';
import 'features/onboarding/onboarding_screen.dart';

import 'features/auth/login_screen.dart';
import 'features/auth/signup_screen.dart';
import 'features/auth/forgot_password_screen.dart';

import 'features/main_navigation/main_navigation_screen.dart';

class ArtinovaApp extends StatelessWidget {
  const ArtinovaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,

      title: 'Artinova',

      theme: AppTheme.lightTheme,

      initialRoute: AppRoutes.splash,

      routes: {
        AppRoutes.settings: (context) => const SettingsScreen(),
        AppRoutes.splash: (context) =>
            const SplashScreen(),

        AppRoutes.onboarding: (context) =>
            const OnboardingScreen(),

        AppRoutes.login: (context) =>
            const LoginScreen(),

        AppRoutes.signup: (context) =>
            const SignupScreen(),

        AppRoutes.forgotPassword: (context) =>
            const ForgotPasswordScreen(),

        AppRoutes.home: (context) =>
            const MainNavigationScreen(),
      },
    );
  }
}