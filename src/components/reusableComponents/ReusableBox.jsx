import React from 'react'
import {
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';


const ReusableBox = () => {
  const StyledBox = styled(Box)({
    // backgroundImage: 'url(https://source.unsplash.com/random/?neighborhood)',
    // backgroundRepeat: 'no-repeat',
    backgroundColor: 'lightgray',
    // backgroundSize: 'cover',
    marginTop: '4%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '750px',
    // minWidth: '200px',
    height: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // borderRadius: 10,
    gridtemplatecolumns: 'repeat(auto-fill, minmax(21%, 1fr))',
    columnGap: '20px',
  });
  
  return (
    <StyledBox/>
  )
}

export default ReusableBox