package com.madhura.tech.repositry;

import com.madhura.tech.entity.PurchaseItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseItemRepository extends JpaRepository<PurchaseItem,Long> {
    List<PurchaseItem> findByNameContainingIgnoreCase(String name);

}
