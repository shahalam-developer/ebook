$(document).ready(function() {
    bKash.init({
        paymentMode: 'checkout',
        paymentRequest: {
            amount: '500.00', // Amount to charge
            intent: 'sale'
        },
        createRequest: function(request) {
            // Call your backend to create a payment ID
            $.ajax({
                url: '/your-backend-api/create-payment', 
                type: 'POST',
                success: function(data) {
                    if (data && data.paymentID != null) {
                        bKash.create().onSuccess(data);
                    } else {
                        bKash.create().onError();
                    }
                }
            });
        },
        executeRequestOnAuthorization: function() {
            // Call your backend to execute the payment after customer confirms OTP/PIN
            $.ajax({
                url: '/your-backend-api/execute-payment',
                type: 'POST',
                success: function(data) {
                    if (data && data.paymentID != null) {
                        window.location.href = "success_page.html";
                    } else {
                        bKash.execute().onError();
                    }
                }
            });
        }
    });
});