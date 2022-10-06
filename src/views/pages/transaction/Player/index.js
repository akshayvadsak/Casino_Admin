import { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
  ButtonGroup,
  Typography,
  IconButton,
} from "@mui/material";
import {
  IconCurrencyDollar as TransactionIcon,
  IconArrowBackUp as RevokeIcon,
} from "@tabler/icons";
import { useFormik } from "formik";

import transactionSchema from "schema/player.transaction.schema";

// Components
import MainCard from "ui-component/cards/MainCard";
import DataTable from "components/DataTable";
import NotFoundCard from "components/NotFoundCard";
import Modal from "components/ResponsiveModal";
import PlayerDeposit from "./components/Forms/PlayerDepositForm";
import PlayerWithdraw from "./components/Forms/PlayerWithdrawForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlayerTransaction,
  getPlayerData,
  playerDeposit,
} from "store/thunk/transaction/transaction.thunk";
import AlertComponent from "components/Alert";
import moment from "moment";

function Transaction() {
  const theme = useTheme();
  const isMobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const transaction = useSelector((state) => state.transaction);
  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [pageLimit, setpageLmit] = useState(10);
  const [pageNo, setPageNo] = useState(0);

  const { agentpermission, menupermission } = JSON.parse(
    localStorage.getItem("MAJESTIC_CASINO")
  );

  const user = JSON.parse(localStorage.getItem("MAJESTIC_CASINO"));

  const agentPermissions = agentpermission.map(
    (permission) => permission.AGENT_PERMISSION_KEY
  );

  const pageUrl =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
  const menuPermissions = menupermission.filter(
    (permission) =>
      permission.MENU_SLUG ===
      `/${pageUrl.split("/")[pageUrl.split("/").length - 1]}`
  )[0];

  const formik = useFormik({
    initialValues: {
      //   username_playerId: "",
      //   email: "",
      //   password: "",
      //   phone: "",
    },
    validationSchema: transactionSchema,
    onSubmit: (values) => {
      dispatch(
        playerDeposit({
          majestic_coins: values.coins,
          majestic_points: values.diamonds,
          transaction_type: values.transaction_type,
          agentId: user.userdata.AGENT_ID,
          playerId: transaction.playerData.PLAYER_ID,
        })
      );
      dispatch(getPlayerTransaction({ pageno: pageNo, limit: pageLimit }));
      setOpenDepositModal(false);
    },
  });

  const columns = [
    {
      name: "dataindex",
      label: "SR NO",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const val = dataIndex + 1 + pageLimit * pageNo;
          return val;
        },
      },
    },
    {
      name: "Player",
      label: "TRANSACTION TO",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          const val = value?.PLAYER_NAME;
          return val;
        },
      },
    },
    {
      name: "MAGESTIC_COINS",
      label: "MAjESTIC COINS",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => <Typography>{value}</Typography>,
      },
    },
    {
      name: "MAGESTIC_POINTS",
      label: "MAjESTIC POINTS",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => <Typography>{value}</Typography>,
      },
    },
    {
      name: "TYPE",
      label: "TRANSACTION TYPE",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <Typography color={value === "DEPOSIT" ? "green" : "error"}>
            {value}
          </Typography>
        ),
      },
    },

    {
      name: "UPDATE_DATE",
      label: "LAST UPDATED",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <Typography>{moment(value).format("DD/MM/YYYY HH:MM A")}</Typography>
        ),
      },
    },
    // {
    //   name: "",
    //   label: "ACTION",
    //   options: {
    //     filter: false,
    //     sort: true,
    //     customBodyRenderLite: (dataIndex) => (
    //       <IconButton>
    //         <RevokeIcon />
    //       </IconButton>
    //     ),
    //   },
    // },
  ];

  const options = {
    filter: true,
    print: false,
    download: false,
    search: false,
    selectableRows: false,
    rowsPerPage: pageLimit,
    pagination: true,
    rowsPerPageOptions: [10, 20, 30],
    serverSide: true,
    count: transaction.totalRecords,
    sortThirdClickReset: true,
    jumpToPage: true,
    onChangeRowsPerPage: (page) => {
      setpageLmit(page);
    },
    onChangePage: (page) => {
      setPageNo(page);
    },
  };

  useEffect(() => {
    dispatch(getPlayerTransaction({ pageno: pageNo, limit: pageLimit }));
  }, [pageNo, pageLimit]);

  useEffect(() => {
    if (formik.values.username_playerId || formik.values.email) {
      dispatch(
        getPlayerData({
          value: formik.values.username_playerId
            ? formik.values.username_playerId
            : formik.values.email,
        })
      );
    }
  }, [formik.values.username_playerId, formik.values.email]);

  useEffect(() => {
    formik.setFieldValue("phone", transaction.playerData.PLAYER_PHONE);
    formik.setFieldValue("email", transaction.playerData.PLAYER_EMAIL);
  }, [transaction.playerData]);

  return (
    <Box>
      <Paper>
        <MainCard
          title={!isMobileDevice && "Player Transaction"}
          secondary={
            <ButtonGroup variant="contained" color="warning">
              {agentPermissions.includes("ISDEPOSIT_PLAYER") && (
                <Button
                  startIcon={<TransactionIcon />}
                  color="warning"
                  onClick={() => setOpenDepositModal(!openDepositModal)}
                  style={{ marginRight: 2 }}
                >
                  Deposit
                </Button>
              )}
              {agentPermissions.includes("ISWITHDRAW_PLAYER") && (
                <Button
                  startIcon={<TransactionIcon />}
                  color="warning"
                  onClick={() => setOpenWithdrawModal(!openWithdrawModal)}
                  style={{ marginLeft: 2 }}
                >
                  Withdraw
                </Button>
              )}
            </ButtonGroup>
          }
        >
          {isMobileDevice && (
            <>
              <ButtonGroup
                variant="contained"
                color="warning"
                style={{ marginBottom: 15 }}
              >
                {agentPermissions.includes("ISDEPOSIT_PLAYER") && (
                  <Button
                    startIcon={<TransactionIcon />}
                    color="warning"
                    onClick={() => setOpenDepositModal(!openDepositModal)}
                    style={{ marginRight: 2 }}
                  >
                    Deposit
                  </Button>
                )}
                {agentPermissions.includes("ISWITHDRAW_PLAYER") && (
                  <Button
                    startIcon={<TransactionIcon />}
                    color="warning"
                    onClick={() => setOpenWithdrawModal(!openWithdrawModal)}
                    style={{ marginLeft: 2 }}
                  >
                    Withdraw
                  </Button>
                )}
              </ButtonGroup>
              <Divider />
            </>
          )}
          <Box>
            {transaction.data.length > 0 && menuPermissions.ISVIEW ? (
              <DataTable
                title="Players Transaction List"
                data={transaction.data}
                columns={columns}
                options={options}
              />
            ) : (
              <NotFoundCard msg="Sorry, No data found" />
            )}
          </Box>
        </MainCard>
      </Paper>

      {/* DEPOSIT MODAL */}
      <Modal
        title="Player Deposit"
        open={openDepositModal}
        onClose={() => setOpenDepositModal(!openDepositModal)}
      >
        <PlayerDeposit
          formik={formik}
          openModal={openDepositModal}
          setOpenDepositModal={!openDepositModal}
        />
      </Modal>

      {/* WITHDRAW MODAL */}
      <Modal
        title="Player Withdraw"
        open={openWithdrawModal}
        onClose={() => setOpenWithdrawModal(!openWithdrawModal)}
      >
        <PlayerWithdraw
          formik={formik}
          openModal={openWithdrawModal}
          setOpenWithdrawModal={() => setOpenWithdrawModal(!openWithdrawModal)}
        />
      </Modal>

      {transaction.status === "failed" && (
        <AlertComponent status="false" message={transaction.msg} />
      )}
      {transaction.status === "success" && (
        <AlertComponent status="true" message={transaction.msg} />
      )}
    </Box>
  );
}

export default Transaction;
