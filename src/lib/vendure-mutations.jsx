import { gql } from "@apollo/client";

// Mutation to set shipping address
export const SET_SHIPPING_ADDRESS = gql`
  mutation SetOrderShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      id
      shippingAddress {
        fullName
        streetLine1
        city
        postalCode
        country
      }
    }
  }
`;

// Mutation to set payment method
export const SET_PAYMENT_METHOD = gql`
  mutation SetOrderPayment($method: String!) {
    addPaymentToOrder(input: { method: $method, metadata: {} }) {
      id
      state
    }
  }
`;

// Mutation to place the order
export const PLACE_ORDER = gql`
  mutation PlaceOrder {
    transitionOrderToState(state: "ArrangingPayment") {
      id
      state
    }
  }
`;
