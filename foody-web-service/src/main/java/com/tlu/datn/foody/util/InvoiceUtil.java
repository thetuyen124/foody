package com.tlu.datn.foody.util;

import org.springframework.stereotype.Component;

import com.tlu.datn.foody.common.BaseConstants;
import com.tlu.datn.foody.exception.NullException;
import com.tlu.datn.foody.model.InvoiceDetailModel;

@Component
public class InvoiceUtil {
	public void checkDetailfield(InvoiceDetailModel model) {
		if (model.getState() == null || model.getState().isEmpty())
			throw new NullException("State can not be null");
		if (model.getState().equals(BaseConstants.IN_PROCESS_OR_ACCEPT)) {			
			if (model.getPrice() <= 0 )
				throw new NullException("Price can not be null or negative");
			if (model.getQuantity() <= 0 )
				throw new NullException("Quantity can not be null or negative");
		} else if(model.getState().equals(BaseConstants.DECLINE)){
			if (model.getNote() == null || model.getNote().isEmpty())
				throw new NullException("Note can not be null");
		}
	}
}
