import { Box, useMediaQuery, TextField } from "@mui/material";
import { getIn } from "formik";

const AddressForm =({
    type,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,

}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    //these functionalities allow for better code readability
    const formattedName = (field) => `${type}.${field}`;

    const formattedError = (field) => // will tell us if both are true, if either are false then no error
    Boolean(
        getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

    const formattedHelper = (field) => // prev checks for error, this shows error
        getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))

        return (
            <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" // split into 4 fractions, min 0, max 1 fractional unit (from 0 to 25%)
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined: "span 4"} //if mobile, span of 4
            }}>
                <TextField
                fullWidth
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name={formattedName("firstName")}
                error={formattedError("firstName")}
                sx={{ gridColum: "span 2"}}
                />
                <TextField
                fullWidth
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lasttName}
                name={formattedName("lastName")}
                error={formattedError("lastName")}
                sx={{ gridColum: "span 2"}}
                />
                <TextField
                fullWidth
                type="text"
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name={formattedName("country")}
                error={formattedError("country")}
                sx={{ gridColum: "span 4"}}
                />
                <TextField
                fullWidth
                type="text"
                label="Street Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street1}
                name={formattedName("street1")}
                error={formattedError("street1")}
                sx={{ gridColum: "span 2"}}
                />
                <TextField
                fullWidth
                type="text"
                label="Street Address 2 (optional)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street2}
                name={formattedName("street2")}
                error={formattedError("street2")}
                sx={{ gridColum: "span 2"}}
                />
                <TextField
                fullWidth
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name={formattedName("city")}
                error={formattedError("city")}
                sx={{ gridColum: "span 2"}}
                />
                <TextField
                fullWidth
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name={formattedName("state")}
                error={formattedError("state")}
                sx={{ gridColum: "1fr"}}
                />
                <TextField
                fullWidth
                type="text"
                label="Zip Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.zipCode}
                name={formattedName("zipCode")}
                error={formattedError("zipCode")}
                sx={{ gridColum: "1fr"}}
                />
            </Box>
        );
};

export default AddressForm;