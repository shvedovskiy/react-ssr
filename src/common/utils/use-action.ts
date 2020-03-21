import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

export function useActions(actions) {
  const dispatch = useDispatch();

  const boundActions = useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, []);

  return boundActions;
}
