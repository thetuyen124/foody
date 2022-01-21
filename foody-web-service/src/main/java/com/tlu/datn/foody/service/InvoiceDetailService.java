package com.tlu.datn.foody.service;

import java.util.List;

import com.tlu.datn.foody.entity.InvoiceDetail;
import com.tlu.datn.foody.model.InvoiceDetailModel;

public interface InvoiceDetailService {
	public List<InvoiceDetail> findByInvoiceId(int id);
	
	public InvoiceDetail updateOrder(int id,String name,InvoiceDetailModel model);
}
