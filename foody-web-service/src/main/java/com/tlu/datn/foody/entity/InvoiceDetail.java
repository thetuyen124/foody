package com.tlu.datn.foody.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "invoice_detail")
public class InvoiceDetail {

    @EmbeddedId
    private InvoiceDetailId id;

    @Column(name = "quantity")
    private int Quantity;

    @Column(name = "state")
    private String State;

    @Column(name = "note")
    private String Note;

    @Column(name = "price")
    private int Price;

    @Column(name = "total")
    private int Total;

    public int getQuantity() {
	return Quantity;
    }

    public void setQuantity(int quantity) {
	Quantity = quantity;
    }

    public String getState() {
	return State;
    }

    public void setState(String state) {
	State = state;
    }

    public String getNote() {
	return Note;
    }

    public void setNote(String note) {
	Note = note;
    }

    public int getPrice() {
	return Price;
    }

    public void setPrice(int price) {
	Price = price;
    }

    public int getTotal() {
	return Total;
    }

    public void setTotal(int total) {
	Total = total;
    }

}
