package com.tlu.datn.foody.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tlu.datn.foody.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer>{

}
