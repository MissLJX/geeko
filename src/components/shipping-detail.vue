<template>
    <address class="st-address">
        <div><i class="iconfont">&#xe74f;</i><strong> {{address.name}}</strong><span>({{address.phoneNumber}})</span></div>
        <div>
            <i class="iconfont">&#xe74e;</i>{{addressLabel}},{{address.zipCode}}
        </div>
        <div>
            {{address.city}}, {{stateCountry}}
        </div>

    </address>
</template>

<script type="text/ecmascript-6">
    export default{
        props: [
            'address'
        ],
        computed: {
            state(){
                if (this.address.state) {
                    if (this.address.state.label) {
                        return this.address.state.label
                    } else {
                        return this.address.state.value
                    }
                }
                return null;
            },

            country(){
                if (this.address.country) {
                    if (this.address.country.label) {
                        return this.address.country.label
                    } else {
                        return this.address.country.value
                    }
                }
                return null;
            },

            stateCountry(){
                if (this.state) {
                    return this.state + ',' + this.country;
                }
                return this.country;

            },

            addressLabel(){
                if(this.address.unit){
                    return this.address.streetAddress1 + ', ' + this.address.unit
                }
                return this.address.streetAddress1
            }
        }
    }
</script>