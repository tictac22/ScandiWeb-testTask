import React from "react"
import styled from "styled-components"

export class Spinner extends React.Component {
	render() {
		return <Loader />
	}
}

const Loader = styled.div`
	display: block;
	text-align: center;
	margin: 0 auto;
	margin-top: 65px;
	width: 80px;
	height: 80px;
	&:after {
		content: " ";
		display: block;
		width: 64px;
		height: 64px;
		margin: 8px;
		border-radius: 50%;
		border: 6px solid #5ece7b;
		border-color: #5ece7b transparent #5ece7b transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`
