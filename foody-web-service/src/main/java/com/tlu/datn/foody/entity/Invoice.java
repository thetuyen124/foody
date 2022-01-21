package com.tlu.datn.foody.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "invoices")
public class Invoice {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id;

	@ManyToOne
	@JoinColumn(name = "buyer")
	private User Buyer;

	@ManyToOne
	@JoinColumn(name = "handler_invoice")
	private User HandlerInvoice;

	@Column(name = "order_date")
	private Date OrderDate;

	@ManyToOne
	@JoinColumn(name = "location_code")
	private Location Location;

	@Column(name = "price")
	private int Price;

	@Column(name = "state")
	private String State;

	@Column(name = "payment")
	private String Payment;
	
	@Column(name = "note")
	private String Note;
	
	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public User getBuyer() {
		return Buyer;
	}

	public void setBuyer(User buyer) {
		Buyer = buyer;
	}

	public User getHandlerInvoice() {
		return HandlerInvoice;
	}

	public void setHandlerInvoice(User handlerInvoice) {
		HandlerInvoice = handlerInvoice;
	}

	public Date getOrderDate() {
		return OrderDate;
	}

	public void setOrderDate(Date orderDate) {
		OrderDate = orderDate;
	}

	public Location getLocation() {
		return Location;
	}

	public void setLocation(Location location) {
		Location = location;
	}

	public int getPrice() {
		return Price;
	}

	public void setPrice(int price) {
		Price = price;
	}

	public String getState() {
		return State;
	}

	public void setState(String state) {
		State = state;
	}

	public String getPayment() {
		return Payment;
	}

	public void setPayment(String payment) {
		Payment = payment;
	}

	public String getNote() {
		return Note;
	}

	public void setNote(String note) {
		Note = note;
	}

}
