<template>
    <address class="st-address">
        <div class="_title">
            <span>Delivery Details</span>
        </div>
        <div class="_content">
            <p class="c-six">Delivery Address</p>
            <p>
                <span class="f-medium">{{address.name}} </span>
                <span class="c-six">({{address.phoneNumber}})</span>
            </p>
            <p class="c-six">{{addressLabel}} {{address.zipCode}} {{address.city}}/{{stateCountry}}</p>
        </div>

        <div class="_shipping-method" v-if="shipping">
            <p class="c-nine">Shpping Method</p>
            <p class="f-medium">{{shipping}}</p>
        </div>
    </address>
</template>

<script type="text/ecmascript-6">
    export default{
        props: [
            'address','shipping'
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

<style lang="scss" scoped>
    .st-address{
        color: #222222;
        font-style: normal;
        padding-bottom: 12px;
        border-bottom: 8px solid #f7f7f7;
        border-top: 8px solid #f7f7f7;
        font-size: 14px;
        ._title{
            height: 45px;
            line-height: 45px;
	        font-family: SlatePro-Medium;
            color: #222222;
            border-bottom: 1px solid #eeeeee;
        }

        ._content{
            & > p{
                padding: 5px 0px;
            }
        }

        ._shipping-method{
            margin-top: 20px;

            & > p{
                line-height: 25px;
            }
        }

        .c-six{
            color: #666666;
        }

        .c-nine{
            color: #999999;
        }

        .f-medium{
            font-family: SlatePro-Medium;
        }
    }
</style>