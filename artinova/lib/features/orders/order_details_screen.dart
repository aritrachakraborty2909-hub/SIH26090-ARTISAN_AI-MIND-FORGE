import 'package:flutter/material.dart';

import '../../core/constants/app_colors.dart';

class OrderDetailsScreen extends StatelessWidget {
  final Map<String, dynamic> order;

  const OrderDetailsScreen({
    super.key,
    required this.order,
  });

  @override
  Widget build(BuildContext context) {
    final status = order['status'] as String;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Order Details'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment:
              CrossAxisAlignment.start,
          children: [
            // Header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius:
                    BorderRadius.circular(20),
              ),
              child: Column(
                crossAxisAlignment:
                    CrossAxisAlignment.start,
                children: [
                  const Icon(
                    Icons.inventory_2_outlined,
                    color: Colors.white,
                    size: 42,
                  ),
                  const SizedBox(height: 14),
                  Text(
                    order['id'],
                    style: const TextStyle(
                      color: Colors.white70,
                      fontSize: 13,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    order['product'],
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 23,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            const Text(
              'Order Information',
              style: TextStyle(
                fontSize: 19,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 14),

            _InfoTile(
              icon: Icons.person_outline,
              title: 'Buyer',
              value: order['buyer'],
            ),

            _InfoTile(
              icon: Icons.shopping_bag_outlined,
              title: 'Quantity',
              value: '${order['quantity']} item(s)',
            ),

            _InfoTile(
              icon: Icons.currency_rupee,
              title: 'Total Amount',
              value:
                  '₹${order['amount'].toStringAsFixed(0)}',
            ),

            _InfoTile(
              icon: Icons.calendar_today_outlined,
              title: 'Order Date',
              value: order['date'],
            ),

            _InfoTile(
              icon: Icons.local_shipping_outlined,
              title: 'Status',
              value: status,
            ),

            const SizedBox(height: 24),

            const Text(
              'Order Progress',
              style: TextStyle(
                fontSize: 19,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 18),

            _ProgressStep(
              title: 'Order Placed',
              subtitle: 'Order has been received',
              completed: true,
              isLast: false,
            ),

            _ProgressStep(
              title: 'Processing',
              subtitle: 'Product is being prepared',
              completed: status != 'Pending',
              isLast: false,
            ),

            _ProgressStep(
              title: 'Shipped',
              subtitle: 'Product has been shipped',
              completed: status == 'Shipped' ||
                  status == 'Delivered',
              isLast: false,
            ),

            _ProgressStep(
              title: 'Delivered',
              subtitle: 'Order delivered to buyer',
              completed: status == 'Delivered',
              isLast: true,
            ),

            const SizedBox(height: 28),

            if (status != 'Delivered')
              ElevatedButton.icon(
                onPressed: () {
                  ScaffoldMessenger.of(context)
                      .showSnackBar(
                    const SnackBar(
                      content: Text(
                        'Order status updated successfully!',
                      ),
                    ),
                  );
                },
                icon: const Icon(
                  Icons.update_outlined,
                ),
                label: const Text(
                  'Update Order Status',
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _InfoTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String value;

  const _InfoTile({
    required this.icon,
    required this.title,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppColors.background,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              icon,
              size: 21,
              color: AppColors.primary,
            ),
          ),
          const SizedBox(width: 12),
          Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w600,
            ),
          ),
          const Spacer(),
          Text(
            value,
            style: const TextStyle(
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }
}

class _ProgressStep extends StatelessWidget {
  final String title;
  final String subtitle;
  final bool completed;
  final bool isLast;

  const _ProgressStep({
    required this.title,
    required this.subtitle,
    required this.completed,
    required this.isLast,
  });

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment:
            CrossAxisAlignment.stretch,
        children: [
          SizedBox(
            width: 32,
            child: Column(
              children: [
                Container(
                  width: 22,
                  height: 22,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: completed
                        ? AppColors.success
                        : AppColors.border,
                  ),
                  child: completed
                      ? const Icon(
                          Icons.check,
                          size: 14,
                          color: Colors.white,
                        )
                      : null,
                ),
                if (!isLast)
                  Expanded(
                    child: Container(
                      width: 2,
                      color: completed
                          ? AppColors.success
                          : AppColors.border,
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(
                bottom: 24,
              ),
              child: Column(
                crossAxisAlignment:
                    CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}