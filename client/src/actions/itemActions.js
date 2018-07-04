import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'
const appHeaders = new Headers();

export const getItems = () => dispatch => {
	dispatch(setItemsLoading())
	fetch('http://localhost:5000/api/items', {method: 'GET', headers: appHeaders})
		.then(res => res.json())
		.then(data => {	
			dispatch({
				type: GET_ITEMS,
				payload: data
			})
		})
		.catch(err => console.log(err))
}

export const addItem  = data => dispatch => {
	fetch('http://localhost:5000/api/items', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: ADD_ITEM,
				payload: {
					_id: data._id,
					date: data.date,
					name: data.name
				}
			})
		})
		.catch(err => console.log(err))
}

export const deleteItem = id => dispatch => {
	let URL = window.encodeURI(`http://localhost:5000/api/items/${id}`)
	fetch(URL, {method: 'DELETE'})
		.then(res => {
			dispatch({
				type: DELETE_ITEM,
				payload: {
					id
				}
			})
		})
		.catch(err => console.log(err))
}

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING,
	}
}