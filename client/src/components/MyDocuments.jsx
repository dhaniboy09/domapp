import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { myDocuments } from '../actions/myDocuments';
import DocumentForm from './DocumentForm';
import DocumentCard from './DocumentCard';
/**
 * @class Documents
 * @extends {React.Component}
 */
class MyDocuments extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		// this.state = {
		// 	document: this.props.documents
		// };
		this.openModal = this.openModal.bind(this);
	}
	/**
	 * @description Lifcycle Method
	 * @return {void}
	 */
	componentDidMount() {
		this.props.myDocuments(this.props.auth.user.user.id);
	}
	// componentWillReceiveProps(nextProps) {
	// 	this.setState({ document: nextProps.documents })
	// }
	/**
	 * @description Modal to Add a Document
	 * @return {void}
	 * @param  {object} e
	 */
	openModal() {
		$('.modal').modal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: 0.5, // Opacity of modal background
		});
		$('#myModal').modal();
	}
	/**
	 * @description Render content to the screen
	 * @return {void}
	 */
	render() {
		return (
			<div className="doc-wrapper">
				<div className="create-doc">
					<a className="create-doc-link" onClick={this.openModal} href="#myModal">New</a>
					<div id="myModal" className="modal">
						<div className="modal-content">
							<DocumentForm />
						</div>
					</div>
				</div>
				<div className="document-panel">
					<div className="f-center">
						<h5 className="document-panel-header break"><span>My Documents</span></h5>
						<div className="col s12">
							<div className="row">
								{ this.props.documents.map((document) => (
									<DocumentCard
										document={document}
										key={document.id}
									/>
								)) }
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
MyDocuments.propTypes = {
	document: propTypes.object.isRequired,
	documents: propTypes.object.isRequired,
	myDocuments: propTypes.func.isRequired,
	auth: propTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		// document: state.userDocuments.document,
		auth: state.auth,
		documents: state.userDocuments.documents
	};
}
export default withRouter(connect(mapStateToProps, { myDocuments })(MyDocuments));

