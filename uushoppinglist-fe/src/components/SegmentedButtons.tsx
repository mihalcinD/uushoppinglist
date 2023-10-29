import { Skeleton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MouseEvent, useState } from 'react';

type Props = {
  actions: { value: string; label: string; onSelect: () => void }[];
  isLoading: boolean;
};
const SegmentedButtons = ({ actions, isLoading }: Props) => {
  const [selected, setSelected] = useState<string>(actions[0].value);
  const handleChange = (event: MouseEvent<HTMLElement>, newValue: string) => {
    event.preventDefault();
    setSelected(newValue);
    actions.find(action => action.value === newValue)?.onSelect();
  };

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" width={100} height={60} />
      ) : (
        <ToggleButtonGroup
          color="primary"
          value={selected}
          exclusive
          onChange={handleChange}
          aria-label="Segmented-buttons">
          {actions.map(action => (
            <ToggleButton key={action.value} value={action.value}>
              {action.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </>
  );
};

export default SegmentedButtons;
