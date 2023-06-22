import React, {useEffect, useState } from 'react';
import { Box, Typography, Tab, Tabs } from '@mui/material';
import Item from "../../components/Item";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from '../../state';

const ShoppingList=() => {
    const dispatch = useDispatch(); //trigger actions
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    console.log("items", items);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
// call backend to grab items from strappi
    async function getItems(){
        const items = await fetch("http://localhost:1337/api/items?populate=image", //grab image along with that
        {method: "GET"}
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    } 

    useEffect(() => {
        getItems();
    }, []) ;

    const bestSellersItems = items.filter(
        (item) => item.attributes.category === "bestSellers"
    );
    const newArrivalsItems = items.filter(
        (item) => item.attributes.category === "newArrivals"
    );


    return (
    <Box width="80%" margin="80px auto">
        <Typography variant="h3" textAlign="center">
            Our Featured <b>Products</b>
        </Typography>
        <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered TabIndicatorProps ={{ sx: {display:isNonMobile ? "block" : "none"}}}
        sx={{
            m: "25px", //margin
            "& .MuiTabs-flexContainer" : {
                flexWrap: "wrap"
            },
            
        }}
        >
            <Tab label="ALL" value="all" />
            <Tab label="NEW ARRIVALS" value="newArrivals" />
            <Tab label="Best Sellers" value="bestSellers" />
        </Tabs>
        <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around" // not space between because when one image, we want it to be centered
        rowGap="20px"
        columnGap="1.33%" //gap between each item
        >
            {value=== "all" && items.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
            {value=== "newArrivals" && newArrivalsItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
            {value=== "bestSellers" && bestSellersItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}

        </Box>
    </Box>
    );
};

export default ShoppingList;