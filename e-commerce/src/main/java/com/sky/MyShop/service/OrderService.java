package com.sky.MyShop.service;

import com.sky.MyShop.dto.CategoryDto;
import com.sky.MyShop.dto.OrderDto;
import com.sky.MyShop.dto.OrderItemDto;
import com.sky.MyShop.dto.ProductDto;
import com.sky.MyShop.entity.*;
import com.sky.MyShop.Payloads.request.OrderItemRequest;
import com.sky.MyShop.Payloads.request.OrderRequest;
import com.sky.MyShop.repository.OrderRepository;
import com.sky.MyShop.repository.ProductRepository;
import com.sky.MyShop.repository.UserRepository;
import com.sky.MyShop.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public OrderDto createOrder(OrderRequest orderRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));

        Order order = new Order();
        order.setUser(user);

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Error: Product is not found."));

            if (product.getStock() < itemRequest.getQuantity()) {
                throw new RuntimeException("Error: Not enough stock for product " + product.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPricePerUnit(product.getPrice());

            order.getItems().add(orderItem);

            product.setStock(product.getStock() - itemRequest.getQuantity());
            productRepository.save(product);

            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);
        return convertToDto(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderDto> getOrdersForCurrentUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Order> orders = orderRepository.findByUserId(userDetails.getId());
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    /**
     * NEW METHOD: Get all orders for a specific user.
     * This is intended for admin use.
     * @param userId The ID of the user whose orders to fetch.
     * @return A list of orders for the specified user.
     */
    @Transactional(readOnly = true)
    public List<OrderDto> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderDto getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Error: Order is not found."));
        // You should add a security check here to ensure the user owns the order or is an admin
        return convertToDto(order);
    }

    // Helper method to convert an Order entity to an OrderDto
    private OrderDto convertToDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        if(order.getUser() != null) {
            orderDto.setUserId(order.getUser().getId());
        }
        orderDto.setOrderDate(order.getOrderDate());
        orderDto.setStatus(order.getStatus());
        orderDto.setTotalAmount(order.getTotalAmount());
        orderDto.setItems(order.getItems().stream().map(this::convertOrderItemToDto).collect(Collectors.toList()));
        return orderDto;
    }

    // Helper method to convert an OrderItem entity to an OrderItemDto
    private OrderItemDto convertOrderItemToDto(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setPricePerUnit(orderItem.getPricePerUnit());
        if (orderItem.getProduct() != null) {
            orderItemDto.setProduct(convertProductToDto(orderItem.getProduct()));
        }
        return orderItemDto;
    }

    // Helper method to convert a Product entity to a ProductDto
    private ProductDto convertProductToDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setStock(product.getStock());

        if (product.getCategory() != null) {
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setId(product.getCategory().getId());
            categoryDto.setName(product.getCategory().getName());
            productDto.setCategory(categoryDto);
        }
        return productDto;
    }
}
