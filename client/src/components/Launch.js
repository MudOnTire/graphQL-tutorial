import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Moment from 'react-moment';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number,
      mission_name,
      launch_date_local,
      launch_success,
      rocket{
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <Fragment>
        <Query
          query={LAUNCH_QUERY}
          variables={{ flight_number }}>
          {
            ({ loading, error, data }) => {
              if (loading) return <h4>Loading...</h4>
              if (error) console.log(error);
              console.log(data);
              const { launch: { flight_number, mission_name, launch_date_local, launch_success, rocket: { rocket_id, rocket_name, rocket_type } } } = data;
              return (
                <div>
                  <h1 className='display-4 my-3'>
                    <span className='text-dark'>
                      Mission:
                    </span>
                    {` ${mission_name}`}
                  </h1>
                  <h4 className='mb-3'>Launch Details</h4>
                  <ul className='list-group'>
                    <li className='list-group-item'>
                      Flight Number: {flight_number}
                    </li>
                    <li className='list-group-item'>
                      Launch Date: <Moment format='YYYY-MM-DD HH:mm'>{launch_date_local}</Moment>
                    </li>
                    <li className='list-group-item'>
                      Launch Successful:
                      <span className={classNames({
                        'text-success': launch_success,
                        'text-danger': !launch_success
                      })}>
                        {launch_success ? ' YES' : ' NO'}
                      </span>
                    </li>
                    <li className='list-group-item'>
                      Rocket: {flight_number}
                    </li>
                  </ul>
                  <h4 className='my-3'>Rocket Details</h4>
                  <ul className='list-group'>
                    <li className='list-group-item'>
                      Rocket Id: ${rocket_id}
                    </li>
                    <li className='list-group-item'>
                      Rocket Name: ${rocket_name}
                    </li>
                    <li className='list-group-item'>
                      Rocket Type: ${rocket_type}
                    </li>
                  </ul>
                  <hr />
                  <Link className='btn btn-secondary' to='/'>
                    Go Back
                  </Link>
                </div>
              )
            }
          }
        </Query>
      </Fragment>
    )
  }
}

export default Launch
