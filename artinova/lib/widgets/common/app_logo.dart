import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../core/constants/app_assets.dart';

class AppLogo extends StatelessWidget {
  final double width;
  final double? height;

  const AppLogo({
    super.key,
    this.width = 150,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return SvgPicture.asset(
      AppAssets.logo,
      width: width,
      height: height,
      fit: BoxFit.contain,
    );
  }
}