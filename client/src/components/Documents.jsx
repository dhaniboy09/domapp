import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { allDocuments } from '../actions/allDocuments';
import DocumentForm from './DocumentForm';
import DocumentCard from './DocumentCard';
/**
 * @class Documents
 * @extends {React.Component}
 */
class Documents extends React.Component {
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
		this.props.allDocuments();
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
						<h5 className="document-panel-header break"><span>All Documents</span></h5>
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
Documents.propTypes = {
	document: propTypes.object.isRequired,
	documents: propTypes.object.isRequired,
	allDocuments: propTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		// document: state.userDocuments.document,
		documents: state.userDocuments.documents
	};
}
export default withRouter(connect(mapStateToProps, { allDocuments })(Documents));

