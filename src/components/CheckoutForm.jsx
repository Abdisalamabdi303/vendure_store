"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useMutation } from "@apollo/client";
import client from "../lib/apollo-client";
import { SET_SHIPPING_ADDRESS, SET_PAYMENT_METHOD, PLACE_ORDER } from "../lib/vendure-mutations";

export default function CheckoutForm() {
  const { cart, setCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Kenya",
    paymentMethod: "credit_card",
  });

  const [setShippingAddress] = useMutation(SET_SHIPPING_ADDRESS, { client });
  const [setPaymentMethod] = useMutation(SET_PAYMENT_METHOD, { client });
  const [placeOrder] = useMutation(PLACE_ORDER, { client });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // 1. Set the shipping address
      await setShippingAddress({
        variables: {
          input: {
            fullName: formData.name,
            streetLine1: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
        },
      });

      // 2. Set the payment method
      await setPaymentMethod({ variables: { method: formData.paymentMethod } });

      // 3. Place the order
      const response = await placeOrder();

      if (response.data.transitionOrderToState.state === "ArrangingPayment") {
        alert("Order placed successfully!");
        setCart([]); // Clear the cart after checkout
      } else {
        alert("Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded shadow">
      <div className="mb-4">
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Payment Method</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="mpesa">M-Pesa</option>
        </select>
      </div>

      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
        Place Order
      </button>
    </form>
  );
}
