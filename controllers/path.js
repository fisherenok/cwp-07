const path = exports;
const extras = require('../utils/extras');
const fs = require('fs');

path.index = function (req, res, payload, cb) {
    fs.readFile('./public/index.html', (err, data) => {
        if (err) {
            cb({code: 404, message: 'Page not found'});
        } else {
            cb(null, extras.getResponse(extras.contentTypes["html"], data));
        }
    })
};

path.indejs = function (req, res, payload, cb) {
    fs.readFile('./public/index.js', (err, data) => {
        if (err) {
            cb({code: 404, message: 'Page not found'});
        } else {
            cb(null, extras.getResponse(extras.contentTypes["js"], data));
        }
    })
};

path.site = function (req, res, payload, cb) {
    fs.readFile('./public/site.css', (err, data) => {
        if (err) {
            cb({code: 404, message: 'Page not found'});
        } else {
            cb(null, extras.getResponse(extras.contentTypes["css"], data));
        }
    })
};

path.form = function (req, res, payload, cb) {
    fs.readFile('./public/form.html', (err, data) => {
        if (err) {
            cb({code: 404, message: 'Page not found'});
        } else {
            cb(null, extras.getResponse(extras.contentTypes["html"], data));
        }
    })
};

path.formjs = function (req, res, payload, cb) {
    fs.readFile('./public/form.js', (err, data) => {
        if (err) {
            cb({code: 404, message: 'Page not found'});
        } else {
            cb(null, extras.getResponse(extras.contentTypes["js"], data));
        }
    })
};

