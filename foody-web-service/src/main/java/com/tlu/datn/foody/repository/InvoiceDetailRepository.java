package com.tlu.datn.foody.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tlu.datn.foody.entity.InvoiceDetail;
import com.tlu.datn.foody.entity.InvoiceDetailId;

public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, InvoiceDetailId> {
	@Query(value = "SELECT * FROM invoice_detail WHERE invoice_id = ?1", nativeQuery = true)
	List<InvoiceDetail> findByInvoiceId(int id);
	@Query(value = "SELECT * FROM invoice_detail WHERE invoice_id = ?1 AND product_name = ?2", nativeQuery = true)
	InvoiceDetail findByInvoiceIdAndName(int id,String name);

}
