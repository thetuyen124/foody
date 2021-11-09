package com.tlu.datn.foody.util;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordBcryptUtil {
  private PasswordBcryptUtil() {}

  /***
   * Encode password
   * @param plaintText
   * @return
   */
  public static String passwordEncoder(String plaintText) {
    if (StringUtils.isBlank(plaintText)) {
      throw new IllegalArgumentException("Input password should not blank");
    }
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    String encodedPassword = encoder.encode(plaintText);
    return encodedPassword;
  }
  
  /***
   * check password encoded
   * 
   * @param plainText
   * @param encodedPassword
   * @return
   */
  public static boolean checkPasswordMatching(String plainText, String encodedPassword) {
    if (StringUtils.isBlank(plainText)) {
      throw new IllegalArgumentException("Input password should not blank");
    }
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    return encoder.matches(plainText, encodedPassword);
  }

}
