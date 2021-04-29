import { Helmet } from 'react-helmet';
import { Box, Container,Grid } from '@material-ui/core';
import MyGoogleMap from 'src/components/finder/MyGoogleMap';
import 'src/App.css';
import LatestProducts from 'src/components/dashboard//LatestProducts';
// import Map from 'src/components/finder/MapRender';




const CustomerList = () => (
  <>
  
    <Helmet>
      <title>Finder</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
      <div className="main-wrapper"> 
          <LatestProducts sx={{ height: '100%'}} />
           <MyGoogleMap />
      </div>

      </Container>
    </Box>
  </>
);

export default CustomerList;
