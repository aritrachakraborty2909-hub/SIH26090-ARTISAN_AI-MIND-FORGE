import 'package:flutter/material.dart';

import '../../core/constants/app_colors.dart';

class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({super.key});

  @override
  State<NotificationsScreen> createState() =>
      _NotificationsScreenState();
}

class _NotificationsScreenState
    extends State<NotificationsScreen> {
  final List<Map<String, dynamic>> notifications = [
    {
      'title': 'New Market Opportunity',
      'message':
          'A new buyer opportunity matches your handicraft products.',
      'time': '10 minutes ago',
      'icon': Icons.storefront_outlined,
      'read': false,
    },
    {
      'title': 'Order Received',
      'message':
          'You received a new order for Handwoven Basket.',
      'time': '2 hours ago',
      'icon': Icons.shopping_bag_outlined,
      'read': false,
    },
    {
      'title': 'AI Catalog Ready',
      'message':
          'Your product catalog information has been generated.',
      'time': 'Yesterday',
      'icon': Icons.auto_awesome,
      'read': true,
    },
    {
      'title': 'Order Delivered',
      'message':
          'Order ORD-1003 has been marked as delivered.',
      'time': '2 days ago',
      'icon': Icons.local_shipping_outlined,
      'read': true,
    },
  ];

  void _markAllRead() {
    setState(() {
      for (final notification in notifications) {
        notification['read'] = true;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final unreadCount =
        notifications.where((item) => !item['read']).length;

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Notifications',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          if (unreadCount > 0)
            TextButton(
              onPressed: _markAllRead,
              child: const Text('Mark all read'),
            ),
        ],
      ),
      body: notifications.isEmpty
          ? const Center(
              child: Text(
                'No notifications yet.',
                style: TextStyle(
                  color: AppColors.textSecondary,
                ),
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: notifications.length,
              separatorBuilder: (_, _) =>
                  const SizedBox(height: 10),
              itemBuilder: (context, index) {
                final notification = notifications[index];
                final isRead = notification['read'] as bool;

                return InkWell(
                  borderRadius: BorderRadius.circular(18),
                  onTap: () {
                    setState(() {
                      notification['read'] = true;
                    });
                  },
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: isRead
                          ? AppColors.surface
                          : AppColors.primary.withValues(
                              alpha: 0.06,
                            ),
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(
                        color: isRead
                            ? AppColors.border
                            : AppColors.primary.withValues(
                                alpha: 0.25,
                              ),
                      ),
                    ),
                    child: Row(
                      crossAxisAlignment:
                          CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(11),
                          decoration: BoxDecoration(
                            color: AppColors.background,
                            borderRadius:
                                BorderRadius.circular(13),
                          ),
                          child: Icon(
                            notification['icon'],
                            color: AppColors.primary,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment:
                                CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      notification['title'],
                                      style: TextStyle(
                                        fontWeight: isRead
                                            ? FontWeight.w600
                                            : FontWeight.bold,
                                        fontSize: 15,
                                      ),
                                    ),
                                  ),
                                  if (!isRead)
                                    Container(
                                      width: 8,
                                      height: 8,
                                      decoration:
                                          const BoxDecoration(
                                        color:
                                            AppColors.primary,
                                        shape: BoxShape.circle,
                                      ),
                                    ),
                                ],
                              ),
                              const SizedBox(height: 6),
                              Text(
                                notification['message'],
                                style: const TextStyle(
                                  color:
                                      AppColors.textSecondary,
                                  fontSize: 13,
                                  height: 1.4,
                                ),
                              ),
                              const SizedBox(height: 7),
                              Text(
                                notification['time'],
                                style: const TextStyle(
                                  color:
                                      AppColors.textSecondary,
                                  fontSize: 11,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}