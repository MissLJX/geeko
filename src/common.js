import * as utils from "./utils/constant.js"

const data = {};

data.getUrl = function(url){
    return utils.PROJECT + url;
}

export default data;