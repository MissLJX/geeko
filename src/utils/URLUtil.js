/**
 * Created by shao_ on 2017/6/21.
 */
import _ from 'lodash';


export const skipUrl = function () {
    var args = Array.prototype.slice.apply(arguments),
        url = args[0], others = args.slice(1);
    _.each(others, (value) => {
        url = url.replace(/\{.*?\}/i,value)
    });

    return url;
}