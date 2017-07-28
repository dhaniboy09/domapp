import React from 'react';
/**
 * @description Markup for the Footer
 * @return {void} 
 */
const Footer = () => ({
	render() {
		return (
			<div>
				<footer className="page-footer">
					<div className="footer-copyright">
						<div className="container">
            © 2017 Copyright Domapp
							<a
								className="right all-rights"
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
