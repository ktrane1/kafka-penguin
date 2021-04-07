import * as React from 'react';
import {
  useState, useContext, FC, createContext,
} from 'react';

const BackdropContext = createContext(null);
const BackdropUpdateContext = createContext(null);

const useBackdropContext = () => useContext(BackdropContext);

const useBackdropUpdateContext = () => useContext(BackdropUpdateContext);

type Props = {
  children: any
};

const BackdropProvider: FC<Props> = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <BackdropContext.Provider value={open}>
      <BackdropUpdateContext.Provider
        value={
          {
            handleClose,
            handleToggle,
          }
        }
      >
        {children}
      </BackdropUpdateContext.Provider>
    </BackdropContext.Provider>
  );
};

export { BackdropProvider, useBackdropContext, useBackdropUpdateContext };
