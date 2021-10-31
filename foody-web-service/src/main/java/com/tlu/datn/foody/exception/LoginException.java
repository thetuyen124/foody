package com.tlu.datn.foody.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/***
 * Password exception
 * 
 * @author thetu
 *
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class LoginException extends RuntimeException {

    private static final long serialVersionUID = 3073900829649034244L;

    private final String statusText;

    /***
     * create constructor
     * 
     * @param statusText
     */
    public LoginException(String statusText) {
	this.statusText = statusText;
    }

    /***
     * get statusText
     * 
     * @return statusText
     */
    public String getMessage() {
	return statusText;
    }
}
