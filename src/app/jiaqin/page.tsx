import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default function Jiaqin() {
  return (
    <div className="h-auto w-full flex justify-center items-center pt-20">
      <div className="w-1/4 flex justify-center items-center flex-col gap-2 text-[#778ccc]">
        <h1 className="text-6xl pb-5">Sign In</h1>
        <p>Sign in to start your new adventure</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="student"
            control={<Radio className="text-[#778ccc]" />}
            label="Student"
          />
          <FormControlLabel
            value="cafe"
            control={<Radio className="text-[#778ccc]" />}
            label="Cafe"
          />
          <FormControlLabel
            value="rider"
            control={<Radio className="text-[#778ccc]" />}
            label="Rider"
          />
        </RadioGroup>
        <TextField
          id="outlined-basic"
          label="Login"
          variant="outlined"
          fullWidth
          className="bg-[#c2d7f3]/[0.25]"
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          className="bg-[#c2d7f3]/[0.25]"
        />
        <div className="flex justify-between items-center w-full">
          <FormControlLabel
            control={<Checkbox className="text-[#778ccc]" />}
            label="Remember me"
          />
          <h1>Forgot Password</h1>
        </div>
        <Button
          variant="outlined"
          fullWidth
          className="normal-case bg-[#778ccc] text-white hover:bg-[#492cb1]"
        >
          Login
        </Button>
        
      </div>
    </div>
  );
}
