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
} from "@mui/material";
import { IconCurrencyDollar as TransactionIcon } from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  agentDeposit,
  getAgentData,
  getTransaction,
} from "store/thunk/transaction/transaction.thunk";
import moment from "moment";

// Components
import MainCard from "ui-component/cards/MainCard";
import DataTable from "components/DataTable";
import NotFoundCard from "components/NotFoundCard";
import Modal from "components/ResponsiveModal";
import AgentDeposit from "./components/Forms/AgentDepositForm";
import AlertComponent from "components/Alert";
import transactionSchema from "schema/agent.transaction.schema";
import { useFormik } from "formik";

function Transaction() {
  const theme = useTheme();
  const transaction = useSelector((state) => state.transaction);
  const coinPack = useSelector((state) => state.coinPack);
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  const [openModal, setOpenModal] = useState(false);
  const [pageLimit, setpageLmit] = useState(10);
  const [pageNo, setPageNo] = useState(0);

  const user = JSON.parse(localStorage.getItem("MAJESTIC_CASINO"));

  const formik = useFormik({
    initialValues: {
      username_agentId: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: transactionSchema,
    onSubmit: (values) => {
      dispatch(
        agentDeposit({
          majestic_coins: values.coin_pack.MAGESTIC_COINS,
          majestic_points: values.coin_pack.MAGESTIC_POINTS,
          buy_amount: values.coin_pack.BUY_AMOUNT,
          transaction_type: values.transaction_type,
          agentId: user.userdata.AGENT_ID,
          senderId: transaction.agentData.AGENT_ID,
        })
      );
      dispatch(getTransaction({ pageno: pageNo, limit: pageLimit }));
      setOpenModal(false);
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
      name: "Agent",
      label: "TRANSACTION BY",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <Typography>{value?.AGENT_NAME}</Typography>
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
    dispatch(getTransaction({ pageno: pageNo, limit: pageLimit }));
  }, [pageNo, pageLimit]);

  useEffect(() => {
    const agentVerifyTimer = setTimeout(() => {
      if (formik.values.username_agentId || formik.values.email) {
        dispatch(
          getAgentData({
            value: formik.values.username_agentId
              ? formik.values.username_agentId
              : formik.values.email,
          })
        );
      }
    }, [1000]);
    return () => clearTimeout(agentVerifyTimer);
  }, [formik.values.username_agentId, formik.values.email]);

  useEffect(() => {
    formik.setFieldValue("phone", transaction.agentData.AGENT_PHONE);
    formik.setFieldValue("email", transaction.agentData.AGENT_EMAIL);
  }, [transaction.agentData]);

  return (
    <Box>
      <Paper>
        <MainCard
          title={!isMobileDevice && "Agents Transactions"}
          secondary={
            <Button
              startIcon={<TransactionIcon />}
              variant="contained"
              color="warning"
              sx={{ mr: 3 }}
              onClick={() => setOpenModal(!openModal)}
            >
              Deposit
            </Button>
          }
        >
          {isMobileDevice && (
            <>
              <Button
                startIcon={<TransactionIcon />}
                variant="contained"
                color="warning"
                fullWidth
                style={{ marginBottom: 15 }}
                onClick={() => setOpenModal(!openModal)}
              >
                Deposit
              </Button>
              <Divider />
            </>
          )}
          <Box>
            {transaction.data.length > 0 ? (
              <DataTable
                title="Agents Transactions List"
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

      <Modal
        title="Agent Transaction"
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
      >
        <AgentDeposit
          openModal={openModal}
          setOpenModal={setOpenModal}
          dispatch={dispatch}
          coinPack={coinPack}
          formik={formik}
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
