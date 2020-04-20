/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 19, 2020
 * CheckOut Actions - actions for checkout products
 */

import * as types from './types';

export function setShipmentInfo(params, isPlaceOrder, orderPlacedCallback) {
  return {
    type: types.SET_SHIPMENT_INFO,
    params,
    isPlaceOrder,
    orderPlacedCallback,
  };
}

export function applyVoucher(voucherCode, apllyCodeCallback) {
  return {
    type: types.APPLY_VOUCHER_CODE,
    voucherCode,
    apllyCodeCallback,
  };
}

export function getPaymentAndShippingMethods(
  getPaymentAndShippingMethodsCallback,
) {
  return {
    type: types.GET_PAYMENT_AND_SHIPPING_METHODS,
    getPaymentAndShippingMethodsCallback,
  };
}
