package com.tlu.datn.foody.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.tlu.datn.foody.entity.Invoice;
import com.tlu.datn.foody.model.InvoiceDecline;
import com.tlu.datn.foody.model.InvoiceModel;
import com.tlu.datn.foody.model.UpdateInvoice;

public interface InvoiceService {

	List<Invoice> findByBuyer(String buyer);
	
	List<Invoice> findByHandler(String buyer);
	
	List<Invoice> findByState(String state, HttpServletRequest request);
	
	List<Invoice> findByLocation(HttpServletRequest request);

	Invoice createOrder(List<InvoiceModel> model, HttpServletRequest request);

	Invoice updateOrder(int id, HttpServletRequest request);

	boolean declineOrder(InvoiceDecline id);
	
	boolean finish(int id, String payment);
	
	Invoice updateInvoicePayment(UpdateInvoice newInvoice);
}
