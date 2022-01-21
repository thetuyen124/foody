package com.tlu.datn.foody.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class InvoiceDetailId implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice Invoice;

    @Column(name = "product_name")
    private String ProductName;

	public Invoice getInvoice() {
		return Invoice;
	}

	public void setInvoice(Invoice invoice) {
		Invoice = invoice;
	}

	public String getProductName() {
		return ProductName;
	}

	public void setProductName(String productName) {
		ProductName = productName;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
}
