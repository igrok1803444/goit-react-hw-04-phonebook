import { Label, Input } from './Filter.styled';
export const Filter = ({ handleFunction, filterValue }) => {
  return (
    <Label>
      {' '}
      Find contact:{' '}
      <Input type="text" value={filterValue} onChange={handleFunction} />
    </Label>
  );
};
