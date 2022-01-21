package com.tlu.datn.foody.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tlu.datn.foody.common.BaseConstants;
import com.tlu.datn.foody.config.JwtTokenUtil;
import com.tlu.datn.foody.entity.Invoice;
import com.tlu.datn.foody.entity.InvoiceDetail;
import com.tlu.datn.foody.entity.InvoiceDetailId;
import com.tlu.datn.foody.entity.User;
import com.tlu.datn.foody.exception.LoginException;
import com.tlu.datn.foody.exception.NullException;
import com.tlu.datn.foody.model.InvoiceDecline;
import com.tlu.datn.foody.model.InvoiceModel;
import com.tlu.datn.foody.model.UpdateInvoice;
import com.tlu.datn.foody.repository.InvoiceDetailRepository;
import com.tlu.datn.foody.repository.InvoiceRepository;
import com.tlu.datn.foody.repository.UserRepository;
import com.tlu.datn.foody.service.InvoiceService;

import io.jsonwebtoken.ExpiredJwtException;

@Service
public class InvoiceServiceImpl implements InvoiceService {

	@Autowired
	private InvoiceRepository invoiceRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private InvoiceDetailRepository invoiceDetailRepository;

	@Override
	public List<Invoice> findByBuyer(String buyer) {
		return invoiceRepository.findByBuyer(buyer);
	}

	@Override
	public Invoice createOrder(List<InvoiceModel> model, HttpServletRequest request) {
		Invoice invoice = new Invoice();
		User user = getUser(request);
		invoice.setBuyer(user);
		invoice.setLocation(user.getLocation());
		invoice.setState(BaseConstants.WAITING);
		invoice.setPayment(BaseConstants.PAYMENT_WAITING);
		invoice.setOrderDate(new Date());
		List<InvoiceDetail> details = new ArrayList<>();
		for (InvoiceModel el : model) {
			InvoiceDetail detail = new InvoiceDetail();
			detail.setNote(el.getNote());
			detail.setQuantity(el.getQuantity());
			InvoiceDetailId id = new InvoiceDetailId();
			id.setProductName(el.getName());
			id.setInvoice(invoice);
			detail.setId(id);
			detail.setState(BaseConstants.WAITING);
			details.add(detail);
		}
		invoiceRepository.saveAndFlush(invoice);
		invoiceDetailRepository.saveAllAndFlush(details);
		return invoice;
	}

	@Override
	public Invoice updateOrder(int id, HttpServletRequest request) {
		Invoice invoice = invoiceRepository.findById(id).orElse(null);
		User user = getUser(request);
		invoice.setHandlerInvoice(user);
		invoice.setState(BaseConstants.IN_PROCESS_OR_ACCEPT);
		invoiceRepository.saveAndFlush(invoice);
		return invoice;
	}

	private User getUser(HttpServletRequest request) {
		User user = new User();
		try {
			user = userRepository
					.findByUsername(jwtTokenUtil.getUsernameFromToken(request.getHeader("Authorization").substring(7)));
		} catch (ExpiredJwtException e) {
			throw new LoginException("Token is expired");
		}
		return user;
	}

	@Override
	public boolean declineOrder(InvoiceDecline invoice) {
		Invoice newInvoice= invoiceRepository.findById(invoice.getId()).orElse(null);
		if (newInvoice == null)
			throw new NullException("ID not found");
		if (newInvoice.getState().equals(BaseConstants.IN_PROCESS_OR_ACCEPT))
			throw new NullException("Can not decline invoice in process");
		newInvoice.setNote(invoice.getNote());
		newInvoice.setState(BaseConstants.DECLINE);
		invoiceRepository.saveAndFlush(newInvoice);
		return true;
	}

	@Override
	public Invoice updateInvoicePayment(UpdateInvoice newInvoice) {
		Invoice invoice = invoiceRepository.findById(newInvoice.getId()).orElse(null);
		if (invoice == null)
			throw new NullException("ID not found");
		if (!invoice.getState().equals(BaseConstants.WAITING))
			throw new NullException("Can't update invoice inprogess");
		if (!newInvoice.getState().isEmpty())
			invoice.setState(newInvoice.getState());
		invoice.setPayment(newInvoice.getPayment());
		invoiceRepository.saveAndFlush(invoice);
		return invoice;
	}

	@Override
	public List<Invoice> findByHandler(String hanlder) {
		return invoiceRepository.findByHandler(hanlder);
	}

	@Override
	public List<Invoice> findByState(String state, HttpServletRequest request) {
		User user =getUser(request);
		return invoiceRepository.findByState(state,user.getLocation().getLocationCode());
	}

	@Override
	public boolean finish(int id, String payment) {
		Invoice invoice = invoiceRepository.findById(id).orElse(null);
		if (invoice == null)
			throw new NullException("ID not found");
		invoice.setPayment(payment);
		invoice.setState(BaseConstants.DONE);
		invoiceRepository.saveAndFlush(invoice);
		return true;
	}

	@Override
	public List<Invoice> findByLocation(HttpServletRequest request) {
		User user =getUser(request);
		return invoiceRepository.findByLocation(user.getLocation().getLocationCode());
	}

}
