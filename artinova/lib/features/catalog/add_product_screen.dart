import 'package:flutter/material.dart';

import '../../core/constants/app_colors.dart';
import 'scan_product_screen.dart';

class AddProductScreen extends StatelessWidget {
  const AddProductScreen({super.key});

  void _openScanner(
    BuildContext context,
    bool camera,
  ) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const ScanProductScreen(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Product'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 20),

            const Icon(
              Icons.auto_awesome,
              size: 70,
              color: AppColors.primary,
            ),

            const SizedBox(height: 20),

            const Text(
              'Create a Smart Catalog',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),

            const SizedBox(height: 10),

            const Text(
              'Add a photo of your handmade product and '
              'let AI help create its catalog information.',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 15,
                height: 1.5,
                color: AppColors.textSecondary,
              ),
            ),

            const SizedBox(height: 40),

            ElevatedButton.icon(
              onPressed: () => _openScanner(
                context,
                true,
              ),
              icon: const Icon(
                Icons.camera_alt_outlined,
              ),
              label: const Text('Take Product Photo'),
            ),

            const SizedBox(height: 14),

            OutlinedButton.icon(
              onPressed: () => _openScanner(
                context,
                false,
              ),
              icon: const Icon(
                Icons.photo_library_outlined,
              ),
              label: const Text('Choose From Gallery'),
              style: OutlinedButton.styleFrom(
                minimumSize: const Size(
                  double.infinity,
                  52,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
            ),

            const Spacer(),

            const Text(
              'Your product information can be reviewed '
              'before publishing.',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 12,
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}