const { Country, Activity } = require('../db.js');
const axios = require('axios');

async function getApiInfo() {
    const apiUrl = await axios.get('https://restcountries.com/v3/all')
    const apiInfo = await apiUrl.data.map((c) => {
        return {
            id: c.cca3,
            name: c.name.common,
            flag: c.flags[0],
            continent: c.continents[0],
            capital: c.capital,
            subregion: c.subregion,
            area: c.area,
            population: c.population
        }
    })
    const guardar = () => {
        apiInfo.map(i => {
            Country.findOrCreate({
                where: {
                    name: i.name,
                    id: i.id,
                },
                defaults: {
                    continent: i.continent,
                    flag: i.flag,
                    capital: i.capital,
                    subregion: i.subregion,
                    area: i.area,
                    population: i.population
                },
            }).catch((err) => { console.log(err) });
        })
    }
    guardar()
    return apiInfo;
};

const getDbInfo = async () => {
    await getApiInfo()
    const dbInfo = await Country.findAll({
        
        // attributes: {
        //     exclude: ['updatedAt', 'createdAt'],
        // },

        include: {
            model: Activity,
            attributes: ['name','duration','difficulty', 'season'],
            through: {
                attributes: [],
            }
        }
    })
    return dbInfo
}

const getActivities = async () => {
    const allActivities = await Activity.findAll()
    return allActivities;
}

module.exports = { getDbInfo, getActivities };