var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Search = require('./components/search');

$(function () {
	ReactDOM.render(<Search />, $('#content')[0]);
});
