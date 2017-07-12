import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import propTypes from 'prop-types';
import { documentDetails } from '../actions/documentDetails';

/**
 * @class Documents
 * @extends {React.Component}
 */
class DocumentDetails extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			title: '',
			access: '',
			content: ''
		};
	}
	/**
	 * @description Lifcycle Method
	 * @return {void}
	 */
	componentWillMount() {
		this.props.documentDetails(this.state.id).then(() => {
			this.setState({
				title: this.props.document.title,
				content: this.props.document.content
			});
		});
	}
	/**
	 * @description Render content to the screen
	 * @return {void}
	 */
	render() {
		return (
			<div className="doc-wrapper">
				<div className="document-panel">
					<div className="f-center">
						<h5 className="document-panel-header"><span>Document Details</span></h5><br /><br />
						<div className="editor-access">Access: {this.props.document.access}</div>
						<div className="editor-container">
							<div className="editor-content">
								<p className="editor-title">{this.props.document.title}</p>
								{this.props.document.content}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
DocumentDetails.propTypes = {
	document: propTypes.object.isRequired,
	documentDetails: propTypes.func.isRequired,
};
/**
 * @description Maps State to Props
 * @param  {object} state
 * @return {void}
 */
function mapStateToProps(state) {
	return {
		document: state.userDocuments.document,
	};
}
export default withRouter(connect(mapStateToProps, { documentDetails })(DocumentDetails));

