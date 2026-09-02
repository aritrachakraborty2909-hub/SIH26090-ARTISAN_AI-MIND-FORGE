class ProductModel {
  final String id;
  final String artisanId;
  final String title;
  final String description;
  final String category;
  final double price;
  final String imagePath;
  final List<String> tags;
  final bool aiGenerated;
  final DateTime createdAt;

  const ProductModel({
    required this.id,
    required this.artisanId,
    required this.title,
    required this.description,
    required this.category,
    required this.price,
    required this.imagePath,
    required this.tags,
    required this.aiGenerated,
    required this.createdAt,
  });

  ProductModel copyWith({
    String? id,
    String? artisanId,
    String? title,
    String? description,
    String? category,
    double? price,
    String? imagePath,
    List<String>? tags,
    bool? aiGenerated,
    DateTime? createdAt,
  }) {
    return ProductModel(
      id: id ?? this.id,
      artisanId: artisanId ?? this.artisanId,
      title: title ?? this.title,
      description: description ?? this.description,
      category: category ?? this.category,
      price: price ?? this.price,
      imagePath: imagePath ?? this.imagePath,
      tags: tags ?? this.tags,
      aiGenerated: aiGenerated ?? this.aiGenerated,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'artisanId': artisanId,
      'title': title,
      'description': description,
      'category': category,
      'price': price,
      'imagePath': imagePath,
      'tags': tags,
      'aiGenerated': aiGenerated,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['id'] ?? '',
      artisanId: json['artisanId'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      category: json['category'] ?? '',
      price: (json['price'] ?? 0).toDouble(),
      imagePath: json['imagePath'] ?? '',
      tags: List<String>.from(json['tags'] ?? []),
      aiGenerated: json['aiGenerated'] ?? false,
      createdAt: DateTime.tryParse(json['createdAt'] ?? '') ??
          DateTime.now(),
    );
  }
}