import * as React from 'react';
import {
  useState, useContext, FC, createContext, useEffect,
} from 'react';
import { useBackdropUpdateContext } from './BackDropContext';

const ErrorContext = createContext(null);
const ErrorUpdateContext = createContext(null);

const useErrorContext = () => useContext(ErrorContext);

const useErrorUpdateContext = () => useContext(ErrorUpdateContext);

type Props = {
  children: any
};

const ErrorProvider: FC<Props> = ({ children }: Props) => {
  const [error, changeError] = useState([]);

  const backdropUpdate = useBackdropUpdateContext();

  useEffect(() => {
    backdropUpdate.handleClose();
  }, [error]);

  const handleFailFast = (input: {
    message: string,
    topic: string,
    retries: number
  }) => {
    const { message, topic, retries } = input;
    if (!topic || !message) return;

    fetch('/strategy/failfast', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({ topic, message, retries }),
    })
      .then((data) => data.json())
      .then((errors) => {
        changeError(errors);
      });
  };

  const handleDLQ = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };
  const handleIgnore = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  return (
    <ErrorContext.Provider value={error}>
      <ErrorUpdateContext.Provider
        value={
          {
            handleFailFast,
            handleDLQ,
            handleIgnore,
          }
      }
      >
        {children}
      </ErrorUpdateContext.Provider>
    </ErrorContext.Provider>
  );
};

export { ErrorProvider, useErrorContext, useErrorUpdateContext };
