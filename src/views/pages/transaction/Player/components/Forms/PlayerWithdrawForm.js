import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
  Button,
  useTheme,
  useMediaQuery,
  FormHelperText,
} from "@mui/material";
import { IconChecks as ConfirmIcon, IconX as CancelIcon } from "@tabler/icons";
import propTypes from "prop-types";
import { API_URL, InternalAPI } from "common/constants";

function PlayerWithdraw({ formik, openModal, setOpenModal }) {
  const theme = useTheme();
  const isMobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const [constantData, setConstantData] = useState({
    CONST_VALUE: "100",
    CONST_NAME: "MAJESTIC_DIAMONDS_PER_COIN",
  });

  const handleAmountchange = (e) => {
    if (e.target.name === "coins") {
      formik.setFieldValue("coins", parseFloat(e.target.value));
      formik.setFieldValue(
        "diamonds",
        parseFloat(e.target.value * parseInt(constantData.CONST_VALUE))
      );
    }

    if (e.target.name === "diamonds") {
      formik.setFieldValue("diamonds", parseFloat(e.target.value));
      formik.setFieldValue(
        "coins",
        parseFloat(e.target.value / parseInt(constantData.CONST_VALUE))
      );
    }
  };

  const getConstantData = async () => {
    const response = await fetch(`${API_URL}${InternalAPI.CONSTANTS}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ KEY: "MAJESTIC_DIAMONDS_PER_COIN" }),
    });
    if (response.status === 200) {
      const result = await response.json();
      if (result.status === true) {
        setConstantData(result.data);
      }
    }
  };

  useEffect(() => {
    getConstantData();
    formik.setFieldValue("transaction_type", "WITHDRAW");
  }, []);

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <FormControl
          fullWidth
          style={{ marginTop: 10, marginBottom: 10 }}
          error={
            formik.touched.username_playerId &&
            Boolean(formik.errors.username_playerId)
          }
        >
          <InputLabel htmlFor="username-agentid">
            Username or Player Id
          </InputLabel>
          <OutlinedInput
            value={formik.values.username}
            type="text"
            id="username-agentid"
            name="username_playerId"
            label="Username or Agent Id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            required
          />
          {formik.touched.username_playerId &&
            formik.errors.username_playerId && (
              <FormHelperText id="username-error">
                {formik.errors.username_playerId}
              </FormHelperText>
            )}
        </FormControl>

        <FormControl
          fullWidth
          style={{ marginTop: 10, marginBottom: 10 }}
          error={formik.touched.email && Boolean(formik.errors.email)}
        >
          <InputLabel
            shrink={formik.values.email ? true : false}
            htmlFor="email"
          >
            Email
          </InputLabel>
          <OutlinedInput
            value={formik.values.email}
            type="text"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText id="email-error">
              {formik.errors.email}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          style={{ marginTop: 10, marginBottom: 10 }}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
        >
          <InputLabel
            shrink={formik.values.phone ? true : false}
            htmlFor="phone"
          >
            Phone No
          </InputLabel>
          <OutlinedInput
            value={formik.values.phone}
            type="text"
            id="phone"
            name="phone"
            label="Phone No"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.phone && formik.errors.phone && (
            <FormHelperText id="phone_no-error">
              {formik.errors.phone}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          style={{ marginTop: 10, marginBottom: 10 }}
          error={
            formik.touched.depositPoints && Boolean(formik.errors.depositPoints)
          }
        >
          {/* <InputLabel htmlFor="coins">Enter majestic coins</InputLabel> */}
          <OutlinedInput
            value={formik.values.coins}
            type="number"
            id="coins"
            name="coins"
            // label="Enter points to deposit"
            variant="outlined"
            onChange={handleAmountchange}
            onBlur={formik.handleBlur}
            required
            placeholder="Enter majestic coins"
          />

          {formik.touched.depositPoints && formik.errors.depositPoints && (
            <FormHelperText id="coin_pack-error">
              {formik.errors.depositPoints}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          style={{ marginTop: 10, marginBottom: 10 }}
          error={
            formik.touched.depositPoints && Boolean(formik.errors.depositPoints)
          }
        >
          {/* <InputLabel htmlFor="diamonds">Enter majestic diamonds</InputLabel> */}
          <OutlinedInput
            value={formik.values.diamonds}
            type="number"
            id="diamonds"
            name="diamonds"
            // label="Enter points to deposit"
            variant="outlined"
            onChange={handleAmountchange}
            onBlur={formik.handleBlur}
            required
            placeholder="Enter majestic diamonds"
          />

          {formik.touched.depositPoints && formik.errors.depositPoints && (
            <FormHelperText id="coin_pack-error">
              {formik.errors.depositPoints}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          style={{ marginTop: 10, marginBottom: 10 }}
          error={formik.touched.password && Boolean(formik.errors.password)}
        >
          <InputLabel htmlFor="password">Enter Your Password</InputLabel>
          <OutlinedInput
            value={formik.values.password}
            type="password"
            id="password"
            name="password"
            label="Enter Your Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            required
          />
          {formik.touched.password && formik.errors.password && (
            <FormHelperText id="password-error">
              {formik.errors.password}
            </FormHelperText>
          )}
        </FormControl>

        <Box style={{ display: "flex", justifyContent: "right" }}>
          <Button
            type="reset"
            onClick={() => setOpenModal(!openModal)}
            variant="contained"
            color={theme.palette.secondary.light[800]}
            style={{
              margin: 10,
              color: "white",
              paddingLeft: 20,
              paddingRight: 20,
            }}
            startIcon={!isMobileDevice && <CancelIcon />}
          >
            Cancel Transaction
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            style={{
              color: "#fff",
              margin: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            startIcon={!isMobileDevice && <ConfirmIcon />}
          >
            Confirm Transaction
          </Button>
        </Box>
      </form>
    </Box>
  );
}

PlayerWithdraw.propTypes = {
  formik: propTypes.object,
  openModal: propTypes.string,
  setOpenModal: propTypes.func,
};

export default PlayerWithdraw;
