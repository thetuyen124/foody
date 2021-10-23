package com.tlu.datn.foody.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="invoices")
public class Invoice {

  @Id
  @Column(name="id")
  private int Id;
  
  @ManyToOne
  @JoinColumn(name = "buyer")
  private User Buyer;
  
  @ManyToOne
  @JoinColumn(name = "@ManyToOne\r\n"
      + "  @JoinColumn(name = \"buyer\")")
  private User HandlerInvoice;
  
  @Column(name="order_date")
  private Date OrderDate;
  
  @ManyToOne
  @JoinColumn(name = "location_code")
  private Location Location;
  
  @Column(name="price")
  private int Price;
  
  @Column(name="state")
  private String State;

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
  
}
