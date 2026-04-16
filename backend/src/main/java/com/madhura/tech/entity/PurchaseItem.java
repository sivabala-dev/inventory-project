package com.madhura.tech.entity;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Table(name = "purchase_items")
@Data
public class PurchaseItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String hsnCode;
}