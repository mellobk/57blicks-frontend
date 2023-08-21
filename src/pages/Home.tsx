import type {FunctionComponent} from "../common/types";
import {Button} from 'primereact/button';

const Home = (): FunctionComponent => {
  return (
    <div className="card flex justify-content-center">
      <Button label="Check" icon="pi pi-check"/>
    </div>
  );
};

export default Home;
