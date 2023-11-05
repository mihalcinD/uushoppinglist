import { Skeleton, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';
import { MouseEvent, useState } from 'react';

type Props = {
  actions: { value: string; label: string; onSelect: () => void }[];
  isLoading: boolean;
  fullWidth?: boolean;
};
const SegmentedButtons = ({ actions, isLoading, fullWidth }: Props) => {
  const [selected, setSelected] = useState<string>(actions[0].value);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
          fullWidth={fullWidth && isSmallScreen}
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
