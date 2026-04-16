package com.madhura.tech.service;

import com.madhura.tech.entity.PurchaseItem;
import com.madhura.tech.repositry.PurchaseItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseItemService {

    private final PurchaseItemRepository repository;


    public List<PurchaseItem> getAllItems() {
        return repository.findAll();
    }


    public PurchaseItem saveItem(PurchaseItem item) {
        return repository.save(item);
    }


    public void deleteItem(Long id) {
        repository.deleteById(id);
    }


    public List<PurchaseItem> searchItems(String keyword) {
        return repository.findByNameContainingIgnoreCase(keyword);
    }


    public PurchaseItem getItemById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
    }
}