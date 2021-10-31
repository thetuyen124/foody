package com.tlu.datn.foody.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tlu.datn.foody.entity.InvoiceDetail;
import com.tlu.datn.foody.entity.InvoiceDetailId;

public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, InvoiceDetailId> {

}
