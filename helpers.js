function filterVisible(nodes, returnFull){
    var list = nodes instanceof Array ? nodes : node2array(nodes);
    var vis = list.filter(function(el){return el.offsetWidth!==0});
    return returnFull ? vis : vis.length ? vis[0] : undefined
}

function popAttribute(elem, attr){
    var val = elem.getAttribute(attr);
    elem.removeAttribute(name);
    return val;
}

function attrs2obj(elem, attrs_list, obj) { //covert needed elem attrs into obj; attrs_list = [[attr_name, fn || null], .. ]
    var obj = obj || new Object;
    var attr = attrs_list.pop(), name = attr[0], fn = attr[1] || function(val){return val};
    obj[name.replace('data-','')] = fn(popAttribute(elem, name));
    return attrs_list.length ? attrs2obj(elem, attrs_list, obj) : obj
};

function findParent(parentSellector, el, nodes){
    var parent = el.parentNode;
    var nodes = nodes || node2array(document.querySelectorAll(parentSellector));
    var filterIsParent = nodes.filter(function(el){return el == parent});
    return filterIsParent.length ? parent :
           parent != document ? findParent(parentSellector, parent, nodes) :
           null
}

function removeEl(selector, parent){
    var parent = parent || document.body;
    node2array(
        document.querySelectorAll(selector))
            .forEach(function(el){
                parent.removeChild(el);
    });
}

function showhideEl(id, show){
    var el = typeof id == 'string' ? document.getElementById(id) : id;
    el.style.display = show ? 'inline-block' : 'none'
}

function showHideElBlock(id, show){
    var el = typeof id == 'string' ? document.getElementById(id) : id;
    el.style.display = show ? 'block' : 'none'
}

function trim(str){
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

function splitWords(str){
    return trim(str).split(/\s+/);
}

function getClass(el) {
    return el.className.baseVal === undefined ? el.className : el.className.baseVal;
}

function setClass(el, name) {
    if (el.className.baseVal === undefined) {
        el.className = name;
    } else {
        el.className.baseVal = name;
    }
}

function hasClass(el, name) {
    if (el.classList !== undefined) return el.classList.contains(name);
    var className = getClass(el);
    return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
}

function addClass(id, name){
    var el = typeof id == 'string' ? document.getElementById(id) : id;
    if (el.classList !== undefined) {
        var classes = splitWords(name);
        for (var i = 0, len = classes.length; i < len; i++) {
            el.classList.add(classes[i]);
        }
    } else if (!hasClass(el, name)) {
        var className = getClass(el);
        setClass(el, (className ? className + ' ' : '') + name);
    }
}

function removeClass (el, name) {
    if (el.classList !== undefined) {
        el.classList.remove(name);
    } else {
        setClass(el, trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
    }
}

function toggleClass(el, name){
    if(hasClass(el, name)) removeClass(el, name)
    else addClass(el, name)
}

function filterNodes(nodes, fn){
    return node2array(nodes).filter( fn )
}


function node2array(nodes){
    return Array.prototype.slice.call(nodes)
}


function tagnameEach(tag, fn){
    node2array( document.getElementsByTagName(tag) ).forEach(fn)
}


function sameNode(n1, n2){
    var fn = n1.isSameNode ? 'isSameNode' : 'isEqualNode';
    return n1[fn](n2)
}

function getMouse (e) {
    if(e.changedTouches) var e = e.changedTouches[0];
    return {x: e.clientX, y: e.clientY}
}

function random(min,max){
    return Math.floor(Math.random()*(min || 2)+(max||0))
}

function choice(array){
    return array[random(0, array.length-1)]
}

/*----------------------------------------------------------------------------*/
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

String.prototype.toIntArray = function(separate){
    var array = this.split(separate || ',');
    return array.map(function(el){return parseInt(el, 10)})
}

/*----------------------------------------------------------------------------*/

