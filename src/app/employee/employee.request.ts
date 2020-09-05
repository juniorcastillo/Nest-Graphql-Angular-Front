import gql from 'graphql-tag';

export const GET_EMPLOYEE = gql`
query {
  employees {
    id
    name
    lastname
    occupation
    age
    address
  }
}
`;

