/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const spacingSelect = {
  '0': 0,
  '8': 8,
  '16': 16,
  '24': 24,
  '32': 32,
  '40': 40,
};

const TBPositionSelect = {
  top: 'top',
  bottom: 'bottom',
};

const LRPositionSelect = {
  left: 'left',
  right: 'right',
};

const directionSelect = {
  row: 'row',
  'row-reverse': 'row-reverse',
  column: 'column',
  'column-reverse': 'column-reverse',
};

const Paper = ({ children }) => (
  <div
    style={{
      border: '1px solid grey',
      borderRadius: 4,
      padding: 10,
      backgroundColor: 'silver',
      color: 'grey',
    }}>
    {children}
  </div>
);

const Rows = ({ spacing }) => (
  <React.Fragment>
    <Grid container spacing={spacing}>
      <Grid item xs={3}>
        <Paper>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>xs=3</Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper>xs=8</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>xs=4</Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper>xs=5</Paper>
      </Grid>
    </Grid>
  </React.Fragment>
);

const Cols = ({ spacing }) => (
  <React.Fragment>
    <Grid container spacing={spacing} direction="column">
      <Grid item xs={3}>
        <Paper>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>xs=3</Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper>xs=8</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>xs=4</Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper>xs=5</Paper>
      </Grid>
    </Grid>
  </React.Fragment>
);

const tileData = [
  {
    img: 'http://xrest.ru/schemes/00/14/f2/d6/%D0%B8%D0%BD%D1%8C-%D1%8F%D0%BD%D1%8C-2.jpg',
    title: 'Breakfast',
    cols: 2,
  },
  {
    img: 'https://cdn1.flamp.ru/eea0ad2dc157a2fcf3f57c830a59bf4f_300_300.jpg',
    title: 'Tasty burger',
  },
  {
    img: 'https://tibet4u.ru/images/tibet4u/paraenerge.jpg',
    title: 'Camera',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXB-g-WXKoENM58pEpLyIOYDj9ab9bhk0tbwOf_GlwgU-Q6zso',
    title: 'Morning',
  },
  {
    img: 'https://astromega.ru/wp-content/uploads/2018/04/yingyangsymbol121.jpg',
    title: 'Hats',
  },
  {
    img: 'http://vseofeng.com/images/yin-yang.jpg',
    title: 'Honey',
  },
  {
    img: 'http://astromystik.ru/images/kartinki/in.jpg',
    title: 'Vegetables',
    cols: 2,
  },
  {
    img: 'http://www.zi3.ru/inc/osnovi/big/1568625521.jpg',
    title: 'Water plant',
  },
  {
    img: 'https://cs9.pikabu.ru/post_img/2017/10/28/11/1509215982125370035.jpg',
    title: 'Mushrooms',
  },
  {
    img: 'https://pp.userapi.com/c322622/v322622805/2b47/e_fFFwEIdR8.jpg?ava=1',
    title: 'Olive oil',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYLmP2KUKYksFB-19TTMEZt8IFfiXhTsvOy-yJ9HNra3dByMu',
    title: 'Sea star',
    cols: 2,
  },
  {
    img: 'https://fullofplankton.files.wordpress.com/2016/01/ying-yan5.png?w=809',
    title: 'Bike',
  },
];

const ImageGridList = ({ spacing }) => (
  <GridList cellHeight={160} cols={3} spacing={spacing}>
    {tileData.map((tile) => (
      <GridListTile key={tile.img} cols={tile.cols || 1}>
        <img src={tile.img} alt={tile.title} />
      </GridListTile>
    ))}
  </GridList>
);

const AdvancedImageGridList = ({ spacing, titlePosition, actionPosition, cols }) => (
  <GridList cellHeight={160} cols={3} spacing={spacing}>
    <GridListTile key="custom" cols={cols}>
      <img src="https://ozon-st.cdn.ngenix.net/multimedia/1003620208.jpg" alt="custom" />
      <GridListTileBar
        title={`custom(cols=${cols})`}
        titlePosition={titlePosition}
        actionIcon={(
          <IconButton>
            <StarBorderIcon color="primary" />
          </IconButton>
        )}
        actionPosition={actionPosition}
      />
    </GridListTile>
    {tileData.map((tile) => (
      <GridListTile key={tile.img} cols={tile.cols || 1}>
        <img src={tile.img} alt={tile.title} />
        <GridListTileBar
          title={tile.title}
          titlePosition={titlePosition}
          actionIcon={(
            <IconButton>
              <StarBorderIcon color="primary" />
            </IconButton>
          )}
          actionPosition={actionPosition}
        />
      </GridListTile>
    ))}
  </GridList>
);

const VariableList = ({ spacing, direction, size1, size2, size3, size4, size5, size6 }) => (
  <React.Fragment>
    <Grid container spacing={spacing} direction={direction}>
      <Grid item xs={size1}>
        <Paper>
          GridItem({size1})
        </Paper>
      </Grid>
      <Grid item xs={size2}>
        <Paper>
          GridItem({size2})
        </Paper>
      </Grid>
      <Grid item xs={size3}>
        <Paper>
          GridItem({size3})
        </Paper>
      </Grid>
      <Grid item xs={size4}>
        <Paper>
          GridItem({size4})
        </Paper>
      </Grid>
      <Grid item xs={size5}>
        <Paper>
          GridItem({size5})
        </Paper>
      </Grid>
      <Grid item xs={size6}>
        <Paper>
          GridItem({size6})
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper>GridItem(auto)</Paper>
      </Grid>
    </Grid>
  </React.Fragment>
);

storiesOf('Grid', module)
  .addWithJSX('Grid: rows', () => <Rows spacing={select('spacing', spacingSelect, 24)} />)
  .addWithJSX('Grid: cols', () => <Cols spacing={select('spacing', spacingSelect, 24)} />)
  .addWithJSX('Grid: variable sizes + auto', () => (
    <VariableList
      spacing={select('spacing', spacingSelect, 24)}
      direction={select('direction', directionSelect, 'row')}
      size1={number('size1', 3)}
      size2={number('size2', 3)}
      size3={number('size3', 3)}
      size4={number('size4', 3)}
      size5={number('size5', 3)}
      size6={number('size6', 3)}
    />
  ))
  .addWithJSX('GridList', () => <ImageGridList spacing={select('spacing', spacingSelect, 4)} />)
  .addWithJSX('AdvancedGridList', () => (
    <AdvancedImageGridList
      spacing={select('spacing', spacingSelect, 4)}
      titlePosition={select('title position', TBPositionSelect, 'top')}
      actionPosition={select('action position', LRPositionSelect, 'left')}
      cols={number('last cols', 1)}
    />
  ));
