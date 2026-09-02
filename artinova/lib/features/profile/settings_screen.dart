import 'package:flutter/material.dart';

import '../../core/constants/app_colors.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() =>
      _SettingsScreenState();
}

class _SettingsScreenState
    extends State<SettingsScreen> {
  bool notificationsEnabled = true;
  bool marketAlertsEnabled = true;
  bool aiSuggestionsEnabled = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text(
            'Preferences',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 10),

          _SettingSwitch(
            title: 'Notifications',
            subtitle: 'Receive app notifications',
            value: notificationsEnabled,
            onChanged: (value) {
              setState(() {
                notificationsEnabled = value;
              });
            },
          ),

          _SettingSwitch(
            title: 'Market Alerts',
            subtitle:
                'Get notified about new opportunities',
            value: marketAlertsEnabled,
            onChanged: (value) {
              setState(() {
                marketAlertsEnabled = value;
              });
            },
          ),

          _SettingSwitch(
            title: 'AI Suggestions',
            subtitle:
                'Receive AI-powered product suggestions',
            value: aiSuggestionsEnabled,
            onChanged: (value) {
              setState(() {
                aiSuggestionsEnabled = value;
              });
            },
          ),

          const SizedBox(height: 25),

          const Text(
            'Account',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 10),

          _SettingTile(
            icon: Icons.lock_outline,
            title: 'Change Password',
            onTap: () {
              ScaffoldMessenger.of(context)
                  .showSnackBar(
                const SnackBar(
                  content: Text(
                    'Password management will be connected to the backend.',
                  ),
                ),
              );
            },
          ),

          _SettingTile(
            icon: Icons.language_outlined,
            title: 'Language',
            trailing: const Text('English'),
            onTap: () {},
          ),

          _SettingTile(
            icon: Icons.info_outline,
            title: 'About Artinova',
            onTap: () {
              showAboutDialog(
                context: context,
                applicationName: 'Artinova',
                applicationVersion: '1.0.0',
                applicationIcon: const Icon(
                  Icons.handyman_outlined,
                  color: AppColors.primary,
                  size: 40,
                ),
                children: const [
                  Text(
                    'AI-Driven Market Linkage and Smart Cataloging '
                    'Application for Marginalized Artisans.',
                  ),
                ],
              );
            },
          ),

          const SizedBox(height: 25),

          const Center(
            child: Text(
              'Artinova v1.0.0',
              style: TextStyle(
                color: AppColors.textSecondary,
                fontSize: 12,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _SettingSwitch extends StatelessWidget {
  final String title;
  final String subtitle;
  final bool value;
  final ValueChanged<bool> onChanged;

  const _SettingSwitch({
    required this.title,
    required this.subtitle,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: AppColors.surface,
      margin: const EdgeInsets.only(bottom: 8),
      child: SwitchListTile(
        title: Text(
          title,
          style: const TextStyle(
            fontWeight: FontWeight.w600,
          ),
        ),
        subtitle: Text(subtitle),
        value: value,
        activeThumbColor: AppColors.primary,
        onChanged: onChanged,
      ),
    );
  }
}

class _SettingTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final Widget? trailing;
  final VoidCallback onTap;

  const _SettingTile({
    required this.icon,
    required this.title,
    this.trailing,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: AppColors.surface,
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(
          icon,
          color: AppColors.primary,
        ),
        title: Text(title),
        trailing: trailing ??
            const Icon(
              Icons.arrow_forward_ios,
              size: 15,
            ),
        onTap: onTap,
      ),
    );
  }
}