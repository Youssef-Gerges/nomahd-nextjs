"use client";

import React from "react";
import {useGetUserAddress} from "@/api/address/getUserAddress";
import AddressSearchBar from "@/components/othersPages/AddressSearchBar";

export default function CheckoutAddress({selectedAddress, setAddress, setSelectedAddress, handleAddress}) {
    const {data: addresses} = useGetUserAddress();


    return (
        <div className="my-account-content account-address">
            <div className="text-center widget-inner-address">
                <button
                    type={"button"}
                    className="tf-btn btn-fill animate-hover-btn btn-address mb_20"
                    onClick={() => setSelectedAddress(0)}
                >
                    Add a new address
                </button>
                <div
                    className="show-form-address wd-form-address"
                    id="formnewAddress"
                    style={selectedAddress === 0 ? {display: "block"} : {display: "none"}}
                >
                    <div className="title">Add a new address</div>
                    <AddressSearchBar addressChange={setAddress} />
                    <fieldset className="box fieldset text-start">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            required
                            type="number"
                            id="phone"
                            onChange={handleAddress}
                        />
                    </fieldset>
                </div>

                <div className={"d-flex flex-wrap justify-content-center"} style={{gap: '2rem'}}>
                    {addresses?.data?.map(address =>
                        <div onClick={() => setSelectedAddress(address.id)} className={"border border-1 rounded-4 p-3"}
                             style={{cursor: 'pointer'}} key={address.id}>
                            <input type={'radio'} checked={selectedAddress === address.id}/>
                            {address.set_default == 1 ? <h6 className="mb_20">Default</h6> : ''}
                            <p>{address.country_name}</p>
                            <p>{address.address}</p>
                            <p>{address.state_name}</p>
                            <p>{address.postal_code}</p>
                            <p className="mb_10">{address.phone}</p>
                        </div>)}
                </div>
            </div>
        </div>
    );
}
