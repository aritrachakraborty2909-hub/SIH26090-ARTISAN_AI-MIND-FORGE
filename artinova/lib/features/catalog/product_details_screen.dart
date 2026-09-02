import 'dart:io';

import 'package:flutter/material.dart';

import '../../core/constants/app_colors.dart';
import '../../models/product_model.dart';

class ProductDetailsScreen extends StatelessWidget {
  final ProductModel product;
  final bool isDraft;

  const ProductDetailsScreen({
    super.key,
    required this.product,
    this.isDraft = false,
  });

  @override
  Widget build(BuildContext context) {
    final bool hasImage =
        product.imagePath.isNotEmpty &&
        File(product.imagePath).existsSync();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Product Details'),
        actions: [
          IconButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text(
                    'Edit feature will be connected next.',
                  ),
                ),
              );
            },
            icon: const Icon(Icons.edit_outlined),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Product image
            SizedBox(
              height: 300,
              width: double.infinity,
              child: hasImage
                  ? Image.file(
                      File(product.imagePath),
                      fit: BoxFit.cover,
                    )
                  : Container(
                      color: AppColors.border,
                      child: const Icon(
                        Icons.image_outlined,
                        size: 80,
                        color: AppColors.primary,
                      ),
                    ),
            ),

            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (product.aiGenerated)
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 7,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.secondary.withValues(
                          alpha: 0.18,
                        ),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            Icons.auto_awesome,
                            size: 16,
                            color: AppColors.primary,
                          ),
                          SizedBox(width: 6),
                          Text(
                            'AI Generated',
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              color: AppColors.primary,
                            ),
                          ),
                        ],
                      ),
                    ),

                  const SizedBox(height: 16),

                  Text(
                    product.title,
                    style: const TextStyle(
                      fontSize: 27,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),

                  const SizedBox(height: 8),

                  Text(
                    product.category,
                    style: const TextStyle(
                      fontSize: 15,
                      color: AppColors.primary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),

                  const SizedBox(height: 18),

                  Text(
                    '₹${product.price.toStringAsFixed(0)}',
                    style: const TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),

                  const SizedBox(height: 20),

                  const Text(
                    'Description',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 8),

                  Text(
                    product.description,
                    style: const TextStyle(
                      fontSize: 15,
                      height: 1.5,
                      color: AppColors.textSecondary,
                    ),
                  ),

                  const SizedBox(height: 24),

                  const Text(
                    'Tags',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 10),

                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: product.tags.map(
                      (tag) {
                        return Chip(
                          label: Text(tag),
                          backgroundColor:
                              AppColors.background,
                          side: const BorderSide(
                            color: AppColors.border,
                          ),
                        );
                      },
                    ).toList(),
                  ),

                  const SizedBox(height: 30),

                  if (isDraft)
                    ElevatedButton.icon(
                      onPressed: () {
                        ScaffoldMessenger.of(context)
                            .showSnackBar(
                          const SnackBar(
                            content: Text(
                              'Product published successfully!',
                            ),
                          ),
                        );
                      },
                      icon: const Icon(
                        Icons.publish_outlined,
                      ),
                      label: const Text('Publish Product'),
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