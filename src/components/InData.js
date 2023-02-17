import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  InputAdornment,
  Stack,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import Rechart from "./rechart";

function InData() {
  const [sp_Sc, setSp_Sc] = useState(0);
  const [sp_Lc, setSp_Lc] = useState(0);
  const [Sc, setSc] = useState(0);
  const [Lc, setLc] = useState(0);
  const [ml, setMl] = useState(0);
  const [mp, setMp] = useState(0);
  const [bp, setBp] = useState(0);
  const [ns, setNs] = useState(1);
  const [tp, setTp] = useState(0);
  const [pp, setPp] = useState(0);

  const [value, setValue] = useState("bull_call");

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setSp_Sc(0);
    setSp_Lc(0);
    setSc(0);
    setLc(0);
    setMl(0);
    setMp(0);
    setTp(0);
    setNs(1);
    setBp(0);
    setPp(0);
  }, [value]);

  const onChangeField_sp_Sc = (event) => {
    setSp_Sc(event.target.value);
  };
  const onChangeField_sp_Lc = (event) => {
    setSp_Lc(event.target.value);
  };
  const onChangeField_Sc = (event) => {
    setSc(event.target.value);
  };
  const onChangeField_Lc = (event) => {
    setLc(event.target.value);
  };
  const onChangeField_ns = (event) => {
    setNs(event.target.value);
  };
  const onChangeField_tp = (event) => {
    setTp(event.target.value);
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if (value === "bull_call") {
      if (Number(sp_Sc) > Number(sp_Lc) && Number(Sc) > Number(Lc)) {
        setMl(((Number(Sc) - Number(Lc)) * Number(ns) * 100).toFixed(2));

        setMp(
          (
            (Number(sp_Sc) - Number(sp_Lc) - (Number(Lc) - Number(Sc))) *
            Number(ns) *
            100
          ).toFixed(2)
        );

        setBp((Number(sp_Lc) + (Number(Sc) - Number(Lc))).toFixed(2));

        setPp(
          (
            (Number(tp) - Number(sp_Lc) - (Number(Lc) - Number(Sc))) *
            Number(ns) *
            100
          ).toFixed(2)
        );

        setSuccess(true);
      } else {
        setFailed(true);
      }
    } else if (value === "bear_call") {
      if (Number(sp_Lc) > Number(sp_Sc) && Number(Sc) > Number(Lc)) {
        setMl(
          (Number(sp_Lc) - Number(sp_Sc) - (Number(Sc) - Number(Lc))) *
            Number(ns) *
            100
        );

        setMp(((Number(Sc) - Number(Lc)) * Number(ns) * 100).toFixed(2));

        setBp((Number(sp_Sc) + (Number(Sc) - Number(Lc))).toFixed(2));

        setPp(
          (
            (Number(tp) - Number(sp_Lc) - (Number(Lc) - Number(Sc))) *
            Number(ns) *
            100
          ).toFixed(2)
        );

        setSuccess(true);
      } else {
        setFailed(true);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setFailed(false);
  };

  return (
    <div>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Success!
        </Alert>
      </Snackbar>
      <Snackbar
        open={failed}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please input correct value.
        </Alert>
      </Snackbar>
      <Rechart
        sp_Sc={sp_Sc}
        sp_Lc={sp_Lc}
        Sc={Sc}
        Lc={Lc}
        ml={ml}
        mp={mp}
        option={value}
      />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="clickRadio">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Options-spread
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              value={value}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="bull_call"
                control={<Radio />}
                label="Bull call spread"
              />
              <FormControlLabel
                value="bear_call"
                control={<Radio />}
                label="Bear call spread"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div>
          <TextField
            type={"number"}
            label="Stock price"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            value={tp}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={onChangeField_tp}
          />

          <TextField
            type={"number"}
            id="filled-number"
            label="Number of spreads"
            value={ns}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeField_ns}
          />
        </div>
        <div>
          <TextField
            type={"number"}
            label="Short call strike price"
            id="outlined-start-adornment"
            value={sp_Sc}
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={onChangeField_sp_Sc}
          />

          <TextField
            type={"number"}
            label="Long call strike price"
            id="outlined-start-adornment"
            value={sp_Lc}
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={onChangeField_sp_Lc}
          />
        </div>
        <div>
          <TextField
            type={"number"}
            label="Short call premium"
            id="outlined-start-adornment"
            value={Sc}
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={onChangeField_Sc}
          />

          <TextField
            type={"number"}
            label="Long call premium"
            id="outlined-start-adornment"
            value={Lc}
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={onChangeField_Lc}
          />
        </div>

        <div>
          <TextField
            type={"number"}
            label="Maximum loss"
            id="standard-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            value={ml}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="standard"
            disabled
          />
          <TextField
            type={"number"}
            label="Maximum upside profit potential "
            id="standard-start-adornment"
            value={mp}
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="standard"
            disabled
          />
        </div>
        <div>
          <TextField
            type={"number"}
            label="Breakeven price"
            id="standard-start-adornment"
            value={bp}
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="standard"
            disabled
          />
          <TextField
            type={"number"}
            label="Potential profit "
            id="standard-start-adornment"
            value={pp}
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="standard"
            disabled
          />
        </div>
        <div className="clickButton">
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
}

export default InData;
