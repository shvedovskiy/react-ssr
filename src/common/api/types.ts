import { RouteComponentProps } from 'react-router';
import { RouteConfig as RRConfig } from 'react-router-config';
import { ParsedQs } from 'qs';

interface MatchParams {
  name: string;
}
type MatchProps = RouteComponentProps<MatchParams>;

export interface FetchingRoute {
  pathname: string;
  query: ParsedQs;
  params?: MatchProps;
}

export interface RouteConfig extends RRConfig {
  fetch?: (currentRoute: FetchingRoute, prevRoute: FetchingRoute | null) => any;
}
