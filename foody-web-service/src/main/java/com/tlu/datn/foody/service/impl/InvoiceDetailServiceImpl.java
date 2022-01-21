package com.tlu.datn.foody.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tlu.datn.foody.common.BaseConstants;
import com.tlu.datn.foody.entity.Invoice;
import com.tlu.datn.foody.entity.InvoiceDetail;
import com.tlu.datn.foody.exception.NullException;
import com.tlu.datn.foody.model.InvoiceDetailModel;
import com.tlu.datn.foody.repository.InvoiceDetailRepository;
import com.tlu.datn.foody.repository.InvoiceRepository;
import com.tlu.datn.foody.service.InvoiceDetailService;
import com.tlu.datn.foody.util.InvoiceUtil;

@Service
public class InvoiceDetailServiceImpl implements InvoiceDetailService {

	@Autowired
	private InvoiceDetailRepository invoiceDetailRepository;

	@Autowired
	private InvoiceRepository invoiceRepository;

	@Autowired
	private InvoiceUtil util;

	@Override
	public List<InvoiceDetail> findByInvoiceId(int id) {
		return invoiceDetailRepository.findByInvoiceId(id);
	}

	@Override
	public InvoiceDetail updateOrder(int id, String name, InvoiceDetailModel model) {
		InvoiceDetail detail = invoiceDetailRepository.findByInvoiceIdAndName(id, name);
		if (detail == null)
			throw new NullException("Can not found Detail invoice");
		util.checkDetailfield(model);
		detail.setState(model.getState());
		detail.setNote(model.getNote());
		if (!model.getState().equals(BaseConstants.DECLINE)) {
			detail.setQuantity(model.getQuantity());
			detail.setPrice(model.getPrice());
			detail.setTotal(model.getQuantity() * model.getPrice());
		}
		invoiceDetailRepository.saveAndFlush(detail);

		Invoice invoice = invoiceRepository.findById(id).orElse(null);
		List<InvoiceDetail> details = invoiceDetailRepository.findByInvoiceId(id);
		int total = 0;
		total += details.stream().mapToInt(el -> el.getTotal()).sum();
		invoice.setPrice(total);
		invoiceRepository.saveAndFlush(invoice);
		return detail;
	}

}
