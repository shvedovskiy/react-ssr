import { RouteComponentProps } from 'react-router';
import { RouteConfig as RRConfig } from 'react-router-config';
import qs from 'query-string';

interface MatchParams {
  name: string;
}
type MatchProps = RouteComponentProps<MatchParams>;

export interface FetchingRoute {
  pathname: string;
  query: qs.ParsedQuery<string>;
  params?: MatchProps;
}

export interface RouteConfig extends RRConfig {
  fetch?: (currentRoute: FetchingRoute, prevRoute: FetchingRoute | null) => any;
}
