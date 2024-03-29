import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const products = [
  {
    id: uuid(),
    name: 'HomeFirst',
    imageUrl: '/static/images/products/shelter3.png',
    rating:'5 stars',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Family Supportive Housing',
    imageUrl: '/static/images/products/shelter1.png',
    rating:'4.8 stars',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'CityTeam - Mens Shelter',
    imageUrl: '/static/images/products/shelter2.png',
    rating:'4.7 stars',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Montgomery Street Inn',
    imageUrl: '/static/images/products/shelter4.jpg',
    rating:'4 stars',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: ' Sobrato House Youth Center',
    imageUrl: '/static/images/products/shelter5.jpg',
    rating:'3.5 stars',
    updatedAt: moment().subtract(9, 'hours')
  }
];

const LatestProducts = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${products.length} in total`}
      title="Best Overall Shelter"
    />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem
          divider={i < products.length - 1}
          key={product.id}
        >
          <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={`Updated ${product.updatedAt.fromNow()}`}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);

export default LatestProducts;
