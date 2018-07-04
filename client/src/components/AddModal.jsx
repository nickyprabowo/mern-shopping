import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
// redux
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'

class AddModal extends Component {

	constructor(props){
		super(props)
		this.state = {
			item: ''
		}
	}

	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	toggle = () => {
		this.props.toggle()
	}

	onSubmit = (e) => {
		e.preventDefault()

		let data = {
			name: this.state.item
		}

		this.props.addItem(data)

		this.toggle()
	}

	render(){
		const { openModal } = this.props
		return(
			<div>
				<Modal isOpen={openModal} toggle={this.toggle}>
		          <ModalHeader toggle={this.toggle}>Input Shopping Item</ModalHeader>
		          <ModalBody>
		          	<Form>
				        <FormGroup>
				          <Label for="itemName">Name</Label>
				          <Input type="text" name="item" id="itemName" placeholder="Item's Name" onChange={this.onInputChange}/>
				        </FormGroup>
				    </Form>
		          </ModalBody>
		          <ModalFooter>
		            <Button color="primary" onClick={this.onSubmit}>Save</Button>{' '}
		            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
		          </ModalFooter>
		        </Modal>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { ...state.item }
}

export default connect(mapStateToProps, { addItem })(AddModal)