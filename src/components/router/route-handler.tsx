import React, { ComponentType, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Location } from 'history';
import qs from 'query-string';

import { loadData } from '../../api/load-data';

async function fetchOnLocationChange(
  dispatch: Dispatch,
  location: Location,
  prevLocation: Location,
) {
  const currentRoute = {
    pathname: location.pathname,
    query: qs.parse(location.search),
  };
  const prevRoute = {
    pathname: prevLocation.pathname,
    query: qs.parse(prevLocation.search),
  };
  await loadData(dispatch, currentRoute, prevRoute);
}

export const withRouteHandling = <BaseProps extends {}>(
  BaseComponent: ComponentType<BaseProps>,
) =>
  function RouteHandlerHOC(props: BaseProps) {
    const dispatch = useDispatch();
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState(location);

    useEffect(() => {
      if (prevLocation.key !== location.key) {
        fetchOnLocationChange(dispatch, location, prevLocation);
        setPrevLocation(location);
      }
    }, [location, dispatch, prevLocation]);

    return <BaseComponent {...props} />;
  };
