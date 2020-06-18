import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {GridList, Grid,GridListTile, Card, CardContent,CardActionArea, List,ListItem,ListItemIcon, ListItemText} from '@material-ui/core';
import './ExistingTransactionComponent.css';
import {VersionsIcon, OrganizationIcon, CheckCircleIcon, XCircleIcon} from '@primer/octicons-react'
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
    gridList: {
      flexWrap: 'nowrap',
      height: '310px',
    },
    nested: {
        paddingLeft: theme.spacing(9),
      },
}))

const chart={
          
    series: [60, 40],
    options: {
        colors:['#150578', '#92DCE5'],   
        chart: {
            width: 250,
            type: 'donut',
        },
        legend:{
            show: false,
        },
        dataLabels:{
            enabled:false,
        },
        title: {
            text: 'Transaction 1',
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '22px',
              fontWeight:  '900',
              fontFamily:  'Arial',
              color:  '#263238'
            },
        },
    },
};

function RenderCard(){

    const classes = useStyles();

    return (
      <div className="root">
        <GridList className={classes.gridList} cols={2.5}>
          <GridListTile className="item">
            <Card className="card" variant="outlined">
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Chart options={chart.options} series={chart.series} type="donut" width={250}/>
                  </Grid>
                  <Grid className='rgrid' item xs={6}>
                        <List>
                            <ListItem className="secondli">
                                <ListItemIcon ><VersionsIcon size={20}/></ListItemIcon>
                                Tasks
                            </ListItem>
                            <ListItem className='secondlisub'>
                                <CheckCircleIcon size={16} className="subicongreen"/>
                                6 Tasks
                            </ListItem>
                            <ListItem className='secondlisub'>
                                <XCircleIcon size={16} className="subiconred"/>
                                4 Tasks
                            </ListItem>
                            <ListItem className="secondli">
                                <ListItemIcon><OrganizationIcon size={20}/></ListItemIcon>
                                Address
                            </ListItem>
                            <ListItem className='secondlisub'>
                                Tasks
                            </ListItem>
                        </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </GridListTile>
        </GridList>
      </div>
    );

}

export default RenderCard;