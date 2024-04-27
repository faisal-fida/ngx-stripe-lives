import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  amount = '100.00';

  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: this.amount,
      currencyCode: 'PKR',
      countryCode: 'PK',
    },
  };

  onLoadPaymentData = (event: Event): void => {
    if ('detail' in event) {
      const customEvent = event as CustomEvent<google.payments.api.PaymentData>;
      console.log('load payment data', customEvent.detail);
    } else {
      console.error('Event does not contain detail property');
    }
  };

  onError = (event: any): void => {
    console.error('error', event.error);
  };

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
  ) => {
    console.log('payment authorized', paymentData);

    return {
      transactionState: 'SUCCESS',
    };
  };
}
