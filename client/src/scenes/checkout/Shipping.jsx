import { Box, CheckBox, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping =({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
}) => {
    return (
        <Box m="30px auto">
            {/* BILLING FORM */}
            <Box>
                <Typography sx={{ mb: "15px"}} fontSize="18px">
                    Billing Information
                </Typography>
                <AddressForm 
                type="billingAddress"
                values={values.billingAddress} // keep track of value of what user types
                errors={errors} // error text provided in validation schema, "required" as the error value, otherwise, empty string
                touched={touched} // whether someone has clicked on that field or typed in it
                handleBlur={handleBlur} //handles when you click on the input, and when you click out
                handleChange={handleChange} // value that gets changed when user types
                />
                </Box>
                <Box mb="20px"> 
                 <FormControlLabel
                 label="Same for Shipping Address"
                 control={
                 <Checkbox
                defaultChecked
            value={values.shippingAddress.isSameAddress}
            onchange={() => 
            setFieldValue(
                "shippingAddress.isSameAddress",
                !values.shippingAddress.isSameAddress
            )
        }
        />
        }
        />
            </Box>
        {/* SHIPPING FORM */}
        {!values.shippingAddress.isSameAddress && (
            <Box>
            <Typography sx={{ mb: "15px"}} fontSize="18px">
            Shipping Information
        </Typography>
        <AddressForm 
        type="billingAddress"
        values={values.billingAddress} // keep track of value of what user types
        errors={errors} // error text provided in validation schema, "required" as the error value, otherwise, empty string
        touched={touched} // whether someone has clicked on that field or typed in it
        handleBlur={handleBlur} //handles when you click on the input, and when you click out
        handleChange={handleChange} // value that gets changed when user types
        />
        </Box>
        )}
        </Box>
    );

};

export default Shipping;