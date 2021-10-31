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
    private int ProductName;
}
