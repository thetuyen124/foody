package com.tlu.datn.foody.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tlu.datn.foody.entity.Invoice;
import com.tlu.datn.foody.entity.InvoiceDetail;
import com.tlu.datn.foody.model.InvoiceDecline;
import com.tlu.datn.foody.model.InvoiceDetailModel;
import com.tlu.datn.foody.model.InvoiceModel;
import com.tlu.datn.foody.model.UpdateInvoice;
import com.tlu.datn.foody.service.InvoiceDetailService;
import com.tlu.datn.foody.service.InvoiceService;

@RestController()
public class OrderController {

	@Autowired
	private InvoiceService invoiceService;
	@Autowired
	private InvoiceDetailService invoiceDetailService;

	/***
	 * get user order
	 * 
	 * @param username
	 * @return
	 */
	@GetMapping("/order/{username}")
	@CrossOrigin
	public List<Invoice> getAllOrder(@PathVariable String username) {
		return invoiceService.findByBuyer(username);
	}

	/***
	 * create new order
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@PostMapping("/order")
	@CrossOrigin
	public Invoice createOrder(@RequestBody List<InvoiceModel> model, HttpServletRequest request) {
		return invoiceService.createOrder(model, request);
	}

	/***
	 * get detail invoice by id
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("/order{id}")
	@CrossOrigin
	public List<InvoiceDetail> getAllDetail(@RequestParam int id) {
		return invoiceDetailService.findByInvoiceId(id);
	}

	/***
	 * accept invoice
	 * 
	 * @param invoiceId
	 * @param request
	 * @return
	 */
	@PutMapping("/staff/order/{invoiceId}")
	@CrossOrigin
	public Invoice updateOrder(@PathVariable int invoiceId, HttpServletRequest request) {
		return invoiceService.updateOrder(invoiceId, request);
	}

	/***
	 * update invoice detail
	 * 
	 * @param invoiceId
	 * @param name
	 * @param model
	 * @return
	 */
	@PutMapping("/staff/order/{invoiceId}/{name}")
	@CrossOrigin
	public InvoiceDetail updateDetailOrder(@PathVariable int invoiceId, @PathVariable String name,
			@RequestBody InvoiceDetailModel model) {
		return invoiceDetailService.updateOrder(invoiceId, name, model);
	}

	/***
	 * decline order
	 * 
	 * @param invoiceId
	 * @return
	 */
	@PutMapping("/staff/decline-order")
	@CrossOrigin
	public boolean declineOrder(@RequestBody InvoiceDecline invoice) {
		return invoiceService.declineOrder(invoice);
	}

	/***
	 * update invoice payment
	 * 
	 * @param invoice
	 * @return
	 */
	@PutMapping("/order")
	@CrossOrigin
	public Invoice updateInvoice(@RequestBody UpdateInvoice invoice) {
		return invoiceService.updateInvoicePayment(invoice);
	}

	@GetMapping("/orders{handler}")
	@CrossOrigin
	public List<Invoice> getByHandler(@RequestParam String handler) {
		return invoiceService.findByHandler(handler);
	}

	@GetMapping("/order-active")
	@CrossOrigin
	public List<Invoice> getByState(HttpServletRequest request) {
		return invoiceService.findByState("00", request);
	}

	@PutMapping("/order/{id}/finish{payment}")
	@CrossOrigin
	public boolean finishInvoice(@PathVariable int id, @RequestParam String payment) {
		return invoiceService.finish(id, payment);
	}
	
	@GetMapping("/all-order")
	@CrossOrigin
	public List<Invoice> getAll(HttpServletRequest request) {
		return invoiceService.findByLocation(request);
	}
}
