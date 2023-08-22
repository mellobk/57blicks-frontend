import  { storyBooksIconsNames } from './icon-dictionary';
import IconTemplate from './icons';

const IconList: any = () => {
  return (
    <div style={{ display: 'flex', gap: '5px', textAlign: 'center' }}>
      {storyBooksIconsNames?.map((value, key) => {
        return (
          <div key={key} style={{ display: 'flex', gap: '5px', flexDirection: 'column', alignItems: 'center' }}>
            <IconTemplate name={value} />
            <div>{value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default IconList;
