type Props = {
	color?: string;
	fill?: string;
	width?: number;
	height?: number;
};

const CloseEyeIcon: React.FC<Props> = ({
	color = "#BBBBBB",
	width = 48,
}: Props) => {
	return (
		<svg
			width={width}
			height={width}
			viewBox="0 0 16 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1.07071 0.0538911C1.40913 -0.0911459 1.80105 0.0656218 1.94609 0.404042L1.33332 0.666655C1.94609 0.404042 1.94618 0.404259 1.94609 0.404042L1.94574 0.403241C1.94555 0.402809 1.94569 0.403124 1.94574 0.403241L1.94835 0.409152C1.95102 0.415161 1.95562 0.425373 1.96215 0.439509C1.97521 0.467789 1.996 0.511708 2.02466 0.569033C2.08203 0.683782 2.17064 0.851624 2.2916 1.05483C2.53427 1.46251 2.90295 2.00548 3.40519 2.54635C3.52357 2.67384 3.64885 2.80072 3.78117 2.92535C3.7867 2.93038 3.79217 2.93552 3.79758 2.94076C4.78736 3.86759 6.1682 4.66665 7.99999 4.66665C8.80597 4.66665 9.51891 4.51278 10.1473 4.26545C10.9646 3.94373 11.6497 3.4594 12.2104 2.93313C12.8435 2.33891 13.3085 1.70001 13.6155 1.20732C13.7684 0.961929 13.8805 0.755439 13.9533 0.612713C13.9896 0.541425 14.0161 0.486272 14.0328 0.450393C14.0411 0.432461 14.0471 0.419366 14.0506 0.411504L14.0539 0.404042C14.199 0.0658062 14.5909 -0.0911078 14.9293 0.0538911C15.2677 0.198928 15.4245 0.590847 15.2794 0.929267L14.6667 0.666655C15.2794 0.929267 15.2795 0.929114 15.2794 0.929267L15.278 0.932614L15.2756 0.938097L15.268 0.955326C15.2616 0.969544 15.2527 0.98917 15.2412 1.0138C15.2183 1.06303 15.185 1.13235 15.141 1.21848C15.0533 1.39058 14.9227 1.63071 14.7471 1.91244C14.4787 2.34321 14.1014 2.87745 13.6064 3.41618L14.1381 3.94781C14.3984 4.20816 14.3984 4.63027 14.1381 4.89062C13.8777 5.15097 13.4556 5.15097 13.1953 4.89062L12.6351 4.3305C12.259 4.63433 11.838 4.9209 11.3705 5.16812L11.8921 5.96973C12.0929 6.27834 12.0055 6.69131 11.6969 6.89211C11.3883 7.09292 10.9753 7.00552 10.7745 6.69691L10.1176 5.68723C9.66491 5.82599 9.18133 5.92434 8.66666 5.97043V6.99999C8.66666 7.36818 8.36818 7.66665 7.99999 7.66665C7.6318 7.66665 7.33332 7.36818 7.33332 6.99999V5.97053C6.8169 5.92439 6.33345 5.82586 5.88225 5.6875L5.22545 6.69691C5.02464 7.00552 4.61168 7.09292 4.30307 6.89211C3.99445 6.69131 3.90706 6.27834 4.10787 5.96973L4.62947 5.1681C4.16272 4.92108 3.74166 4.63451 3.36499 4.33035L2.80473 4.89062C2.54438 5.15097 2.12227 5.15097 1.86192 4.89062C1.60157 4.63027 1.60157 4.20816 1.86192 3.94781L2.39355 3.41618C1.83022 2.80301 1.4185 2.19481 1.14588 1.73681C1.00642 1.50252 0.90232 1.30578 0.83209 1.16532C0.79695 1.09504 0.770214 1.0387 0.751701 0.998618C0.742443 0.978574 0.735234 0.962582 0.730053 0.950931L0.723796 0.936741L0.721802 0.932151L0.721087 0.930494L0.7208 0.929827C0.720676 0.929538 0.72056 0.929267 1.33332 0.666655L0.7208 0.929827C0.575763 0.591407 0.73229 0.198928 1.07071 0.0538911Z"
				fill={color}
			/>
			<svg
				width="16"
				height="8"
				viewBox="0 0 16 8"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M1.07071 0.0538911C1.40913 -0.0911459 1.80105 0.0656218 1.94609 0.404042L1.33332 0.666655C1.94609 0.404042 1.94618 0.404259 1.94609 0.404042L1.94574 0.403241C1.94555 0.402809 1.94569 0.403124 1.94574 0.403241L1.94835 0.409152C1.95102 0.415161 1.95562 0.425373 1.96215 0.439509C1.97521 0.467789 1.996 0.511708 2.02466 0.569033C2.08203 0.683782 2.17064 0.851624 2.2916 1.05483C2.53427 1.46251 2.90295 2.00548 3.40519 2.54635C3.52357 2.67384 3.64885 2.80072 3.78117 2.92535C3.7867 2.93038 3.79217 2.93552 3.79758 2.94076C4.78736 3.86759 6.1682 4.66665 7.99999 4.66665C8.80597 4.66665 9.51891 4.51278 10.1473 4.26545C10.9646 3.94373 11.6497 3.4594 12.2104 2.93313C12.8435 2.33891 13.3085 1.70001 13.6155 1.20732C13.7684 0.961929 13.8805 0.755439 13.9533 0.612713C13.9896 0.541425 14.0161 0.486272 14.0328 0.450393C14.0411 0.432461 14.0471 0.419366 14.0506 0.411504L14.0539 0.404042C14.199 0.0658062 14.5909 -0.0911078 14.9293 0.0538911C15.2677 0.198928 15.4245 0.590847 15.2794 0.929267L14.6667 0.666655C15.2794 0.929267 15.2795 0.929114 15.2794 0.929267L15.278 0.932614L15.2756 0.938097L15.268 0.955326C15.2616 0.969544 15.2527 0.98917 15.2412 1.0138C15.2183 1.06303 15.185 1.13235 15.141 1.21848C15.0533 1.39058 14.9227 1.63071 14.7471 1.91244C14.4787 2.34321 14.1014 2.87745 13.6064 3.41618L14.1381 3.94781C14.3984 4.20816 14.3984 4.63027 14.1381 4.89062C13.8777 5.15097 13.4556 5.15097 13.1953 4.89062L12.6351 4.3305C12.259 4.63433 11.838 4.9209 11.3705 5.16812L11.8921 5.96973C12.0929 6.27834 12.0055 6.69131 11.6969 6.89211C11.3883 7.09292 10.9753 7.00552 10.7745 6.69691L10.1176 5.68723C9.66491 5.82599 9.18133 5.92434 8.66666 5.97043V6.99999C8.66666 7.36818 8.36818 7.66665 7.99999 7.66665C7.6318 7.66665 7.33332 7.36818 7.33332 6.99999V5.97053C6.8169 5.92439 6.33345 5.82586 5.88225 5.6875L5.22545 6.69691C5.02464 7.00552 4.61168 7.09292 4.30307 6.89211C3.99445 6.69131 3.90706 6.27834 4.10787 5.96973L4.62947 5.1681C4.16272 4.92108 3.74166 4.63451 3.36499 4.33035L2.80473 4.89062C2.54438 5.15097 2.12227 5.15097 1.86192 4.89062C1.60157 4.63027 1.60157 4.20816 1.86192 3.94781L2.39355 3.41618C1.83022 2.80301 1.4185 2.19481 1.14588 1.73681C1.00642 1.50252 0.90232 1.30578 0.83209 1.16532C0.79695 1.09504 0.770214 1.0387 0.751701 0.998618C0.742443 0.978574 0.735234 0.962582 0.730053 0.950931L0.723796 0.936741L0.721802 0.932151L0.721087 0.930494L0.7208 0.929827C0.720676 0.929538 0.72056 0.929267 1.33332 0.666655L0.7208 0.929827C0.575763 0.591407 0.73229 0.198928 1.07071 0.0538911Z"
					fill={color}
				/>
			</svg>
		</svg>
	);
};

export default CloseEyeIcon;
