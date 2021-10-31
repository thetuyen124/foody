package com.tlu.datn.foody.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ExistedExceptionHandler {
    @ExceptionHandler(value = { IllegalArgumentException.class })
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
	String errorMessage = ex.getMessage();
	if (errorMessage == null)
	    errorMessage = ex.toString();

	return new ResponseEntity<>(errorMessage, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = { LoginException.class })
    public ResponseEntity<Object> handleWrongPasswordException(LoginException ex, WebRequest request) {
	String errorMessage = ex.getMessage();
	if (errorMessage == null)
	    errorMessage = ex.toString();

	return new ResponseEntity<>(errorMessage, new HttpHeaders(), HttpStatus.UNAUTHORIZED);
    }
}
