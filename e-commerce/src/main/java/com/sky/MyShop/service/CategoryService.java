package com.sky.MyShop.service;


import com.sky.MyShop.entity.Category;
import com.sky.MyShop.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service layer for managing product categories.
 * This class encapsulates the business logic for category operations.
 */
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Retrieves all categories from the database.
     * @return a list of all Category objects.
     */
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Creates and saves a new category.
     * This operation is typically restricted to users with an 'ADMIN' role.
     * @param category The Category object to be saved.
     * @return the saved Category object.
     */
    public Category createCategory(Category category) {
        // You could add validation here, e.g., to prevent duplicate category names.
        return categoryRepository.save(category);
    }
}