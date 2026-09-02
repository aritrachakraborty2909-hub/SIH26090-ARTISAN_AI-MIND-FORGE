import 'package:flutter/material.dart';

import '../../core/constants/app_colors.dart';
import 'order_details_screen.dart';

class OrdersScreen extends StatefulWidget {
  const OrdersScreen({super.key});

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> {
  String selectedStatus = 'All';

  final List<Map<String, dynamic>> orders = [
    {
      'id': 'ORD-1001',
      'product': 'Handwoven Basket',
      'buyer': 'Craft Marketplace',
      'quantity': 2,
      'amount': 1300.0,
      'status': 'Processing',
      'date': '02 Sep 2026',
    },
    {
      'id': 'ORD-1002',
      'product': 'Clay Decorative Pot',
      'buyer': 'Traditional Home Store',
      'quantity': 1,
      'amount': 850.0,
      'status': 'Shipped',
      'date': '31 Aug 2026',
    },
    {
      'id': 'ORD-1003',
      'product': 'Embroidered Textile',
      'buyer': 'Ethnic Collection',
      'quantity': 3,
      'amount': 3600.0,
      'status': 'Delivered',
      'date': '28 Aug 2026',
    },
    {
      'id': 'ORD-1004',
      'product': 'Bamboo Craft Set',
      'buyer': 'Artisan Living',
      'quantity': 1,
      'amount': 950.0,
      'status': 'Pending',
      'date': '27 Aug 2026',
    },
  ];

  List<Map<String, dynamic>> get filteredOrders {
    if (selectedStatus == 'All') {
      return orders;
    }

    return orders
        .where(
          (order) => order['status'] == selectedStatus,
        )
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    final statuses = [
      'All',
      'Pending',
      'Processing',
      'Shipped',
      'Delivered',
    ];

    final filtered = filteredOrders;

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Orders',
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.search),
          ),
        ],
      ),
      body: Column(
        children: [
          // Summary
          Padding(
            padding: const EdgeInsets.fromLTRB(
              16,
              8,
              16,
              14,
            ),
            child: Row(
              children: [
                Expanded(
                  child: _SummaryCard(
                    title: 'Total',
                    value: '${orders.length}',
                    icon: Icons.receipt_long_outlined,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _SummaryCard(
                    title: 'Processing',
                    value: '${orders.where((o) => o['status'] == 'Processing').length}',
                    icon: Icons.pending_actions_outlined,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _SummaryCard(
                    title: 'Delivered',
                    value: '${orders.where((o) => o['status'] == 'Delivered').length}',
                    icon: Icons.check_circle_outline,
                  ),
                ),
              ],
            ),
          ),

          // Filter
          SizedBox(
            height: 45,
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              scrollDirection: Axis.horizontal,
              itemCount: statuses.length,
              separatorBuilder: (_, _) => const SizedBox(width: 8),
              itemBuilder: (context, index) {
                final status = statuses[index];
                final selected = selectedStatus == status;

                return ChoiceChip(
                  label: Text(status),
                  selected: selected,
                  onSelected: (_) {
                    setState(() {
                      selectedStatus = status;
                    });
                  },
                );
              },
            ),
          ),

          const SizedBox(height: 12),

          Expanded(
            child: filtered.isEmpty
                ? const Center(
                    child: Text(
                      'No orders found.',
                      style: TextStyle(
                        color: AppColors.textSecondary,
                      ),
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.fromLTRB(
                      16,
                      4,
                      16,
                      24,
                    ),
                    itemCount: filtered.length,
                    separatorBuilder: (_, _) =>
                        const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final order = filtered[index];

                      return _OrderCard(
                        order: order,
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) =>
                                  OrderDetailsScreen(
                                order: order,
                              ),
                            ),
                          );
                        },
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

class _SummaryCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;

  const _SummaryCard({
    required this.title,
    required this.value,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppColors.border,
        ),
      ),
      child: Column(
        children: [
          Icon(
            icon,
            size: 23,
            color: AppColors.primary,
          ),
          const SizedBox(height: 6),
          Text(
            value,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            title,
            style: const TextStyle(
              fontSize: 11,
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }
}

class _OrderCard extends StatelessWidget {
  final Map<String, dynamic> order;
  final VoidCallback onTap;

  const _OrderCard({
    required this.order,
    required this.onTap,
  });

  Color _statusColor(String status) {
    switch (status) {
      case 'Delivered':
        return AppColors.success;
      case 'Shipped':
        return AppColors.primary;
      case 'Processing':
        return AppColors.secondary;
      default:
        return AppColors.textSecondary;
    }
  }

  @override
  Widget build(BuildContext context) {
    final status = order['status'] as String;
    final statusColor = _statusColor(status);

    return Card(
      elevation: 0,
      color: AppColors.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
        side: const BorderSide(
          color: AppColors.border,
        ),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(18),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment:
                CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(11),
                    decoration: BoxDecoration(
                      color: AppColors.background,
                      borderRadius:
                          BorderRadius.circular(13),
                    ),
                    child: const Icon(
                      Icons.inventory_2_outlined,
                      color: AppColors.primary,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment:
                          CrossAxisAlignment.start,
                      children: [
                        Text(
                          order['product'],
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          order['id'],
                          style: const TextStyle(
                            fontSize: 12,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 9,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: statusColor.withValues(
                        alpha: 0.12,
                      ),
                      borderRadius:
                          BorderRadius.circular(20),
                    ),
                    child: Text(
                      status,
                      style: TextStyle(
                        color: statusColor,
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 14),

              const Divider(),

              const SizedBox(height: 8),

              Row(
                children: [
                  const Icon(
                    Icons.person_outline,
                    size: 17,
                    color: AppColors.textSecondary,
                  ),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      order['buyer'],
                      style: const TextStyle(
                        fontSize: 13,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ),
                  Text(
                    '₹${order['amount'].toStringAsFixed(0)}',
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      color: AppColors.primary,
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 8),

              Row(
                children: [
                  const Icon(
                    Icons.calendar_today_outlined,
                    size: 15,
                    color: AppColors.textSecondary,
                  ),
                  const SizedBox(width: 6),
                  Text(
                    order['date'],
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                  const Spacer(),
                  const Icon(
                    Icons.arrow_forward_ios,
                    size: 13,
                    color: AppColors.primary,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}