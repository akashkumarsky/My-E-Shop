package com.sky.MyShop.service;

import com.sky.MyShop.dto.CategoryDto;
import com.sky.MyShop.dto.ProductDto;
import com.sky.MyShop.entity.Category;
import com.sky.MyShop.entity.Product;
import com.sky.MyShop.repository.CategoryRepository;
import com.sky.MyShop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // By adding @Transactional, we ensure the lazy-loaded category is fetched
    // within an active Hibernate session before we map it to a DTO.
    @Transactional(readOnly = true)
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDto createProduct(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStock(productDto.getStock());

        if (productDto.getCategory() != null && productDto.getCategory().getId() != null) {
            Category category = categoryRepository.findById(productDto.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Error: Category not found with id: " + productDto.getCategory().getId()));
            product.setCategory(category);
        }

        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    // Helper method to convert a Product entity to a ProductDto
    private ProductDto convertToDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setStock(product.getStock());

        if (product.getCategory() != null) {
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setId(product.getCategory().getId());
            categoryDto.setName(product.getCategory().getName()); // This will now work because of @Transactional
            productDto.setCategory(categoryDto);
        }

        return productDto;
    }
}