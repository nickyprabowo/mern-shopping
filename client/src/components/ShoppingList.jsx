import React, { Component } from 'react'
import { Container, ListGroup, Button, ListGroupItem } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
// redux
import { connect } from 'react-redux'
import { getItems, deleteItem, addItem } from '../actions/itemActions'

import PropTypes from 'prop-types'

import AddModal from './AddModal'

class ShoppingList extends Component {

	state = {
		showModal: false
	}

	componentDidMount = () => {
		this.props.getItems()
	}

	toggleModal = () => {
		this.setState({
			showModal: !this.state.showModal
		})
	}

	deleteItem = (id) => {
		this.props.deleteItem(id)
	}

	render(){

		const { items } = this.props
		
		return(
			<Container>
				<Button color='dark' style={{marginBottom: '2rem'}} onClick={this.toggleModal}>Add Item</Button>
				<AddModal openModal={this.state.showModal} toggle={this.toggleModal}/>
				<ListGroup>
					{items.length > 0 &&
					<TransitionGroup className='shopping-list'>
						{items.map(({_id, name}) => {
							return (
								<CSSTransition key={_id} timeout={500} classNames='fade'>
									<ListGroupItem>
										<Button className='remove-btn' color='danger' size='sm' onClick={() => this.deleteItem(_id)}>
											x
										</Button>
										{name}
									</ListGroupItem>
								</CSSTransition>
							)
						})}
					</TransitionGroup>
					}
				</ListGroup>
			</Container>
		)
	}
}

ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return { ...state.item }
}

export default connect(mapStateToProps, { getItems, deleteItem, addItem })(ShoppingList)