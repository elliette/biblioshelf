import React from 'react';

export default function DeleteAccount() {
    return (
        <div className="jumbotron">
			<h1>Manage Account</h1>
			<h2>You can delete your account here.</h2>
			<button type="button" className="btn btn-link" onClick={() => console.log('clicked!')}><h3>[Delete Account]</h3></button>
		</div>
    );
}
