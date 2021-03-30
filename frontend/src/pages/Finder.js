import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
// import CustomerListResults from 'src/components/customer/CustomerListResults';
// import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
// import customers from 'src/__mocks__/customers';

import Map from 'src/components/finder/MapRender';
import GoogleMaps from 'src/components/finder/SearchBar';
// import MapContainer from 'src/components/finder/MapContainer';



const CustomerList = () => (
  <>
  
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
      <div>        
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBoHTyDmdCcffbqWPijvmRZSpuWKq8j-cE&libraries=places" onLoad={this.handleScriptLoad}/>  
        {/* <GoogleMaps></GoogleMaps> */}
        <Box sx={{ pt: 3 }}><Map /></Box>
        
        {/* <CustomerListToolbar /> */}
        {/* <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box> */}
        </div>
      </Container>
    </Box>
  </>
);

export default CustomerList;
