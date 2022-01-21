package com.tlu.datn.foody.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tlu.datn.foody.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
	@Query(value = "SELECT * FROM invoices WHERE buyer = ?1 AND state <> ?2", nativeQuery = true)
	List<Invoice> findByBuyerAndStateNot(String buyer, String state);
	
	@Query(value = "SELECT * FROM invoices WHERE buyer = ?1", nativeQuery = true)
	List<Invoice> findByBuyer(String buyer);
	
	@Query(value = "SELECT * FROM invoices WHERE handler_invoice = ?1 AND state = '01'", nativeQuery = true)
	List<Invoice> findByHandler(String hanlder);
	
	@Query(value = "SELECT * FROM invoices WHERE state = ?1 AND location_code = ?2", nativeQuery = true)
	List<Invoice> findByState(String state, String location);
	
	@Query(value = "SELECT * FROM invoices WHERE location_code = ?1", nativeQuery = true)
	List<Invoice> findByLocation( String location);
}
