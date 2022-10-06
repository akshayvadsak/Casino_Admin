import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

// third party
import { Formik } from "formik";

// project imports
import useScriptRef from "hooks/useScriptRef";
import AnimateButton from "ui-component/extended/AnimateButton";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlertComponent from "components/Alert";

import loginSchema from "schema/login.schema";
import { API_URL, InternalAPI } from "common/constants";

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const [res, setRes] = useState({ status: null, msg: "" });

  const [showPassword, setShowPassword] = useState(false);

  // HANDLE SHOW PASSWORD
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // LOGIN USER
  const loginUser = async ({ email, password }) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ AGENT_EMAIL: email, AGENT_PASSWORD: password }),
      };
      const response = await fetch(
        `${API_URL}${InternalAPI.LOGIN}`,
        requestOptions
      );
      if (response.status === 200) {
        const result = await response.json();
        if (result.status === true) {
          setRes({ ...res, status: true, msg: result.msg });
          localStorage.setItem("MAJESTIC_CASINO", JSON.stringify(result.data));

          navigate("/dashboard");
          window.location.reload();
          //   navigate("/dashboard");
        } else {
          setRes({ ...res, status: false, msg: result.msg });
        }
        setTimeout(() => {
          setRes({ status: null, msg: "" });
        }, 2000);
      }
    } catch (err) {
      setRes({
        ...res,
        status: false,
        msg: "Oops something wrong. Please try again",
      });
      setTimeout(() => {
        setRes({ status: null, msg: "" });
      }, 2000);
    }
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          loginUser({ email: values.email, password: values.password });
          // navigate('/dashboard');
        }}
      >
        {(formik) => (
          <form noValidate onSubmit={formik.handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(formik.touched.email && formik.errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={formik.values.email}
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label="Email Address"
                inputProps={{}}
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {formik.errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(formik.touched.password && formik.errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {formik.errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="secondary"
                  />
                }
                label="Remember me"
              />
              <Typography
                component={Link}
                to="/forget-password"
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                Forgot Password?
              </Typography>
            </Stack>
            {formik.errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{formik.errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  // disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  startIcon={
                    user.status === "loading" && <CircularProgress size={20} />
                  }
                >
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      {user.status === "failed" && (
        <AlertComponent status="false" message={user.msg} />
      )}
      {user.status === "success" && (
        <AlertComponent status="true" message={user.msg} />
      )}
    </>
  );
};

export default AuthLogin;
