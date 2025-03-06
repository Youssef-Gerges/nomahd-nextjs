"use client";

import React, {useState} from "react";
import {useGetUserAddress} from "@/api/address/getUserAddress";
import {useGetCountries} from "@/api/address/getCountries";
import {useGetCities} from "@/api/address/getCities";

export default function CheckoutAddress({selectedAddress, setSelectedAddress, handleAddress}) {
    const {data: addresses} = useGetUserAddress();
    const {data: countries} = useGetCountries();
    const {data: cities} = useGetCities();

    return (
        <div className="my-account-content account-address">
            <div className="text-center widget-inner-address">
                <button
                    className="tf-btn btn-fill animate-hover-btn btn-address mb_20"
                    onClick={() => setSelectedAddress(0)}
                >
                    Add a new address
                </button>
                <form
                    className="show-form-address wd-form-address"
                    id="formnewAddress"
                    onSubmit={(e) => e.preventDefault()}
                    style={selectedAddress === 0 ? {display: "block"} : {display: "none"}}
                >
                    <div className="title">Add a new address</div>

                    <fieldset className="box fieldset text-start">
                        <label htmlFor="country_id">Country/Region</label>
                        <div className="select-custom">
                            <select
                                required
                                className="tf-select w-100"
                                id="country_id"
                                name="address[country_id]"
                                data-default=""
                                onChange={handleAddress}
                            >
                                <option value="---" data-provinces="[]">
                                    ---
                                </option>
                                {countries?.data?.map((country, i) => (
                                    <option key={i} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </fieldset>

                    <fieldset className="box fieldset text-start">
                        <label htmlFor="city">City</label>
                        <div className="select-custom">
                            <select
                                required
                                className="tf-select w-100"
                                id="city"
                                name="address[city]"
                                data-default=""
                                onChange={handleAddress}
                            >
                                <option value="---" data-provinces="[]">
                                    ---
                                </option>
                                {cities?.data?.map((country, i) => (
                                    <option key={i} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </fieldset>

                    <fieldset className="box fieldset text-start">
                        <label htmlFor="address">Address</label>
                        <input
                            required
                            type="text"
                            id="address"
                            onChange={handleAddress}
                        />
                    </fieldset>
                    <fieldset className="box fieldset text-start">
                        <label htmlFor="postal">Postal Code</label>
                        <input
                            required
                            type="text"
                            id="postal_code"
                            onChange={handleAddress}
                        />
                    </fieldset>

                    <fieldset className="box fieldset text-start">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            required
                            type="number"
                            id="phone"
                            onChange={handleAddress}
                        />
                    </fieldset>

                    <fieldset className="box fieldset text-start">
                        <label htmlFor="whatsapp">WhatsApp Number</label>
                        <input
                            required
                            type="number"
                            id="whatsapp"
                            onChange={handleAddress}
                        />
                    </fieldset>
                </form>
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
