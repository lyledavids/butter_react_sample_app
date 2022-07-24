import { useState, useEffect } from 'react';

import { ethers } from 'ethers';
import logo from './logo.svg';
//const butter = require("@0xlyle/butter");
import { spread } from '@0xlyle/butter'
function App() {
	const [haveMetamask, sethaveMetamask] = useState(true);

	const [accountAddress, setAccountAddress] = useState('');
	const [accountAccess, setAccountAccess] = useState(false);

	const [isConnected, setIsConnected] = useState(false);

	const { ethereum } = window;
  const chainID = "1";
  //const tokenContractAddress = "0x5804a187acaf8fa9f563910cda689fcd7fbd20ab" //Quackle 80001
  const tokenContractAddress = "0x90b3832e2f2ade2fe382a911805b6933c056d6ed" //Pooly Supporter 1
  //const tokenContractAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" //BAYC 1
  const covalentKey = ""

	const provider = new ethers.providers.Web3Provider(window.ethereum);

	useEffect(() => {
		const { ethereum } = window;
		const checkMetamaskAvailability = async () => {
			if (!ethereum) {
				sethaveMetamask(false);
			}
			sethaveMetamask(true);
		};
		checkMetamaskAvailability();
	}, []);

	const connectWallet = async () => {
		try {
			if (!ethereum) {
				sethaveMetamask(false);
			}

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			setAccountAddress(accounts[0]);

			setIsConnected(true);

		} catch (error) {
			setIsConnected(false);
		}
	};

  const checkAccess = async () => {
		try {
      const result = await spread(chainID,accountAddress,covalentKey,tokenContractAddress)

      setAccountAccess(result);
		} catch (error) {
      console.log(error)
			setAccountAccess(false);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				{haveMetamask ? (
					<div className="App-header">
						{isConnected ? (
							<div className="card">
								<div className="card-row">
									<h3>Wallet Address:</h3>
									<p>
										{accountAddress.slice(0, 4)}...
										{accountAddress.slice(38, 42)}
									</p>
								</div>
								<div className="card-row">
									<h3>This account has access?:</h3>
									<p>{String(accountAccess)}</p>
								</div>
                {accountAccess ? (
							<p className="info">🎉 This account has access</p>
						) : (
							<button className="btn" onClick={checkAccess}>
								Check Access
							</button>
						)}
            <br />
            <br />
            {accountAccess ? (
							<p className="info">Enter the Pooly-Supporter chatroom</p>
						) : (
              <p className="info">Buy a Pooly-Supporter NFT to enter the chatroom</p>
						)}
							</div>
						) : (
							<img src={logo} className="App-logo" alt="logo" />
						)}

						{isConnected ? (
							<p className="info">🎉 Connected Successfully</p>
						) : (
							<button className="btn" onClick={connectWallet}>
								Connect
							</button>
						)}
					</div>
				) : (
					<p>Please Install MataMask</p>
				)}
			</header>
		</div>
	);
}

export default App;