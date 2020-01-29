import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Switch, withRouter } from 'react-router-dom';

// class ReactRouterSwitchInternal extends Component {
//   constructor(...args) {
//     super(...args);
//     this.state = {};
//   }

//   UNSAFE_componentWillReceiveProps() {
//     if (this.state.loading || IS_SERVER) {
//       return;
//     }
//     this.setState({ loading: true });
//     this.fetchData()
//       .catch(err => console.error(err))
//       .then(() => {
//         this.setState({ loading: false });
//       });
//   }

//   async fetchData() {
//     const result = await fetch(
//       `${process.env.API_PATH || '/api/data'}?url=${encodeURIComponent(
//         window.location.pathname,
//       )}`,
//     );
//     const data = await result.json();

//     this.props.dispatch({
//       type: 'UPDATE_STORE',
//       payload: data,
//     });
//   }

//   render() {
//     if (IS_SERVER) {
//       return <Switch>{this.props.children}</Switch>;
//     }
//     if (this.state.loading) {
//       return (
//         <section className="section">
//           <h1 className="section__title">Loading...</h1>
//         </section>
//       );
//     }
//     return <Switch>{this.props.children}</Switch>;
//   }
// }

// export const ReactRouterSwitch = withRouter(connect()(ReactRouterSwitchInternal));
