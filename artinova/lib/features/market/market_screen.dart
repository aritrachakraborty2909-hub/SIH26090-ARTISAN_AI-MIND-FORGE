import 'package:flutter/material.dart';

import '../../core/constants/app_colors.dart';
import 'market_details_screen.dart';
import 'market_opportunity_card.dart';

class MarketScreen extends StatefulWidget {
  const MarketScreen({super.key});

  @override
  State<MarketScreen> createState() => _MarketScreenState();
}

class _MarketScreenState extends State<MarketScreen> {
  String selectedCategory = 'All';

  final List<Map<String, String>> opportunities = [
    {
      'title': 'Handicraft Online Marketplace',
      'location': 'Pan India',
      'category': 'Handicrafts',
      'description':
          'Online marketplace looking for handmade baskets, decorative items and traditional crafts.',
      'match': '94%',
    },
    {
      'title': 'Traditional Home Decor',
      'location': 'Delhi',
      'category': 'Home Decor',
      'description':
          'Retail opportunity for handcrafted home decoration products.',
      'match': '89%',
    },
    {
      'title': 'Ethnic Textile Collection',
      'location': 'Mumbai',
      'category': 'Textiles',
      'description':
          'Buyer opportunity for traditional embroidered and handwoven textiles.',
      'match': '86%',
    },
    {
      'title': 'Artisan Pottery Store',
      'location': 'Jaipur',
      'category': 'Pottery',
      'description':
          'Specialized store searching for unique handmade pottery products.',
      'match': '82%',
    },
  ];

  List<Map<String, String>> get filteredOpportunities {
    if (selectedCategory == 'All') {
      return opportunities;
    }

    return opportunities
        .where(
          (item) => item['category'] == selectedCategory,
        )
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    final categories = [
      'All',
      'Handicrafts',
      'Home Decor',
      'Textiles',
      'Pottery',
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Market Linkage',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.notifications_none_outlined),
          ),
        ],
      ),
      body: Column(
        children: [
          Container(
            margin: const EdgeInsets.fromLTRB(16, 8, 16, 12),
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: AppColors.primary,
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Row(
              children: [
                Icon(
                  Icons.auto_awesome,
                  color: Colors.white,
                  size: 32,
                ),
                SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Smart Market Matching',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 5),
                      Text(
                        'AI finds market opportunities that match your products.',
                        style: TextStyle(
                          color: Colors.white70,
                          fontSize: 12,
                          height: 1.3,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          SizedBox(
            height: 48,
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              scrollDirection: Axis.horizontal,
              itemCount: categories.length,
              separatorBuilder: (_, __) => const SizedBox(width: 8),
              itemBuilder: (context, index) {
                final category = categories[index];
                final selected = selectedCategory == category;

                return ChoiceChip(
                  label: Text(category),
                  selected: selected,
                  onSelected: (_) {
                    setState(() {
                      selectedCategory = category;
                    });
                  },
                );
              },
            ),
          ),

          const SizedBox(height: 8),

          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
              itemCount: filteredOpportunities.length,
              separatorBuilder: (_, __) => const SizedBox(height: 12),
              itemBuilder: (context, index) {
                final item = filteredOpportunities[index];

                return MarketOpportunityCard(
                  title: item['title']!,
                  location: item['location']!,
                  category: item['category']!,
                  description: item['description']!,
                  matchPercentage: item['match']!,
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => MarketDetailsScreen(
                          title: item['title']!,
                          location: item['location']!,
                          category: item['category']!,
                          description: item['description']!,
                          matchPercentage: item['match']!,
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