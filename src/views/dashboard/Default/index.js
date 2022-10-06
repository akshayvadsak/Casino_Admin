import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// material-ui
import { Grid } from "@mui/material";

// project imports
import TotalPlayersCard from "./components/cards/TotalPlayersCard";
import PopularGamesCard from "./components/cards/PopularGamesCard";
import TotalNetworkCard from "./components/cards/TotalNetworkCard";
import TotalIncomeCard from "./components/cards/TotalIncomeCard";
import MyProfitCard from "./components/cards/MyProfitCard";
import TopAgentsCard from "./components/cards/TopAgentsCard";
import { gridSpacing } from "store/constant";
import TotalActivePlayers from "./components/cards/TotalActivePlayers";
import DateCard from "./components/cards/DateCard";
import { getDashboardData } from "store/thunk/dashboard.thunk";
import { useLocation } from "react-router";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  //   const location = useLocation();
  const { countNetwork, countTotalplayer, countActiveplayer } = useSelector(
    (state) => state.dashboard
  );

  function loadInitialData() {
    dispatch(getDashboardData({ pageno: 0, limit: 10 }));
  }

  //   window.location.reload();
  useEffect(() => {
    loadInitialData();
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={4} sm={4} xs={12}>
            <TotalPlayersCard
              isLoading={isLoading}
              countTotalplayer={countTotalplayer}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={4} xs={12}>
            <TotalNetworkCard
              isLoading={isLoading}
              countNetwork={countNetwork}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={4} xs={12}>
            <TotalActivePlayers
              isLoading={isLoading}
              countActiveplayer={countActiveplayer}
            />
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <MyProfitCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={4}>
            <TopAgentsCard isLoading={isLoading} />
          </Grid>

          <Grid item xs={12} md={4}>
            <DateCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularGamesCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
