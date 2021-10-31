package com.tlu.datn.foody.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tlu.datn.foody.entity.InvoiceDetail;
import com.tlu.datn.foody.repository.InvoiceDetailRepository;

@RestController()
public class InvoiceDetailController {

    @Autowired
    private InvoiceDetailRepository invoice;

    @GetMapping("/hello")
    @CrossOrigin
    public List<InvoiceDetail> hello() {
	return invoice.findAll();
    }
}
