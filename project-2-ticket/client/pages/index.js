import buildClient from "../api/build-client";


const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed IN</h1>
};

//the below blow is generally executed on server side
//but in some scenario like
//navigating from page to page in the browser it may execute on client sider
//to check this we have added a check in if and else below
//as we know that window is a client side object
//the if else logic is moved to ../api/build-client
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser')
  return data;
}

export default LandingPage