package com.sky.MyShop.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class OrderItemDto {
    private Long id;
    private ProductDto product; // Use ProductDto to show product details
    private int quantity;
    private BigDecimal pricePerUnit;
}