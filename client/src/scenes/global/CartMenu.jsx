import { Box, Button, Divider, IconButton, Typography} from "@mui/material";
import {useSelector, useDispatch} from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';
import { shades } from "../../theme";
import{
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
 display: flex;
 justify-content: space-between;
 align-items: center;
 `;

 const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.attributes.price;
    }, 0);

    return (
        <Box //OVERLAY
         display={isCartOpen ? "block" : "none"} // block when its open vs hidden when its not open
         background color ="rgba(0, 0, 0, 0.4)"
         position ="fixed" // go through the whole thing
         zIndex = {10}
         width= "100%"
         height = "100%"
         left = "0"
         top = "0"
         overflow="auto"
        >
            {/* MODAL */}
            <Box
                position ="fixed"
                right="0"
                bottom="0"
                width= "max(400px, 30%)" //maximum of 400 px, if it goes beyond, then width of 30%
                height="100%"
                backgroundColor="white"
            >
                
                <Box padding="30px" overflow="auto" height="100%">
                    { /* HEADER */}
                    <FlexBox mb="15px">
                        <Typography variant="h3">
                             SHOPPING BAG({cart.length})</Typography>
                             <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                                <CloseIcon />
                             </IconButton>
                    </FlexBox>
            {/* CART LIST */}
                <Box>
                {cart.map((item) => (
                    <Box key={`${item.attributes.name}-${item.id}`}>
                        <FlexBox p="15 px 0"> {/* 15 is padding on top and bottom, left and right is 0 */}
                            <Box flex="1 1 40%"> {/* 1 represents flex grow (grow as much as possible, and width is 40% */}
                                <img
                                    alt={item?.name} // ? means if it exists
                                    width="123px"
                                    height="164px"
                                    src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`} //this is where strappi is
                                />
                            </Box>
                            <Box flex="1 1 60%">

                                {/* ITEM NAME */}
                                <FlexBox mb = "5 px">
                                    <Typography fontWeight = "bold">
                                        {item.attributes.name}
                                    </Typography>
                                    <IconButton onClick={() => dispatch(removeFromCart({id: item.id}))}>
                                        <CloseIcon />
                                    </IconButton>
                                </FlexBox>
                                <Typography>{item.attributes.shortDescription}</Typography>
                                {/* AMOUNT */}
                                <FlexBox m="15 px 0">
                                    <Box
                                    display = "flex"
                                    alignItems="center"
                                    border={`1.5px solid ${shades.neutral[500]}`}>
                                        <IconButton
                                        onClick={()=> dispatch(decreaseCount({id: item.id}))}>
                                        <RemoveIcon />
                                        </IconButton>
                                        <Typography>{item.count}</Typography>
                                        <IconButton
                                        onClick={()=> dispatch(increaseCount({id: item.id}))}>
                                        <AddIcon />
                                        </IconButton>
                                    </Box>
                                </FlexBox>

                                {/* PRICE */}
                                <Typography fontWeight="bold">
                                    ${item.attributes.price}
                                </Typography>
                            </Box>
                        </FlexBox>
                        <Divider />
                    </Box>
                ))}
            </Box>
                
            {/* ACTIONS */}
            <Box m="20 px 0">
                <FlexBox m="20px 0">
                    <Typography fontWeight="bold">SUBTOTAL</Typography>
                    <Typography fontWeight="bold">${totalPrice}</Typography>
                </FlexBox>
                <Button
                sx={{
                    backgroundColor: shades.primary[400],
                    color: "white",
                    borderRadius: 0,
                    minWidth: "100%",
                    padding: "20px 40px",
                    m: "20px 0" 
                }}
                onClick={() =>{
                    navigate("/checkout");
                    dispatch(setIsCartOpen({}));
                }}
                >CHECKOUT</Button>

            </Box>
            </Box>  
            </Box>
            </Box>
    )
 };

 export default CartMenu;
