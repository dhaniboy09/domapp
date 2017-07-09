import React from 'react';

const Footer = () => ({
	render() {
		return (
			<div>
				<footer className="page-footer">
					<div className="container">
						<div className="row">
							<div className="col l6 s12">
								<h5 className="white-text">Domapp</h5>
								<p className="grey-text text-lighten-4 footer-text">
									Premium Document Management System
									Domapp provides the most efficient Document Management
									Algorithms on the market. Manage your documents both
									locally and on the Cloud.
								</p>
							</div>
							<div className="col l4 offset-l2 s12">
								<h5 className="white-text">Quick Links</h5>
								<ul className="footer-text">
									<li>
										<a className="grey-text text-lighten-3" href="/mydocuments">My Documents</a>
									</li>
									<li>
										<a className="grey-text text-lighten-3" href="/settings">Settings</a>
									</li>
									<li>
										<a className="grey-text text-lighten-3" href="/documents">All Documents</a>
									</li>
									<li>
										<a className="grey-text text-lighten-3" href="/logout">Log Out</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="footer-copyright">
						<div className="container">
            © 2017 Copyright Domapp
							<a
								className="grey-text text-lighten-4 right all-rights"
								href="#!"
							>
								All Rights Reserved
							</a>
						</div>
					</div>
				</footer>
			</div>
		);
	}
});
export default Footer;
