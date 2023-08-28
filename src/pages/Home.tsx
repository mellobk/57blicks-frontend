import { Button } from "primereact/button";
import type { FunctionComponent } from "@/types";

const Home = (): FunctionComponent => {
	return (
		<div className="card flex justify-content-center">
			<Button label="Check" icon="pi pi-check" />
		</div>
	);
};

export default Home;
