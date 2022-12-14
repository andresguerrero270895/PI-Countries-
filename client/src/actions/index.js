import axios from 'axios';

export function getCountries(){
    return async function (dispatch){
        try{
            var json = await axios.get('/countries')
            return dispatch({
                type:'GET_COUNTRIES',
                payload: json.data
            })
        } catch (error){
            return dispatch({
                type:'SEARCH',
                payload: json.data
            })
        }
    }
}

export function searchCountries(name){
    return async function (dispatch){
        try{
            var json = await axios.get('/countries?name=' + name)
            return dispatch({
                type: 'SEARCH_COUNTRIES',
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function getDetail(id){
    return async function (dispatch){
        try{
            var json = await axios.get('/countries/'+id)
            return dispatch({
                type: 'GET_ID_COUNTRIES',
                payload: json.data
            })
        }catch (error){
            console.log(error)
        }
    }
}

export function getActivities(){
    return async function (dispatch){
        try{
            var json = await axios.get('/activity')
            return dispatch({
                type: 'GET_ACTIVITIES',
                payload: json.data
            })
        }catch (error){
            alert('There are no Activities')
            console.log(error)
        }
    }
}

export function postActivities(payload){
    return async function (dispatch){
        await axios.post('/activity',payload)
        return dispatch({
            type: 'POST_ACTIVITIES'
        })
    }
}

export function restartDetail(){
    return(dispatch) =>{
        dispatch({
            type: 'RESET'
        })
    }
}

export function filterByContinent(payload){
    return{
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function filterByActivities(payload){
    return{
        type: 'FILTER_BY_ACTIVITIES',
        payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type: 'ORDER_BY_POPULATION',
        payload
    }
}