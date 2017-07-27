import React from 'react';
import UpdateProfileForm from './UpdateProfileForm';
import UpdatePasswordForm from './UpdatePasswordForm';

/**
 * @class Documents
 * @extends {React.Component}
 */
const Settings = () => ({
	/**
	 * @description Render content to the screen
	 * @return {void}
	 */
	render() {
		return (
			<div className="settings-panel f-center">
				<h5 className="settings-panel-header f-center"><span>Settings</span></h5>
				<div className="row">
					<div className="col m6">
						<div className="col s4 l12 darken-1">
							<div className="card settings-card">
								<div className="card-content">
									<span className="settings-title">Profile Details</span>
									<UpdateProfileForm />
								</div>
							</div>
						</div>
					</div>
					<div className="col m6">
						<div className="col s4 l12 darken-1">
							<div className="card settings-card">
								<div className="card-content">
									<span className="settings-title">Change Password</span>
									<UpdatePasswordForm />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
export default Settings;

