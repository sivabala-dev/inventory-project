package com.madhura.tech.controller;

import com.madhura.tech.entity.PurchaseItem;
import com.madhura.tech.service.PurchaseItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin
@RequiredArgsConstructor
public class PurchaseItemController {

    private final PurchaseItemService service;

    // GET ALL
    @GetMapping
    public List<PurchaseItem> getAllItems() {
        return service.getAllItems();
    }

    // CREATE
    @PostMapping
    public PurchaseItem createItem(@RequestBody PurchaseItem item) {
        return service.saveItem(item);
    }

    //  UPDATE
    @PutMapping("/{id}")
    public PurchaseItem updateItem(@PathVariable Long id, @RequestBody PurchaseItem item) {
        item.setId(id);
        return service.saveItem(item);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        service.deleteItem(id);
    }

    //  SEARCH
    @GetMapping("/search")
    public List<PurchaseItem> searchItems(@RequestParam String q) {

        return service.searchItems(q);
    }

    //  GET ONE (optional)
    @GetMapping("/{id}")
    public PurchaseItem getItem(@PathVariable Long id) {
        return service.getItemById(id);
    }
}