import IconItems from './icon-dictionary';

type Props = {
  name: string;
  width?: string;
  color?: string;
};

const IconTemplate: React.FC<Props> = ({ name, width, color }: Props) => {
  return <IconItems name={name} width={width} color={color} />;
};

export default IconTemplate;
