export default {
    name: "formAddAddress",
    data() {
        return {
            showForm: false,
            place: null,
            formData: {
                street: null,
                city: null,
                province: null,
                postalCode: null,
                lat: null,
                lng: null
            },
            rules: {
                street: [{ required: true }],
                city: [{ required: true }],
                province: [{ required: true }],
                postalCode: [{ required: true }],
                lat: [{ required: true }],
                lng: [{ required: true }]
            },
            isFormValidated: false,
            addressInput: null
        };
    },
    methods: {
        updateIsFormValidated() {
            const fields = this.$refs.formData.fields;
            this.isFormValidated = fields.reduce((acc, field) => {
                const valid = field.isRequired && field.validateState === 'success';
                const noError = !field.isRequired && field.validateState !== 'error';
                return acc && (valid || noError);
            }, true);
        },
        submit() {
            if (this.isFormValidated) {
                const address = {
                    street: this.formData.street,
                    city: this.formData.city,
                    province: this.formData.province,
                    postalCode: this.formData.postalCode,
                    lat: this.formData.lat,
                    lng: this.forEach.lng
                };
                this.$store
                    .dispatch("ADD_ADDRESS", address)
                    .then(
                        address => this.onAddAddressSuccessful(address),
                        error => this.onAddAddressFailed(error)
                    );
            }
            // this.$store.dispatch("ADD_ADDRESS", this.formData).then(address => {
            //     this.toggleForm(false);
            // });
        },
        onAddAddressSuccessful(address) {
            if (address) {
                this.toggleForm(false);
            }
        },
        onAddAddressFailed(error) {
            /*eslint-disable*/
            console.error(error);
            this.toggleForm(false);
        },
        toggleForm(showForm) {
            this.showForm = showForm;
        },
        setPlace(place) {
            /*eslint-disable*/
            console.log(place);
            const { address_components, geometry } = place;
            const address = this.buildAddressData(address_components, geometry);
            console.log(address);

            if (address) {
                this.place = address;
                this.formData.street = `${address.streetNumber} ${address.streetName}`;
                this.formData.city = address.city;
                this.formData.province = address.province;
                this.formData.postalCode = address.postalCode;
                this.formData.lat = address.lat;
                this.formData.lng = address.lng;
            }
        },
        buildAddressData(components, geometry) {
            const address = {};
            address.lat = geometry.location.lat().toString();
            address.lng = geometry.location.lng().toString();

            components.forEach(component => {
                if (component.types[0] === 'street_number') {
                    address.streetNumber = component.short_name;
                }

                if (component.types[0] === 'route') {
                    address.streetName = component.short_name;
                }

                if (component.types[0] === 'locality') {
                    address.city = component.short_name;
                }

                if (component.types[0] === 'administrative_area_level_1') {
                    address.province = component.short_name;
                }

                if (component.types[0] === 'postal_code') {
                    address.postalCode = component.short_name;
                }
            });

            return address;
        }
    }
}