package com.sky.MyShop.repository;

import com.sky.MyShop.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    // This interface will automatically provide CRUD operations for Category entities
    // No additional methods are needed unless you want to define custom queries


}
