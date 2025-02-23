"use client"
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useGetPurchaseHistory} from "@/api/purchase-history/getUserPurchaseHistory";
import {token} from "@/api/api";
export default function PaymentConfirmation() {
    const {data: orders} = useGetPurchaseHistory()
    const [lastOrder, setLastOrder] = useState(null)

    useEffect(() => {
            console.log('orders', orders)
        if(orders?.data?.length > 0){
            setLastOrder(orders.data[0]);
        }
    }, [orders])
    const getInvoice = async () => {
        try {
            const response = await fetch(`https://nomahd.com/api/v2/invoice/download/${lastOrder?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to download file: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${lastOrder?.id}.pdf`; // Adjust file name & extension if needed
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading invoice:", error);
        }
    };

  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h5 className="fw-5 mb_20">Payment confirmation</h5>
            <div className="tf-page-cart-checkout">
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Code</div>
                <p>{lastOrder?.code}</p>
              </div>
                <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Date</div>
                <p>{lastOrder?.date}</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Payment method</div>
                <p>{lastOrder?.payment_type}</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb_24">
                <div className="fs-22 fw-6">Total</div>
                <span className="total-value">{lastOrder?.grand_total}</span>
              </div>
              <div className="d-flex gap-10">
                <a
                  onClick={getInvoice}
                  className="tf-btn w-100 btn-fill animate-hover-btn radius-3 justify-content-center"
                >
                  <span>Download Invoice</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
