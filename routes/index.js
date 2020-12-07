var express = require('express');
var router = express.Router();
const db = require('../db/database');

router.get('/', async function(req, res, next) {
    const result = await db.getAllCountry();
    const confirmed = await db.getAllConfirmed();
    const recovered = await db.getAllRecovered();
    const death = await db.getAllDeath();

    let objectCountry = [];
    for (const key in result.rows) {
        objectCountry[key] = {
            state: result.rows[key].state,
            country: result.rows[key].country,
            confirmed: confirmed.rows[key].confirmed,
            recovered: recovered.rows[key].confirmed,
            death: death.rows[key].confirmed
        }
    }
    res.render('index', { countrys: objectCountry });
});

router.get('/map', async function(req, res, next) {
    const totalConfirmed = await db.getTotalConfirm();
    const totalRecovered = await db.getTotalRecovered();
    const totalDeath = await db.getTotalDeath();
    const getLatLongCon = await db.getLatLongCon();

    const objectTotal = {
        totalConfirmed: totalConfirmed.rows[0].confirmed,
        totalRecovered: totalRecovered.rows[0].recovered,
        totalDeath: totalDeath.rows[0].death
    }
    res.render('map', { totalObject: objectTotal, Maps: getLatLongCon.rows });
});

router.get('/protect', async function(req, res, next) {
    res.render('protect');
});



router.get('/country', async function(req, res, next) {
    const result = await db.getAllCountry();
    const confirmed = await db.getAllConfirmed();
    const recovered = await db.getAllRecovered();
    const death = await db.getAllDeath();

    let objectCountry = [];
    for (const key in result.rows) {
        objectCountry[key] = {
            state: result.rows[key].state,
            country: result.rows[key].country,
            confirmed: confirmed.rows[key].confirmed,
            recovered: recovered.rows[key].confirmed,
            death: death.rows[key].confirmed
        }
    }
    res.render('country', { countrys: objectCountry });
});

router.get('/thailand', async function(req, res, next) {
    const resultTH = await db.getAllCountryTH();
    const confirmedTH = await db.getAllConfirmedTH();
    const recoveredTH = await db.getAllRecoveredTH();
    const deathTH = await db.getAllDeathTH();

    let objectCountry = [];
    for (const key in resultTH.rows) {
        objectCountry[key] = {
            state: resultTH.rows[key].state,
            country: resultTH.rows[key].country,
            confirmed: confirmedTH.rows[key].confirmed,
            recovered: recoveredTH.rows[key].confirmed,
            death: deathTH.rows[key].confirmed
        }
    }
    res.render('thailand', { countrys: objectCountry });
});




module.exports = router;