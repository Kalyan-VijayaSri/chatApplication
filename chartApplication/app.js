var express = require('express');
var path = require('path');
const port = 4000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
let config = require("./config/config");
var User = require('./model/userSchema');
var app = express();

/**
 * Setting the view engine to ejs 
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Setting the bodyParser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Redering index page
 */
app.get('/', (req, res) => {
    res.render('index');
});

/**
 * Rendering home to view bar chart
 */
app.post('/home', (req, res) => {

    let obj = {
        chart: {
            type: 'bar'
        },
        title: null, subtitle: null, xAxis: null,
        yAxis: {
            min: 0,
            title: {
                text: 'No of Institutes (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            // backgroundColor: (
            //     (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
            //        '#FFFFFF'),
            //  shadow: true
        
        },
        credits: {
            enabled: false
        },
        series: []
    }
    let state = [];
    let noI = [];
    User.find({}, function (err, result) {
        if (err) throw err;
        else {
            for (var i = 0; i < result.length; i++) {
                state.push(result[i].state);
                noI.push(result[i].noI);
            }
            var p = "No of institutes in 1990";
            obj.title = {
                text: 'No of Institues'
            },
                obj.subtitle = {
                    text: 'Source: Wikipedia.org'
                },
                obj.xAxis = {
                    categories: state,
                    title: {
                        text: null
                    }
                }
            obj.series.push({ name: p, data: noI });
            res.json(obj);
        }
    });
});

module.exports = app;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))