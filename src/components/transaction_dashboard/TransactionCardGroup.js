import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './TransactionCardGroup.css';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  } from '../../actions/transactionActions';

import {
  VersionsIcon,
  OrganizationIcon,
  CheckCircleIcon,
  XCircleIcon,
  XIcon,
  PencilIcon
} from '@primer/octicons-react'

import {
  GridList,
  Grid,
  Box,
  Typography,
  GridListTile,
  Card,
  CardContent,
  CircularProgress,
  CardActionArea,
  CardActions,
  IconButton,
  Divider
} from '@material-ui/core';


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
}


const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: 'nowrap',
    height: '310px',
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
  root: {
    position: 'relative',
  },
  bottom: {
    opacity: '0.6',
    color: '#92DCE5',
  },
  top: {
    position: 'absolute',
    left: 0,
  },
}))

function RenderCard(props) {
  const classes = useStyles();
  // mapping the transactions
  const history = useHistory();
  const routeToTransaction = (id) => {
    let path = `/transaction/${id}/assist`;
    history.push(path);
  }
  return (
    <div className="transaction-card-root">
      <GridList className={classes.gridList} cols={2.25}>
        {props.transaction.map((transaction) =>
          <GridListTile className="transaction-card-item">
            <Card className="transaction-card" variant="outlined">
              <CardActionArea onClick={() => routeToTransaction(transaction.id)}>
                <Box paddingTop={2} paddinBottom={1}>
                  <CardContent>
                    <Grid
                      container
                      spacing={0}
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item md={4}>
                        <Box paddingLeft={1}>
                          <Box position="relative" display="inline-flex" paddingLeft={2}>
                            <div className={classes.root}>
                              <CircularProgress
                                variant="determinate"
                                className={classes.bottom}
                                size={100}
                                thickness={7}
                                value={100}
                              />
                              <CircularProgress
                                variant="static"
                                disableShrink
                                className={classes.top}
                                size={100}
                                thickness={7}
                                value={100} // Make this dynamic wrt the transaction
                              />
                            </div>
                            <Box
                              top={0}
                              left={0}
                              bottom={0}
                              right={0}
                              position="absolute"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              paddingLeft={2}
                            >
                              <Typography variant="h6" component="div">{/* Add the dynamic % of completion here */}</Typography> 
                            </Box>
                          </Box>
                          <Box marginTop={2}><Typography justify="center" variant="h5">
                            {transaction.Name}
                          </Typography></Box>
                        </Box>
                      </Grid>
                      <Grid item md={8}>
                        <Box paddingLeft={4}>
                          <Typography style={{ fontSize: '24px' }}>
                            <table>
                              <tr>
                                <td style={{ paddingBottom: '4.5px', paddingRight: '24px' }}><VersionsIcon size={25} /></td>
                                <td>Tasks</td>
                              </tr>
                            </table>
                          </Typography>
                        </Box>
                        <Box paddingLeft={11}>
                          <Typography style={{ fontSize: '18px' }}>
                            <table>
                              <tr>
                                <td style={{ paddingBottom: '4.5px', paddingRight: '18px' }}><CheckCircleIcon className="transaction-card-subicongreen" size={18} /></td>
                                <td>{transaction.completedTask} Tasks</td>
                              </tr>
                              <tr>
                                <td style={{ paddingBottom: '4.5px', paddingRight: '18px' }}><XCircleIcon className="transaction-card-subiconred" size={18} /></td>
                                <td>{transaction.allTask - transaction.completedTask} Tasks</td>
                              </tr>
                            </table>
                          </Typography>
                        </Box>
                        <Box paddingLeft={4}>
                          <Typography style={{ fontSize: '24px' }}>
                            <table>
                              <tr>
                                <td style={{ paddingBottom: '4.5px', paddingRight: '24px' }}><OrganizationIcon size={25} /></td>
                                <td>Address</td>
                              </tr>
                            </table>
                          </Typography>
                        </Box>
                        <Box paddingLeft={11} style={{ fontSize: '18px' }}>
                          <Typography noWrap>
                            {transaction.Address}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Box>
              </CardActionArea>
              <Divider/>
              <CardActions style={{margin:'0', padding:'0'}}>
                <Grid container justify="flex-end">
                  <Box marginRight={2}>
                    <IconButton>
                      <PencilIcon/>
                    </IconButton>
                    <IconButton>
                      <XIcon className='color-danger'/>
                    </IconButton>
                  </Box>
                </Grid>
              </CardActions>
            </Card>
          </GridListTile>)}
      </GridList>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(RenderCard);
