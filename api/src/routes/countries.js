const { Router } = require('express')
const router = Router();

const { getDbInfo } = require('../controller/getApiInfo')

router.get('/', async (req, res) => {
    const { name } = req.query
    let allCountries = await getDbInfo();
    if (name) {
        let countryName = await allCountries.filter((el) => 
        el.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
        countryName.length ?
            res.status(200).send(countryName) :
            res.status(404).send('The country does not exist');
    } else {
        res.status(200).send(allCountries);
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    let allCountries = await getDbInfo();
    if (id) {
        let countryId = await allCountries.filter(el => el.id == id.toUpperCase())
        countryId.length ?
        res.status(200).send(countryId) :
        res.status(404).send('The country does not exist');
    }
})

module.exports = router;