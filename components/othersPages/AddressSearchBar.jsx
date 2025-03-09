import React, {useState} from 'react';
import axios from 'axios';
import {useGetCountries} from "@/api/address/getCountries";
import {useGetCities} from "@/api/address/getCities";

const AddressSearchBar = ({addressChange}) => {
    const {data: countries} = useGetCountries();
    const {data: cities} = useGetCities();

    const [shortAddress, setShortAddress] = useState('');
    const [fullAddress, setFullAddress] = useState('');

    const handleSearch = () => {
        const apiKey = 'AIzaSyBBlGPd4Y71QrKB5-0XZ8nuAq6s71drzkU';
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${shortAddress}&key=${apiKey}`;

        axios.get(apiUrl)
            .then(response => {
                const fullAddress = response.data.results[0].formatted_address;
                setFullAddress(fullAddress);

                const results = response.data.results[0];
                let selectedCountry = results.address_components.find(component => component.types.includes('country')).long_name;
                for (const countryItem of countries.data) {
                    if(selectedCountry.toLowerCase().trim() === countryItem.name.toLowerCase()) {
                        selectedCountry = countryItem.id;
                        break;
                    }

                }

                let selected_city = results.address_components.find(component => component.types.includes('locality')).long_name
                for (const cityItem of cities.data) {
                    if(selected_city.toLowerCase().trim() === cityItem.name.toLowerCase()) {
                        selected_city = cityItem.id;
                        break;
                    }
                }
                let postal = results.address_components.find(component => component.types.includes('postal_code')).long_name;
                const formattedAddress = results.formatted_address;
                const addressComponents = formattedAddress.split(',');
                let addressLine1 = '';
                let addressLine2 = '';
                if (addressComponents.length >= 3) {
                    addressLine1 = addressComponents[0].trim();
                    addressLine2 = addressComponents.slice(1).join(',').trim();
                } else {
                    addressLine1 = formattedAddress;
                }
                addressChange(old => ({
                    ...old,
                    postal: postal,
                    country_id: selectedCountry,
                    city: selected_city,
                    address: addressLine1 + ', ' + addressLine2,
                    state_id: selected_city
                }));
                console.log({postal: postal,
                    country_id: selectedCountry,
                    city: selected_city,
                    address: addressLine1,
                    state_id: selected_city})
            })
            .catch(error => {
                console.error('Error fetching address:', error);
            });
    };

    return (
        <div className={"mb-4"}>
            <div className={"d-flex align-items-center justify-content-center gap-3"}>
                <input
                    type="text"
                    value={shortAddress}
                    onChange={(e) => setShortAddress(e.target.value)}
                    placeholder="Enter short address"
                />
                <button type={"button"} className={"tf-btn btn-fill animate-hover-btn btn-address"} onClick={handleSearch}>Search
                </button>
            </div>
            {fullAddress && <p className={"text-start"}><span className={"fw-bold"}>Your Address:</span> {fullAddress}</p>}
        </div>
    );
};

export default AddressSearchBar;