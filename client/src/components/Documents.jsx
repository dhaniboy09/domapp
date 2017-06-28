import React from 'react';
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
		this.state = {
			doc: ''
		};
		this.openModal = this.openModal.bind(this);
	}
	/**
	 * @description Modal to Add a Document
	 * @return {void}
	 */
	openModal() {
		$('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        alert("Ready");
        console.log(modal, trigger);
      },
      complete: function() { alert('Closed'); } // Callback for Modal close
    }
  );
	}
	/**
	 * @description Render content to the screen
	 * @return {void}
	 */
	render() {
		return (
			<div>
				<div className="create-doc">
					<a className="create-doc-link" href="#!">New</a>
					<div id="modal1" className="modal">
						<div className="modal-content">
							<h4>Modal Header</h4>
							<p>A bunch of text</p>
						</div>
						<div className="modal-footer">
							<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
						</div>
					</div>
				</div>
				<div className="document-panel">
					<div className="f-center">
						<h5 className="document-panel-header break"><span>All Documents</span></h5>
					</div>
				</div>
			</div>
		);
	}
}
export default Documents;

