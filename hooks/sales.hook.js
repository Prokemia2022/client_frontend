import easyinvoice from 'easyinvoice';

export const Create_Invoice_PDF=(payload)=>{
		const data = {
	    "customize": {},
	    "images": {
	        // The logo on top of your invoice
	        logo: 'https://res.cloudinary.com/musembi77/image/upload/v1671824849/ooa1dvpgz9relvhe6pfd.jpg',
	        "background": ""
	    },
	    // Your own data
	    "sender": {
	        "company": "Innovation Core Limited",
	        "address": "Kibo street, Industrial Area",
	        "zip": "Nairobi",
	        "city": "Mobile: +254202525265",
	        "country": "Pin: P051465357M",
	        //"custom2": "custom value 2",
	    },
	    // Your recipient
	    "client": {
	        "company": payload?.company_name_of_client,
	        "address": payload?.name_of_client,
	        "zip": payload?.email_of_client,
	        "city": payload?.mobile_of_client,
	        "country": payload?.location_of_client,
	        // "custom1": "custom value 1",
	    },
	    "information": {
	        // Invoice number
	        "number": payload?._id,
	        // Invoice data
	        "date": payload?.createdAt,
	        // Invoice due date
	        "due-date": payload?.delivery_date
	    },
	    // The products you would like to see on your invoice
	    // Total values are being calculated automatically
	    "products": [
	        {
	            "quantity": payload?.volume_of_items,
	            "description": payload?.name_of_product,
	            "tax-rate": 16,
	            "price": payload?.unit_price
	        },
			{
	            "quantity": payload?.volume_of_items,
	            "description": payload?.name_of_product,
	            "tax-rate": 16,
	            "price": payload?.unit_price
	        },
	    ],
	    // The message you would like to display on the bottom of your invoice
	    "bottom-notice": `Terms:${payload?.delivery_terms}. Payment_Terms: ${payload?.payment_terms}. Make Payments to Innovation Core LTD, SBM BANK KENYA, ACC No.0082102124001, Riverside Branch`,
        // Settings to customize your invoice
	    "settings": {
	        "currency": "KES", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
	    },
	    // Translate your invoice to your preferred language
	    "translate": {},
	};
	try{
		easyinvoice.createInvoice(data, function (result) {
			easyinvoice.download(`${payload?.company_name_of_client}.pdf`, result.pdf);
		});
	}catch(err){
		console.log(err)
	}
}