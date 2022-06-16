const initialState = {
    countries:[],
    allCountries:[],
    activities:[],
    detail:[]
}

export default function rootReducer (state = initialState, action){
    switch (action.type){
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }
        
        case 'SEARCH_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
            }
        
        case 'GET_ID_COUNTRIES':
            return {
                ...state,
                detail: action.payload,
            }
        
        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities: action.payload,
            }
        
        case 'POST_ACTIVITIES':
            return {
                ...state,
            }
        
        case 'RESET':
            return {
                ...state, 
                detail:[]
            }
        
        case 'FILTER_BY_CONTINENT':
            const allcontinents = state.allCountries;
            const continentsFiltered = action.payload === 'All'? allcontinents
            :allcontinents.filter(c => c.continent === action.payload)
            if (typesFiltered.length === 0) {
                alert(`No countries found for ${action.payload} continent`)
                return state
            } else {
                return {
                   ...state,
                   countries: continentsFiltered
                };
            }
        
        case 'FILTER_BY_ACTIVITIES':
            const allActivities = state.allCountries
            const activitiesFiltered = allActivities.filter((c) => { 
                return c.activities.find((c) => { 
                return c.name === action.payload})
            })
            if (action.payload === 'todos') {
                return { 
                    ...state, 
                    countries: allActivities
                }
            } else {
                return {
                    ...state,
                    countries: activitiesFiltered
                }
            }

        case 'ORDER_BY_NAME':
            let orderCountriesByName = action.payload === ASC ? 
            state.countries.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            }) :
            state.countries.sort((a, b) => {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                countries: orderCountriesByName
            }
    
        case' ORDER_BY_POPULATION':
            let orderCountriesByPopulation = action.payload === HIGHER_POPULATION ? state.countries.sort((a, b)=>{
                if (a.population < b.population) {
                    return 1;
                }
                if (a.population > b.population) {
                    return -1;
                }
            }) :
            state.countries.sort((a, b) => {
                if (a.population < b.population) {
                    return -1;
                }
                if (a.population > b.population) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                countries: orderCountriesByPopulation
            }
    
        default:
        return state;
    }
}

//filtrar por continente y por tipo de actividad turistica 
//ordenar ascendente y descendente por poblacion y nombre de pais