import 'dart:io';

import 'package:flutter/material.dart';

import '../../core/constants/app_colors.dart';
import '../../models/product_model.dart';
import 'add_product_screen.dart';
import 'product_details_screen.dart';

class CatalogScreen extends StatefulWidget {
  const CatalogScreen({super.key});

  @override
  State<CatalogScreen> createState() => _CatalogScreenState();
}

class _CatalogScreenState extends State<CatalogScreen> {
  final TextEditingController _searchController =
      TextEditingController();

  final List<ProductModel> _products = [
    ProductModel(
      id: '1',
      artisanId: 'demo-artisan',
      title: 'Handwoven Basket',
      description:
          'Traditional handmade basket created using natural materials.',
      category: 'Handicrafts',
      price: 650,
      imagePath: '',
      tags: ['Handmade', 'Basket', 'Traditional'],
      aiGenerated: true,
      createdAt: DateTime.now(),
    ),
    ProductModel(
      id: '2',
      artisanId: 'demo-artisan',
      title: 'Clay Decorative Pot',
      description:
          'Beautiful handcrafted clay pot with traditional patterns.',
      category: 'Pottery',
      price: 850,
      imagePath: '',
      tags: ['Clay', 'Pottery', 'Handmade'],
      aiGenerated: true,
      createdAt: DateTime.now(),
    ),
    ProductModel(
      id: '3',
      artisanId: 'demo-artisan',
      title: 'Embroidered Textile',
      description:
          'Colorful handmade textile featuring traditional embroidery.',
      category: 'Textiles',
      price: 1200,
      imagePath: '',
      tags: ['Textile', 'Embroidery', 'Traditional'],
      aiGenerated: false,
      createdAt: DateTime.now(),
    ),
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  List<ProductModel> get _filteredProducts {
    final query = _searchController.text.trim().toLowerCase();

    if (query.isEmpty) {
      return _products;
    }

    return _products.where((product) {
      return product.title.toLowerCase().contains(query) ||
          product.category.toLowerCase().contains(query) ||
          product.tags.any(
            (tag) => tag.toLowerCase().contains(query),
          );
    }).toList();
  }

  void _openAddProduct() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const AddProductScreen(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final products = _filteredProducts;

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'My Catalog',
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            onPressed: _openAddProduct,
            icon: const Icon(Icons.add),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _openAddProduct,
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        icon: const Icon(Icons.add),
        label: const Text('Add Product'),
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(
          16,
          8,
          16,
          90,
        ),
        child: Column(
          children: [
            TextField(
              controller: _searchController,
              onChanged: (_) => setState(() {}),
              decoration: InputDecoration(
                hintText: 'Search products...',
                prefixIcon: const Icon(
                  Icons.search,
                ),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        onPressed: () {
                          _searchController.clear();
                          setState(() {});
                        },
                        icon: const Icon(Icons.clear),
                      )
                    : null,
              ),
            ),

            const SizedBox(height: 18),

            Row(
              children: [
                Text(
                  '${products.length} Products',
                  style: const TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const Spacer(),
                IconButton(
                  onPressed: () {},
                  icon: const Icon(
                    Icons.filter_list_outlined,
                  ),
                ),
              ],
            ),

            const SizedBox(height: 8),

            Expanded(
              child: products.isEmpty
                  ? const Center(
                      child: Text(
                        'No products found.',
                        style: TextStyle(
                          color: AppColors.textSecondary,
                        ),
                      ),
                    )
                  : GridView.builder(
                      itemCount: products.length,
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 12,
                        mainAxisSpacing: 12,
                        childAspectRatio: 0.72,
                      ),
                      itemBuilder: (context, index) {
                        final product = products[index];

                        return _ProductCard(
                          product: product,
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) =>
                                    ProductDetailsScreen(
                                  product: product,
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
      ),
    );
  }
}

class _ProductCard extends StatelessWidget {
  final ProductModel product;
  final VoidCallback onTap;

  const _ProductCard({
    required this.product,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final hasImage =
        product.imagePath.isNotEmpty &&
        File(product.imagePath).existsSync();

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(
            color: AppColors.border,
          ),
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: hasImage
                  ? Image.file(
                      File(product.imagePath),
                      width: double.infinity,
                      fit: BoxFit.cover,
                    )
                  : Container(
                      width: double.infinity,
                      color: AppColors.background,
                      child: const Icon(
                        Icons.handyman_outlined,
                        size: 55,
                        color: AppColors.primary,
                      ),
                    ),
            ),

            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment:
                    CrossAxisAlignment.start,
                children: [
                  Text(
                    product.title,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    product.category,
                    style: const TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 12,
                    ),
                  ),
                  const SizedBox(height: 7),
                  Text(
                    '₹${product.price.toStringAsFixed(0)}',
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      color: AppColors.primary,
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}