package com.sky.MyShop.Payloads.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequest {
    @NotEmpty
    @Valid
    private List<OrderItemRequest> items;
}
