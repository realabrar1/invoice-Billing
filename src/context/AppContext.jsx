import { useContext, createContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        currentDate: Date.now(),
        invoiceNumber: '',
        dateOfIssue: "",
        notes: '',
        buyerName: "",
        buyerEmail: "",
        buyerMobno: "",
        buyerAddress: "",
    });
    const [products, setProducts] = useState([]);
    const [storeInfo, setStoreInfo] = useState({
        name: '',
        address: '',
        logo: '',
        email: '',
        mobno: '',
        pincode: '',
        city: '',
        state: '',
        terms: '',
        clientNotes: '',
        showTerms: true,
        showClientNotes: true,
        currency: '₹',
        dateFormat: 'DD/MM/YYYY',
    });
    const [showReview, setShowReview] = useState(false);

    const [showBillingPercent, setShowBillingPercent] = useState({
        discount: false,
        tax: false,
        shipping: false,
    });

    const [discount, setDiscount] = useState({
        type: 'percent',
        value: "0"
    })

    const [tax, setTax] = useState({
        type: "percent",
        value: "0"
    })

    const [shipping, setShipping] = useState("0");

    const getTotalAmount = () => {
        const total = products.reduce((acc, it) => acc + it.total, 0);
        const applyDiscount = discount.type === "absolute" ? Number(discount.value) : (total * Number(discount.value) / 100);
        const totalAfterDiscount = total - applyDiscount;
        const applyTax = tax.type === "absolute" ? Number(tax.value) : (totalAfterDiscount * Number(tax.value) / 100);
        const grandTotal = (totalAfterDiscount + applyTax + Number(shipping)).toFixed(2);
        return { total, discount, tax, shipping, grandTotal: grandTotal ?? 0, discountAmount: applyDiscount, taxAmount: applyTax };
    };

    const getBillJSONData = () => {
        const { total, discount, tax, shipping, grandTotal, discountAmount, taxAmount } = getTotalAmount();
        const billData = {
            "invoiceNumber": formData.invoiceNumber,
            "dateOfIssue": formData.dateOfIssue,
            "notes": formData.notes,
            "buyerName": formData.buyerName,
            "buyerEmail": formData.buyerEmail,
            "buyerMobno": formData.buyerMobno,
            "buyerAddress": formData.buyerAddress,
            "currentDate": new Date(),
            "products": products,
            "storeInfo": storeInfo,
            "total": total,
            "discount": discount,
            "tax": tax,
            "shipping": shipping,
            "grandTotal": grandTotal,
            "discountAmount": discountAmount,
            "taxAmount": taxAmount,
            "showBillingPercent": showBillingPercent,
        }
        return billData;
    }

    const loadInvoiceFromJSON = (invoiceData) => {
        const {
            invoiceNumber,
            dateOfIssue,
            notes,
            buyerName,
            buyerEmail,
            buyerMobno,
            buyerAddress,
            currentDate,
            products,
            storeInfo,
            discount,
            tax,
            showBillingPercent
        } = invoiceData;
        setFormData({
            currentDate,
            invoiceNumber,
            dateOfIssue,
            notes,
            buyerName,
            buyerEmail,
            buyerMobno,
            buyerAddress,
        })
        setProducts(products)
        setStoreInfo({
            ...storeInfo,
            name: storeInfo.name,
            address: storeInfo.address,
            logo: storeInfo.logo,
            email: storeInfo.email,
            mobno: storeInfo.mobno,
            pincode: storeInfo.pincode,
            city: storeInfo.city,
            state: storeInfo.state,
            terms: storeInfo.terms,
            clientNotes: storeInfo.clientNotes,
            showTerms: storeInfo.showTerms,
            showClientNotes: storeInfo.showClientNotes,
            currency: storeInfo.currency,
            dateFormat: storeInfo.dateFormat,
        })
        setDiscount(discount);
        setTax(tax);
        setShowBillingPercent(showBillingPercent);
    }

    const resetAll = () => {
        setFormData({
            currentDate: Date.now(),
            invoiceNumber: '',
            dateOfIssue: "",
            notes: '',
            buyerName: "",
            buyerEmail: "",
            buyerMobno: "",
            buyerAddress: "",
        });
        setProducts([]);
        setStoreInfo({
            name: '',
            address: '',
            logo: '',
            email: '',
            mobno: '',
            pincode: '',
            city: '',
            state: '',
            terms: '',
            clientNotes: '',
            showTerms: true,
            showClientNotes: true,
            currency: '₹',
            dateFormat: 'DD/MM/YYYY',
        });
        setShowReview(false);
        setShowBillingPercent({
            discount: false,
            tax: false,
            shipping: false,
        });
        setDiscount({
            type: 'percent',
            value: "0"
        })
        setTax({
            type: "percent",
            value: "0"
        })
        setShipping("0");
    }

    return (
        <AppContext.Provider value={{
            formData,
            setFormData,
            products,
            setProducts,
            storeInfo,
            setStoreInfo,
            showReview,
            setShowReview,
            showBillingPercent,
            setShowBillingPercent,
            discount,
            setDiscount,
            tax,
            setTax,
            shipping,
            setShipping,
            getTotalAmount,
            getBillJSONData,
            loadInvoiceFromJSON,
            resetAll
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;