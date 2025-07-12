const orders = [
  {
    user: null, // to be set in seeder.js
    orderItems: [
      {
        name: 'Airpods Wireless Bluetooth Headphones',
        qty: 1,
        image: '/images/airpods.jpg',
        price: 890.99,
        product: null, // to be set in seeder.js
      },
    ],
    shippingAddress: {
      address: '123 Main St',
      city: 'Chennai',
      postalCode: '600001',
      country: 'India',
    },
    paymentMethod: 'QR/UPI',
    paymentResult: {},
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 890.99,
    isPaid: true,
    paidAt: Date.now(),
    isDelivered: false,
  },
];

export default orders;
