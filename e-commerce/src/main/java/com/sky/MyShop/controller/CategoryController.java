package com.sky.MyShop.controller;

import com.sky.MyShop.entity.Category;
import com.sky.MyShop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing product categories.
 * Provides endpoints for creating and retrieving categories.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    /**
     * Endpoint to get a list of all categories.
     * This is a public endpoint and does not require authentication.
     * @return A list of all categories.
     */
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    /**
     * Endpoint to create a new category.
     * This endpoint is protected and requires the user to have the 'ADMIN' role.
     * @param category The category data from the request body.
     * @return The created category with its generated ID.
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.createCategory(category);
        return ResponseEntity.ok(savedCategory);
    }
}
