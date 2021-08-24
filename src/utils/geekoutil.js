/**
 * Created by shao_ on 2017/6/26.
 */

import Cookie from 'js-cookie'
import _ from 'lodash'
const _url_analyst = function (name) {
    if (name) {
        return name.replace(new RegExp(/\s/g), '-');
    }
    return 'empty-name';
}

const month_names = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]


export const price = (money) => {
	if(money){
		return money.currency === 'EUR'? (money.amount + money.unit) : (money.unit + money.amount)
	}else{
		return ''
	}
}

export const enDate = (date) => {
    return month_names[date.getMonth()] + ' ' + date.getDate() + ',' + date.getFullYear()
}

export const enTime = (date) => {
    return enDate(date) + ' '+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

export const getCountry = () => {
    var language = navigator.language;
    if (language && language.indexOf("-") >= 0) {
        var keys = language.split("-");
        if (keys.length <= 1)
            return "US";
        return keys[1].toUpperCase();
    }
    return "US";
}


export const getUUID = () => {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


export const getWid = () => {
    var wid = '';
    wid = Cookie.get('clientId');
    if (!wid) {
        Cookie.set('clientId', getUUID(), {expires: 365});
        wid = Cookie.get('clientId');
    }
    return wid;
}


export const submit = (result) => {
  const {payURL, params} = result
  const form = document.createElement('form')
  form.style.display = 'none'
  form.setAttribute('method', 'POST')
  form.setAttribute('action', payURL)
  let input
  for (let key in params) {
    input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', key)
    input.setAttribute('value', params[key])
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
//image util
export const IMAGE_PREFIX = 'https://image.geeko.ltd'
export const IMAGE_SMALL = 'small'
export const IMAGE_MEDIUM = 'medium'
export const IMAGE_LARGE = 'large'
export const IMAGE_ORIGINAL = 'original'
export const imageutil = {
    getSamll(id){
        return IMAGE_PREFIX + '/' + IMAGE_SMALL + '/' + id
    },
    getMedium(id){
        return IMAGE_PREFIX + '/' + IMAGE_MEDIUM + '/' + id
    },
    getLarge(id){
        return IMAGE_PREFIX + '/' + IMAGE_LARGE + '/' + id
    },
    getOriginal(id){
        return IMAGE_PREFIX + '/' + IMAGE_ORIGINAL + '/' + id
    }
}

export const unitprice = (money) => {
	if(money){
		return money.currency === 'EUR'? (money.amount + money.unit) : (money.unit + money.amount)
	}else{
		return ''
	}
}

export const producturl = function (product) {
    return _.concat('product', _url_analyst(product.name), product.parentSku, product.id + '.html').join('/')
}
export const orderproducturl = function (product) {
    return _.concat('product', _url_analyst(product.productName), product.sku, product.productId + '.html').join('/')
}

export const dateFormat = function(times) {
    var date = new Date(times);

    var str;

    var year=date.getFullYear();
    var hour = date.getHours();

    if(hour > 12){
        hour -= 12;
        str = "PM";
    }else{
        str = "AM";
    }

    /* 在日期格式中，月份是从0开始的，因此要加0
    * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
    * */
    var month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
    var hours = hour < 10 ? "0"+hour : hour;
    var minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();
    

    // 拼接
    return day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " " + str;
}

