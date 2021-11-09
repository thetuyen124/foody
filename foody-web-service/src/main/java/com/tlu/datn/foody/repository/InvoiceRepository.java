package com.tlu.datn.foody.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tlu.datn.foody.entity.Invoice;
import com.tlu.datn.foody.entity.User;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
	@Query(value = "SELECT * FROM invoices WHERE buyer = ?1 AND state <> ?2", nativeQuery = true)
	List<Invoice> findByBuyerAndStateNot(String buyer, String state);
}
