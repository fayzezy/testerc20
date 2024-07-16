"use client";
import React, { useState } from "react";
import Footer from "@/../components/Footer/Footer";
import styles from "@/app/styles/Home.module.css";
import { client } from "@/app/client";
import { Navbar } from "@/../components/Navbar/Navbar";
import { claimTo as claimERC20, balanceOf as balanceERC20 } from "thirdweb/extensions/erc20";
import Image from "next/image";
import Link from "next/link";

import {
	TransactionButton,
	useActiveAccount,
	useReadContract,
} from "thirdweb/react";
import { defineChain, getContract, toEther } from "thirdweb";

const GaslessHome: React.FC = () => {
	const account = useActiveAccount();

	return (
		<><div className={styles.container2}>
			<Image  style={{ marginLeft: "50px", margin: "20px", borderRadius: "20px" }} width={70}
			height={70}
			src={"/pic/Smallscreens.png"} alt={""}  />
			<p>
				Small screens will soon be available<br />open your desktop browser in order to use it<br /> min-width: 1000px</p>

		</div><><><Navbar />
			<div className={styles.container}>
				<div className={styles.ieopage}>
					<div className={styles.ieodata}>
						<Link href="#" className={`${styles.homeLink} ${styles.navLeft}`}>
							<Image
								src="/erc20-icons/sp.png"
								width={70}
								height={70}
								alt="" />
						</Link><br />
						<p className={styles.faucettitle}>SNFTPRO</p>
						<br />
						<p className={styles.deopdescription}>SP is the SNFT official ERC20 Token </p>
						<p className={styles.deopdescription}>TOTAL SUPPLY: 1.000.000 SP<br /> Tokens available for sale:  600.000 SP <br /> Token Price: 0.5 MATIC</p>
						<br />
						<div className={styles.ieopsocial}>
							<Link href="https://docs.snft.pro/snftpro-token" className={`${styles.homeLink} ${styles.navLeft}`} target="_blank" rel="noreferrer">
								TOKENOMICS
							</Link>
							<br />
							<Link color="white" href="https://polygonscan.com/token/0xD2e586Df315238E01c152eb60f87c8EbCB2D8b70" className={`${styles.homeLink} ${styles.navLeft}`} target="_blank" rel="noreferrer">
								Explorer
							</Link>
							<br />
						</div>
						<br />

						<div className={styles.ieopsocial}>
							<Link color="white" href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
								<Image
									src="/icons/we.png"
									width={40}
									height={40}
									alt="" />
							</Link>

							<Link href="https://www.linkedin.com/company/snft/" className={`${styles.homeLink} ${styles.navLeft}`} target="_blank" rel="noreferrer">
								<Image
									src="/icons/in.png"
									width={40}
									height={40}
									alt="" />
							</Link>

							<Link href="https://x.com/snftpro" className={`${styles.homeLink} ${styles.navLeft}`} target="_blank" rel="noreferrer">
								<Image
									src="/icons/tw.png"
									width={40}
									height={40}
									alt="" />
							</Link>
							<Link href="https://t.me/snftpro" className={`${styles.homeLink} ${styles.navLeft}`} target="_blank" rel="noreferrer">
								<Image
									src="/icons/tel.png"
									width={40}
									height={40}
									alt="" />
							</Link>
							<Link href="https://www.youtube.com/@snftpro" className={`${styles.homeLink} ${styles.navLeft}`} target="_blank" rel="noreferrer">
								<Image
									src="/icons/y.png"
									width={40}
									height={40}
									alt="" />
							</Link>

						</div>



					</div>
				</div>
				<div className={styles.ieodata}>


					<ClaimButton WalletAddress={account?.address || ""} />
					<WalletBalances WalletAddress={account?.address || ""} />
					<br />
				</div>

			</div>

		</><Footer /></></>
		
	);
};

type WalletAddressProps = {
	WalletAddress?: string;
};


const ClaimButton: React.FC<WalletAddressProps> = ({WalletAddress}) => {
const [quantity, setQuantity] = useState(1);
const claimToWithQuantity = async (quantity: BigInt) => {
	const total = claimTo({
		contract: ERC20,
		to: WalletAddress || "",
		quantity: quantity.toString(), 
	});
	return total;
};

const handleClaim = async () => {
	const total = await claimToWithQuantity(BigInt(quantity.toString()));
	// rest of the code
};

const ERC20 = getContract({
	client: client,
	chain:  defineChain(137),
	address: "0xD2e586Df315238E01c152eb60f87c8EbCB2D8b70",
});
	return (
		<div >
		
		<div className={styles.ieocard}>

<p className={styles.ieodescription}>Quantity</p>
<input
	value={quantity}
	onChange={(e) => setQuantity(Number(e.target.value))}
	className={styles.ieoinput} />


</div>
<div className={styles.ieocard}>
	
<TransactionButton
    style={{width: "30%", height: "50px", backgroundColor:"#18191e", border: "1px solid #9693972a", color: "#ffffff"}}
    transaction={() =>
        claimERC20({
            contract: ERC20,
            to: WalletAddress || "",
            quantity: quantity.toString(), 
        })
    }
    onError={(error) => {
        alert(`Error: ${error.message}`);
    }} 
    onTransactionConfirmed={async () => {
        alert("Buy successful!");
    }}
>
    Buy SP (0.5 MATIC)
</TransactionButton>
</div>
		</div>
	)
};

	

const WalletBalances: React.FC<WalletAddressProps> = ({WalletAddress}) => {

	 const {data: ERC20Balances} = useReadContract(
		balanceERC20,
		{
			contract: getContract({
			client: client,
			chain:  defineChain(137),
			address: "0xD2e586Df315238E01c152eb60f87c8EbCB2D8b70",
		}),
		address: WalletAddress || ""
		}
		 );

	return (
		<div className={styles.ieocard}>
		<p className={styles.deopdescription}>Token Balances: {WalletAddress ? toEther(ERC20Balances || 0n) : "0"} </p>  
		<br/>
	</div>
	
	
												
	)
};
export default GaslessHome;
function claimTo(arg0: unknown) {
	throw new Error("Function not implemented.");
}
