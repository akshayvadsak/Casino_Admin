import { useEffect, useState } from "react";
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  OutlinedInput,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import {
  IconChecks as ConfirmIcon,
  IconX as CancelIcon,
  IconDiamond as DiamondIcon,
  IconCoin as CoinIcon,
  IconCurrencyDollar as PriceIcon,
} from "@tabler/icons";
import propTypes from "prop-types";
import { createTransaction } from "store/thunk/transaction/transaction.thunk";
import transactionSchema from "schema/agent.transaction.schema";
import { findIndex } from "lodash";
import { getCoinPackList } from "store/thunk/configuration/coinPack.thunk";

function AgentDeposit({ openModal, setOpenModal, dispatch, coinPack, formik }) {
  const theme = useTheme();
  const isMobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getCoinPackList({ pageno: 0, limit: 10 }));
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
          <InputLabel htmlFor="username_agentId">
            Username or Agent Id
          </InputLabel>
          <OutlinedInput
            value={formik.values.username}
            type="text"
            id="username_agentId"
            name="username_agentId"
            label="Username or Agent Id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            required
          />
          {formik.touched.username_agentId &&
            formik.errors.username_agentId && (
              <FormHelperText id="username-error">
                {formik.errors.username_agentId}
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
            htmlFor="phone_no"
          >
            Phone No
          </InputLabel>
          <OutlinedInput
            value={formik.values.phone}
            type="text"
            id="phone_no"
            name="phone_no"
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
          error={formik.touched.coin_pack && Boolean(formik.errors.coin_pack)}
        >
          <InputLabel htmlFor="coin_pack">Coin Pack</InputLabel>
          <Select
            // value={formik.coin_pack}
            id="coin_pack"
            name="coin_pack"
            label="Coin Pack"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            renderValue={({ PACK_ID }) =>
              coinPack.coinPackList[
                findIndex(coinPack.coinPackList, { PACK_ID: PACK_ID })
              ].PACK_NAME
            }
          >
            {coinPack.coinPackList.length > 0 ? (
              coinPack.coinPackList?.map((pack, index) => (
                <MenuItem value={pack} style={{ display: "flex" }}>
                  <ListItemText>{pack.PACK_NAME}</ListItemText>
                  <ListItemIcon>
                    <CoinIcon />
                  </ListItemIcon>
                  <Divider orientation="vertical" />
                  <ListItemText>{pack.MAGESTIC_COINS}</ListItemText>
                  <ListItemIcon>
                    <DiamondIcon />
                  </ListItemIcon>
                  <Divider orientation="vertical" />
                  <ListItemText>{pack.MAGESTIC_POINTS}</ListItemText>
                  <ListItemIcon>
                    <PriceIcon />
                  </ListItemIcon>
                  <ListItemText>{pack.BUY_AMOUNT}</ListItemText>
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Coin Pack Available</MenuItem>
            )}
          </Select>
          {formik.touched.coin_pack && formik.errors.coin_pack && (
            <FormHelperText id="coin_pack-error">
              {formik.errors.coin_pack}
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

AgentDeposit.propTypes = {
  formik: propTypes.object,
  openModal: propTypes.string,
  setOpenModal: propTypes.func,
};

export default AgentDeposit;
