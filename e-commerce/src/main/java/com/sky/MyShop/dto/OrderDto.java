package com.sky.MyShop.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderDto {
    private Long id;
    private Long userId; // Just show the user ID
    private List<OrderItemDto> items;
    private LocalDateTime orderDate;
    private String status;
    private BigDecimal totalAmount;
}
